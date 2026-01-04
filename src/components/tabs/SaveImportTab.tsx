/**
 * Save/Import Tab Component
 * Card saving, loading, and export interface
 */

import {
  Box,
  Button,
  Grid,
  Heading,
  Textarea,
  VStack,
  HStack,
  Text,
  Spinner,
  Portal,
  CloseButton,
} from '@chakra-ui/react';
import { Drawer } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useMemo, useRef, useState, memo, useEffect } from 'react';
import { useCardStore } from '../../store/cardStore';
import { useMediaStore } from '../../store/mediaStore';
import { useFrameStore } from '../../store/frameStore';
import { useUIStore } from '../../store/uiStore';
import { getCardName, loadImage, calculateAutoFitArt } from '../../utils/canvasHelpers';
import type { Card, Frame, Mask } from '../../types/card.types';
import { LabeledInput, LabeledSwitch } from '../ui';
import { toaster } from '../ui/toaster-instance';
import { validateCard, hasSchemaVersion, SCHEMA_VERSION } from '../../types/validation';
import {
  saveCard,
  loadCard,
  getAllCards,
  deleteCard,
  isIndexedDBAvailable,
} from '../../utils/cardDatabase';
import { exportCardAsPSD, createPSDTextRenderer } from '../../utils/psdExport';
import { ensurePlaneswalkerAssets, PLANESWALKER_ICON_LAYOUT } from '../../utils/planeswalkerHelpers';
import { ensureSagaAssets } from '../../utils/sagaHelpers';
import { getStationImage } from '../../utils/stationHelpers';

const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
const METADATA_KEY = 'CardCipheristJSON';
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder('utf-8');

// Format timestamp for display (e.g., "2 minutes ago", "3 days ago")
const formatTimestamp = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) === 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

const crc32 = (data: Uint8Array): number => {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) {
    c = crcTable[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
};

const readUint32 = (bytes: Uint8Array, offset: number): number =>
  ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;

const writeUint32 = (bytes: Uint8Array, offset: number, value: number) => {
  bytes[offset] = (value >>> 24) & 0xff;
  bytes[offset + 1] = (value >>> 16) & 0xff;
  bytes[offset + 2] = (value >>> 8) & 0xff;
  bytes[offset + 3] = value & 0xff;
};

const getChunkType = (bytes: Uint8Array, offset: number): string =>
  String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);

const hasPngSignature = (bytes: Uint8Array): boolean =>
  bytes.length >= PNG_SIGNATURE.length && PNG_SIGNATURE.every((value, index) => bytes[index] === value);

const concatUint8Arrays = (arrays: Uint8Array[]): Uint8Array => {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  arrays.forEach((arr) => {
    result.set(arr, offset);
    offset += arr.length;
  });
  return result;
};

const createITXtChunkData = (json: string): Uint8Array => {
  const keywordBytes = utf8Encoder.encode(METADATA_KEY);
  const textBytes = utf8Encoder.encode(json);
  const data = new Uint8Array(keywordBytes.length + 5 + textBytes.length);
  let pointer = 0;
  data.set(keywordBytes, pointer);
  pointer += keywordBytes.length;
  data[pointer] = 0;
  pointer += 1;
  data[pointer] = 0;
  pointer += 1;
  data[pointer] = 0;
  pointer += 1;
  data[pointer] = 0;
  pointer += 1;
  data[pointer] = 0;
  pointer += 1;
  data.set(textBytes, pointer);
  return data;
};

const createChunk = (type: string, data: Uint8Array): Uint8Array => {
  const chunk = new Uint8Array(8 + data.length + 4);
  writeUint32(chunk, 0, data.length);
  chunk[4] = type.charCodeAt(0);
  chunk[5] = type.charCodeAt(1);
  chunk[6] = type.charCodeAt(2);
  chunk[7] = type.charCodeAt(3);
  chunk.set(data, 8);
  const crc = crc32(chunk.subarray(4, 8 + data.length));
  writeUint32(chunk, 8 + data.length, crc);
  return chunk;
};

const parseITXtChunk = (chunkData: Uint8Array): { keyword: string; text: string } | null => {
  const keywordEnd = chunkData.indexOf(0);
  if (keywordEnd <= 0) {
    return null;
  }

  const keyword = utf8Decoder.decode(chunkData.subarray(0, keywordEnd));
  let cursor = keywordEnd + 1;

  const compressionFlag = chunkData[cursor];
  cursor += 1;
  const compressionMethod = chunkData[cursor];
  cursor += 1;

  if (compressionFlag !== 0) {
    throw new Error('Compressed iTXt chunks are not supported');
  }

  if (compressionMethod !== 0) {
    throw new Error('Unsupported iTXt compression method');
  }

  const languageEnd = chunkData.indexOf(0, cursor);
  if (languageEnd === -1) {
    return null;
  }
  cursor = languageEnd + 1;

  const translatedEnd = chunkData.indexOf(0, cursor);
  if (translatedEnd === -1) {
    return null;
  }
  cursor = translatedEnd + 1;

  const text = utf8Decoder.decode(chunkData.subarray(cursor));
  return { keyword, text };
};

const stripExistingMetadataChunks = (bytes: Uint8Array): Uint8Array => {
  if (!hasPngSignature(bytes)) {
    return bytes;
  }

  const segments: Uint8Array[] = [bytes.subarray(0, PNG_SIGNATURE.length)];
  let offset = PNG_SIGNATURE.length;

  while (offset < bytes.length) {
    const length = readUint32(bytes, offset);
    const totalLength = 12 + length;
    const type = getChunkType(bytes, offset + 4);
    const chunk = bytes.subarray(offset, offset + totalLength);

    if (type === 'iTXt') {
      try {
        const parsed = parseITXtChunk(bytes.subarray(offset + 8, offset + 8 + length));
        if (parsed?.keyword === METADATA_KEY) {
          offset += totalLength;
          continue;
        }
      } catch (_error) {
        // Ignore malformed or compressed chunks
      }
    }

    segments.push(chunk);
    offset += totalLength;
  }

  return concatUint8Arrays(segments);
};

const findChunkOffset = (bytes: Uint8Array, type: string): number => {
  if (!hasPngSignature(bytes)) {
    return -1;
  }

  let offset = PNG_SIGNATURE.length;
  while (offset < bytes.length) {
    const length = readUint32(bytes, offset);
    const chunkType = getChunkType(bytes, offset + 4);
    if (chunkType === type) {
      return offset;
    }
    offset += 12 + length;
  }
  return -1;
};

const embedJsonInPng = async (blob: Blob, json: string): Promise<Blob> => {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (!hasPngSignature(bytes)) {
    throw new Error('File is not a PNG image');
  }

  const sanitized = stripExistingMetadataChunks(bytes);
  const iendOffset = findChunkOffset(sanitized, 'IEND');
  if (iendOffset === -1) {
    throw new Error('PNG is missing an IEND chunk');
  }

  const payloadChunk = createChunk('iTXt', createITXtChunkData(json));
  const result = new Uint8Array(sanitized.length + payloadChunk.length);
  result.set(sanitized.subarray(0, iendOffset), 0);
  result.set(payloadChunk, iendOffset);
  result.set(sanitized.subarray(iendOffset), iendOffset + payloadChunk.length);

  return new Blob([result], { type: 'image/png' });
};

const extractEmbeddedJsonFromPng = (bytes: Uint8Array): string | null => {
  if (!hasPngSignature(bytes)) {
    throw new Error('File is not a PNG image');
  }

  let offset = PNG_SIGNATURE.length;
  while (offset < bytes.length) {
    const length = readUint32(bytes, offset);
    const chunkType = getChunkType(bytes, offset + 4);

    if (chunkType === 'iTXt') {
      try {
        const parsed = parseITXtChunk(bytes.subarray(offset + 8, offset + 8 + length));
        if (parsed?.keyword === METADATA_KEY) {
          return parsed.text;
        }
      } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to parse embedded metadata');
      }
    }

    offset += 12 + length;
  }

  return null;
};

const calculateRequiredMargins = (frames: Frame[]): { marginX: number; marginY: number } => {
  let maxMarginX = 0;
  let maxMarginY = 0;

  const checkBounds = (bounds: { x: number; y: number; width: number; height: number }) => {
    if (bounds.x < 0) {
      maxMarginX = Math.max(maxMarginX, Math.abs(bounds.x));
    }
    if (bounds.x + bounds.width > 1) {
      maxMarginX = Math.max(maxMarginX, bounds.x + bounds.width - 1);
    }
    if (bounds.y < 0) {
      maxMarginY = Math.max(maxMarginY, Math.abs(bounds.y));
    }
    if (bounds.y + bounds.height > 1) {
      maxMarginY = Math.max(maxMarginY, bounds.y + bounds.height - 1);
    }
  };

  frames.forEach((frame) => {
    if (frame.bounds) {
      checkBounds(frame.bounds);
    }
    if (frame.masks) {
      frame.masks.forEach((mask) => {
        if (mask.bounds) {
          checkBounds(mask.bounds);
        }
      });
    }
  });

  return { marginX: maxMarginX, marginY: maxMarginY };
};

const hydrateMaskImages = async (masks: Mask[] | undefined): Promise<Mask[]> => {
  if (!masks || masks.length === 0) {
    return [];
  }

  const hydrated: Mask[] = [];
  for (const mask of masks) {
    if (!mask.src) {
      hydrated.push(mask);
      continue;
    }
    try {
      const image = await loadImage(mask.src);
      if (image.decode) {
        await image.decode();
      }
      hydrated.push({ ...mask, image });
    } catch (error) {
      console.error('Failed to load mask image', mask.src, error);
    }
  }
  return hydrated;
};

const hydrateFrames = async (frames: Frame[]): Promise<Frame[]> => {
  const hydrated: Frame[] = [];
  for (const frame of frames) {
    try {
      let image: Frame['image'] = null;
      if (frame.src) {
        image = await loadImage(frame.src);
        if (image.decode) {
          await image.decode();
        }
      }

      const masks = await hydrateMaskImages(frame.masks);
      hydrated.push({ ...frame, image, masks });
    } catch (error) {
      console.error('Failed to load frame image', frame.src, error);
      hydrated.push({ ...frame, image: null });
    }
  }
  return hydrated;
};

type MediaSnapshot = ReturnType<typeof useMediaStore.getState>;

const mergeMediaTransformsIntoCard = (card: Card, media: MediaSnapshot): Card => ({
  ...card,
  artSource: media.artSource || card.artSource,
  artX: media.artX,
  artY: media.artY,
  artZoom: media.artZoom,
  artRotate: media.artRotate,
  artGrayscale: media.artGrayscale,
  setSymbolSource: media.setSymbolSource || card.setSymbolSource,
  setSymbolX: media.setSymbolX,
  setSymbolY: media.setSymbolY,
  setSymbolZoom: media.setSymbolZoom,
  setSymbolRotate: media.setSymbolRotate,
  watermarkSource: media.watermarkSource || card.watermarkSource,
  watermarkX: media.watermarkX,
  watermarkY: media.watermarkY,
  watermarkZoom: media.watermarkZoom,
  watermarkLeft: media.watermarkLeft,
  watermarkRight: media.watermarkRight,
  watermarkOpacity: media.watermarkOpacity,
});

const hasCustomArtTransform = (cardData: Card): boolean => {
  const rotate = typeof cardData.artRotate === 'number' ? cardData.artRotate : 0;
  return cardData.artX !== 0 || cardData.artY !== 0 || cardData.artZoom !== 1 || rotate !== 0;
};

const SaveImportTabComponent = () => {
  const card = useCardStore((state) => state.card);
  const resetCard = useCardStore((state) => state.resetCard);
  const updateCardState = useCardStore((state) => state.updateCard);
  const setSetSymbolImage = useCardStore((state) => state.setSetSymbolImage);
  const setWatermarkImage = useCardStore((state) => state.setWatermarkImage);
  const previewCanvasRef = useCardStore((state) => state.previewCanvasRef);
  const bottomInfoCanvasRef = useCardStore((state) => state.bottomInfoCanvasRef);

  // Special card type canvas refs (for PSD export)
  const planeswalkerPreCanvasRef = useCardStore((state) => state.planeswalkerPreCanvasRef);
  const planeswalkerPostCanvasRef = useCardStore((state) => state.planeswalkerPostCanvasRef);
  const sagaCanvasRef = useCardStore((state) => state.sagaCanvasRef);
  const classCanvasRef = useCardStore((state) => state.classCanvasRef);
  const dungeonCanvasRef = useCardStore((state) => state.dungeonCanvasRef);
  const dungeonFXCanvasRef = useCardStore((state) => state.dungeonFXCanvasRef);
  const stationPreCanvasRef = useCardStore((state) => state.stationPreCanvasRef);
  const stationPostCanvasRef = useCardStore((state) => state.stationPostCanvasRef);

  // Get art, set symbol, and watermark images from mediaStore
  const artImage = useMediaStore((state) => state.artImage);
  const setSymbolImage = useMediaStore((state) => state.setSymbolImage);
  const watermarkImage = useMediaStore((state) => state.watermarkImage);
  const setArtImage = useMediaStore((state) => state.setArtImage);
  const updateArt = useMediaStore((state) => state.updateArt);
  const updateSetSymbolMedia = useMediaStore((state) => state.updateSetSymbol);
  const updateWatermarkMedia = useMediaStore((state) => state.updateWatermark);
  const artGrayscale = useMediaStore((state) => state.artGrayscale);
  const artX = useMediaStore((state) => state.artX);
  const artY = useMediaStore((state) => state.artY);
  const artZoom = useMediaStore((state) => state.artZoom);
  const artRotate = useMediaStore((state) => state.artRotate);
  const setSymbolX = useMediaStore((state) => state.setSymbolX);
  const setSymbolY = useMediaStore((state) => state.setSymbolY);
  const setSymbolZoom = useMediaStore((state) => state.setSymbolZoom);
  const setSymbolRotate = useMediaStore((state) => state.setSymbolRotate);
  const setCode = useMediaStore((state) => state.setCode);
  const rarity = useMediaStore((state) => state.rarity);
  const watermarkX = useMediaStore((state) => state.watermarkX);
  const watermarkY = useMediaStore((state) => state.watermarkY);
  const watermarkZoom = useMediaStore((state) => state.watermarkZoom);
  const watermarkOpacity = useMediaStore((state) => state.watermarkOpacity);
  const watermarkLeft = useMediaStore((state) => state.watermarkLeft);
  const watermarkRight = useMediaStore((state) => state.watermarkRight);

  // Get loaded pack from frameStore with cardStore fallback (some flows store it in cardStore)
  const loadedPackFromFrameStore = useFrameStore((state) => state.loadedPack);
  const loadedPackFromCardStore = useCardStore((state) => state.loadedPack);
  const loadedPack = loadedPackFromFrameStore || loadedPackFromCardStore;

  // Get auto-fit setting from uiStore
  const autoFitArt = useUIStore((state) => state.autoFitArt);

  const [jsonText, setJsonText] = useState('');
  const [message, setMessage] = useState('');
  const [embedJson, setEmbedJson] = useState(false);

  // IndexedDB state
  const [customSaveName, setCustomSaveName] = useState('');
  const [savedCards, setSavedCards] = useState<Array<{
    id: string;
    name: string;
    timestamp: number;
    thumbnail?: string;
  }>>([]);
  const [loadDrawerOpen, setLoadDrawerOpen] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cardJsonPretty = useMemo(() => JSON.stringify(card, null, 2), [card]);

  const canvasToBlob = useCallback((canvas: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas export failed.'));
          return;
        }
        resolve(blob);
      });
    });
  }, []);

  const loadOptionalImage = useCallback(async (src: string | undefined) => {
    if (!src || src === '/img/blank.png') {
      return null;
    }
    try {
      const image = await loadImage(src);
      if (image.decode) {
        await image.decode();
      }
      return image;
    } catch (error) {
      console.error('Failed to load asset', src, error);
      return null;
    }
  }, []);

  const syncMediaStoreFromCard = useCallback(
    (cardData: Card) => {
      updateArt({
        artSource: cardData.artSource,
        artX: cardData.artX,
        artY: cardData.artY,
        artZoom: cardData.artZoom,
        artRotate: cardData.artRotate,
        artGrayscale: cardData.artGrayscale ?? false,
      });
      updateSetSymbolMedia({
        setSymbolSource: cardData.setSymbolSource,
        setSymbolX: cardData.setSymbolX,
        setSymbolY: cardData.setSymbolY,
        setSymbolZoom: cardData.setSymbolZoom,
        setSymbolRotate: cardData.setSymbolRotate ?? 0,
      });
      updateWatermarkMedia({
        watermarkSource: cardData.watermarkSource,
        watermarkX: cardData.watermarkX,
        watermarkY: cardData.watermarkY,
        watermarkZoom: cardData.watermarkZoom,
        watermarkLeft: cardData.watermarkLeft,
        watermarkRight: cardData.watermarkRight,
        watermarkOpacity: cardData.watermarkOpacity,
      });
    },
    [updateArt, updateSetSymbolMedia, updateWatermarkMedia]
  );

  const hydrateImportedCard = useCallback(
    async (rawJson: string): Promise<Card> => {
      // Parse JSON
      let parsedData: unknown;
      try {
        parsedData = JSON.parse(rawJson);
      } catch (error) {
        throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Parse failed'}`);
      }

      // Handle versioned vs unversioned data
      let cardData: unknown;
      if (hasSchemaVersion(parsedData)) {
        // Versioned import - check version compatibility
        const versionedData = parsedData as { schemaVersion: string; card: unknown };
        const { schemaVersion, card: versionedCard } = versionedData;
        if (schemaVersion !== SCHEMA_VERSION) {
          console.warn(
            `Schema version mismatch: imported ${schemaVersion}, current ${SCHEMA_VERSION}. Attempting to load anyway.`
          );
        }
        cardData = versionedCard;
      } else {
        // Legacy unversioned import
        cardData = parsedData;
      }

      // Validate card data
      const validationResult = validateCard(cardData);
      if (!validationResult.success) {
        throw new Error(
          `Card validation failed:\n${validationResult.errorMessage || 'Unknown validation error'}`
        );
      }

      // Cast validated data to Card type
      // The Zod schema validates the structure, but we need to cast for TypeScript
      const parsed = validationResult.data! as unknown as Card;
      const frames = Array.isArray(parsed.frames) ? await hydrateFrames(parsed.frames) : [];
      const { marginX, marginY } = calculateRequiredMargins(frames);

      const nextCard: Card = {
        ...parsed,
        frames,
        marginX,
        marginY,
      };

      resetCard();
      updateCardState(nextCard);
      syncMediaStoreFromCard(nextCard);

      const [artImg, setSymbolImg, watermarkImg] = await Promise.all([
        loadOptionalImage(nextCard.artSource),
        loadOptionalImage(nextCard.setSymbolSource),
        loadOptionalImage(nextCard.watermarkSource),
      ]);

      setArtImage(artImg);
      setSetSymbolImage(setSymbolImg);
      setWatermarkImage(watermarkImg);

      return nextCard;
    },
    [
      loadOptionalImage,
      resetCard,
      setArtImage,
      setSetSymbolImage,
      setWatermarkImage,
      syncMediaStoreFromCard,
      updateCardState,
    ]
  );

  // IndexedDB Handlers
  const loadSavedCardsList = useCallback(async () => {
    if (!isIndexedDBAvailable()) {
      toaster.create({
        title: 'Browser storage unavailable',
        description: 'IndexedDB is not supported in this browser or mode.',
        type: 'error',
      });
      return;
    }

    setLoadingCards(true);
    try {
      const cards = await getAllCards();
      setSavedCards(cards);
    } catch (error) {
      console.error('Failed to load saved cards', error);
      toaster.create({
        title: 'Failed to load saved cards',
        description: error instanceof Error ? error.message : 'Unknown error',
        type: 'error',
      });
    } finally {
      setLoadingCards(false);
    }
  }, []);

  const generateThumbnail = useCallback(async (): Promise<string | undefined> => {
    const canvas = previewCanvasRef ?? (document.querySelector('canvas') as HTMLCanvasElement | null);
    if (!canvas) {
      return undefined;
    }

    try {
      // Render thumbnails at device pixel ratio so downscaled previews stay crisp.
      const displayHeight = 280;
      const displayWidth = canvas.width * (displayHeight / canvas.height);
      const pixelRatio = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));

      const targetWidth = Math.max(1, Math.round(displayWidth * pixelRatio));
      const targetHeight = Math.max(1, Math.round(displayHeight * pixelRatio));

      const thumbCanvas = document.createElement('canvas');
      thumbCanvas.width = targetWidth;
      thumbCanvas.height = targetHeight;

      const ctx = thumbCanvas.getContext('2d');
      if (!ctx) {
        return undefined;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
      return thumbCanvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to generate thumbnail', error);
      return undefined;
    }
  }, [previewCanvasRef]);

  const convertArtImageToBase64 = useCallback(async (): Promise<string | undefined> => {
    if (!artImage) {
      return undefined;
    }

    try {
      // Create a temporary canvas to convert the image to base64
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = artImage.width;
      tempCanvas.height = artImage.height;

      const ctx = tempCanvas.getContext('2d');
      if (!ctx) {
        return undefined;
      }

      ctx.drawImage(artImage, 0, 0);
      return tempCanvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to convert art image to base64', error);
      return undefined;
    }
  }, [artImage]);

  const handleSaveToBrowser = useCallback(async () => {
    if (!isIndexedDBAvailable()) {
      toaster.create({
        title: 'Browser storage unavailable',
        description: 'IndexedDB is not supported in this browser or mode.',
        type: 'error',
      });
      return;
    }

    try {
      const thumbnail = await generateThumbnail();
      const artImageData = await convertArtImageToBase64();
      const name = customSaveName.trim() || getCardName(card);
      const mediaSnapshot = useMediaStore.getState();
      const cardWithTransforms = mergeMediaTransformsIntoCard(card, mediaSnapshot);

      // Update the card's artSource to use the base64 data
      // This ensures the art loads correctly when the card is reopened
      const cardToSave = artImageData
        ? { ...cardWithTransforms, artSource: artImageData }
        : cardWithTransforms;

      await saveCard(cardToSave, name, thumbnail, artImageData);

      toaster.create({
        title: 'Card saved!',
        description: `"${name}" saved to browser storage.`,
        type: 'success',
      });

      setCustomSaveName('');
      await loadSavedCardsList();
    } catch (error) {
      console.error('Failed to save card', error);
      toaster.create({
        title: 'Failed to save card',
        description: error instanceof Error ? error.message : 'Unknown error',
        type: 'error',
      });
    }
  }, [card, customSaveName, generateThumbnail, convertArtImageToBase64, loadSavedCardsList]);

  const handleCardClick = useCallback(
    async (id: string) => {
      try {
        const loadedData = await loadCard(id);
        if (!loadedData) {
          toaster.create({
            title: 'Card not found',
            description: 'The selected card could not be loaded.',
            type: 'error',
          });
          return;
        }

        const { card: loadedCard, artImageData } = loadedData;
        const hydratedCard = await hydrateImportedCard(JSON.stringify(loadedCard));
        setJsonText(JSON.stringify(hydratedCard, null, 2));

        // Restore the art image if available
        let artImageForAutoFit: HTMLImageElement | null = useMediaStore.getState().artImage;
        if (artImageData) {
          try {
            const artImg = await loadImage(artImageData);
            setArtImage(artImg);
            artImageForAutoFit = artImg;
            updateArt({ artSource: artImageData });

            // Apply auto-fit if enabled and art bounds are available
          } catch (error) {
            console.error('Failed to restore art image', error);
          }
        }

        const artBounds = loadedPack?.artBounds;
        const shouldAutoFit = autoFitArt && !!artBounds && !hasCustomArtTransform(hydratedCard);

        if (shouldAutoFit && artImageForAutoFit && artBounds) {
          const { artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate } =
            calculateAutoFitArt(artImageForAutoFit, artBounds, hydratedCard);
          updateArt({ artX: newX, artY: newY, artZoom: newZoom, artRotate: newRotate });
        }

        setLoadDrawerOpen(false);

        toaster.create({
          title: 'Card loaded!',
          description: 'Card loaded from browser storage.',
          type: 'success',
        });
      } catch (error) {
        console.error('Failed to load card', error);
        toaster.create({
          title: 'Failed to load card',
          description: error instanceof Error ? error.message : 'Unknown error',
          type: 'error',
        });
      }
    },
    [autoFitArt, hydrateImportedCard, loadedPack, setArtImage, updateArt]
  );

  const handleDeleteCard = useCallback(async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteCard(id);
        toaster.create({
          title: 'Card deleted',
          description: `"${name}" removed from browser storage.`,
          type: 'success',
        });

        await loadSavedCardsList();
      } catch (error) {
        console.error('Failed to delete card', error);
        toaster.create({
          title: 'Failed to delete card',
          description: error instanceof Error ? error.message : 'Unknown error',
          type: 'error',
        });
      }
    }
  }, [loadSavedCardsList]);

  // Load saved cards list on mount and when drawer opens
  useEffect(() => {
    if (loadDrawerOpen) {
      loadSavedCardsList();
    }
  }, [loadDrawerOpen, loadSavedCardsList]);

  // Load saved cards count on component mount
  useEffect(() => {
    loadSavedCardsList();
  }, [loadSavedCardsList]);

  const triggerDownload = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleExportJSON = useCallback(async () => {
    setJsonText(cardJsonPretty);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(cardJsonPretty);
        setMessage('Card exported to JSON successfully!');
        return;
      } catch (error) {
        console.warn('Clipboard write failed', error);
      }
    }
    setMessage('Card exported to JSON (clipboard unavailable).');
  }, [cardJsonPretty]);

  const handleDownloadImage = useCallback(async () => {
    const canvas = previewCanvasRef ?? (document.querySelector('canvas') as HTMLCanvasElement | null);
    if (!canvas) {
      setMessage('Error: No canvas available for export.');
      return;
    }

    try {
      let blob = await canvasToBlob(canvas);
      if (embedJson) {
        blob = await embedJsonInPng(blob, cardJsonPretty);
      }
      triggerDownload(blob, `${getCardName(card)}.png`);
      setMessage(embedJson ? 'Card image with embedded data downloaded!' : 'Card image downloaded!');
    } catch (error) {
      console.error('Failed to export card', error);
      setMessage('Error: Failed to export card image.');
    }
  }, [card, cardJsonPretty, canvasToBlob, embedJson, previewCanvasRef, triggerDownload]);

  const handleUploadButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUploadChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';

      if (!file) {
        return;
      }

      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const embeddedJson = extractEmbeddedJsonFromPng(bytes);

        if (!embeddedJson) {
          setMessage('Error: No embedded card data found in PNG.');
          return;
        }

        const hydratedCard = await hydrateImportedCard(embeddedJson);
        setJsonText(JSON.stringify(hydratedCard, null, 2));
        setMessage('Card loaded from image!');
      } catch (error) {
        console.error('Failed to load card from image', error);
        setMessage(error instanceof Error ? `Error: ${error.message}` : 'Error: Failed to load card from image.');
      }
    },
    [hydrateImportedCard]
  );

  const handleClearCard = useCallback(() => {
    if (confirm('Are you sure you want to clear the current card?')) {
      resetCard();
      setJsonText('');
      setMessage('Card cleared!');
    }
  }, [resetCard]);

  const [exportingPSD, setExportingPSD] = useState(false);

  const handleExportPSD = useCallback(async () => {
    const canvas = previewCanvasRef ?? (document.querySelector('canvas') as HTMLCanvasElement | null);
    if (!canvas) {
      toaster.create({
        title: 'Export failed',
        description: 'No canvas available for export.',
        type: 'error',
      });
      return;
    }

    // If loadedPack from hooks is null, try to get fresh from stores
    const currentLoadedPack = loadedPack ?? useFrameStore.getState().loadedPack ?? useCardStore.getState().loadedPack;

    setExportingPSD(true);
    try {
      // Create text renderer for raster text layers with mana symbols
      const renderTextToCanvas = await createPSDTextRenderer();

      // Load right gradient mask for watermark two-tone coloring
      let rightGradientMask: HTMLImageElement | null = null;
      if (watermarkImage && watermarkRight !== 'none') {
        try {
          rightGradientMask = await loadImage('/img/frames/maskRightHalf.png');
        } catch (e) {
          console.warn('Failed to load right gradient mask for PSD export:', e);
        }
      }

      // Load special card type images in parallel based on card version
      const isPlaneswalker = card.version?.toLowerCase().includes('planeswalker') && card.planeswalker;
      const isSaga = card.version?.toLowerCase().includes('saga') && card.saga;
      const isStation = card.version?.toLowerCase().includes('station') && card.station;

      // Load planeswalker badge images if needed
      let planeswalkerImages: { plusIcon?: HTMLImageElement; minusIcon?: HTMLImageElement; neutralIcon?: HTMLImageElement } | undefined;
      if (isPlaneswalker) {
        try {
          const assets = await ensurePlaneswalkerAssets(card.version || '', false);
          planeswalkerImages = {
            plusIcon: assets.plusIcon,
            minusIcon: assets.minusIcon,
            neutralIcon: assets.neutralIcon,
          };
        } catch (e) {
          console.warn('Failed to load planeswalker assets for PSD export:', e);
        }
      }

      // Load saga chapter icons if needed
      let sagaImages: { chapterIcon?: HTMLImageElement; divider?: HTMLImageElement } | undefined;
      if (isSaga) {
        try {
          const assets = await ensureSagaAssets();
          sagaImages = {
            chapterIcon: assets.chapter,
            divider: assets.divider,
          };
        } catch (e) {
          console.warn('Failed to load saga assets for PSD export:', e);
        }
      }

      // Load station badge/PT images if needed
      let stationImages: { badgeImage?: HTMLImageElement; ptImage?: HTMLImageElement } | undefined;
      if (isStation && card.station) {
        try {
          // Determine badge/PT variant from station color mode
          const colorMode = card.station.colorMode || 'auto';
          const variant = colorMode === 'custom' ? 'a' : (colorMode === 'auto' ? 'a' : colorMode.charAt(0));
          const [badgeImage, ptImage] = await Promise.all([
            getStationImage('badge', variant),
            getStationImage('pt', variant),
          ]);
          stationImages = { badgeImage, ptImage };
        } catch (e) {
          console.warn('Failed to load station assets for PSD export:', e);
        }
      }

      // Load flavor bar image if card has flavor text
      let flavorBarImage: HTMLImageElement | undefined;
      const hasFlavorText = Object.values(card.text || {}).some(
        (t) => t.text?.includes('{flavor}') || t.text?.includes('{divider}') || t.text?.includes('///')
      );
      if (hasFlavorText && card.showsFlavorBar !== false) {
        try {
          flavorBarImage = await loadImage('/img/manaSymbols/bar.png');
        } catch (e) {
          console.warn('Failed to load flavor bar image for PSD export:', e);
        }
      }

      await exportCardAsPSD({
        card,
        canvasRefs: { card: canvas, bottomInfo: bottomInfoCanvasRef ?? undefined },
        artImage,
        setSymbolImage,
        watermarkImage,
        loadedPack: currentLoadedPack,
        collectorInfoEnabled: card.showCollectorInfo ?? false,
        artGrayscale,
        artTransform: {
          x: artX,
          y: artY,
          zoom: artZoom,
          rotate: artRotate,
        },
        setSymbolTransform: {
          x: setSymbolX,
          y: setSymbolY,
          zoom: setSymbolZoom,
          rotate: setSymbolRotate,
        },
        setCode,
        setRarity: rarity,
        watermarkTransform: {
          x: watermarkX,
          y: watermarkY,
          zoom: watermarkZoom,
          opacity: watermarkOpacity,
          left: watermarkLeft,
          right: watermarkRight,
        },
        rightGradientMask,
        renderTextToCanvas,
        // Special card type canvases
        specialCanvases: {
          planeswalkerPre: planeswalkerPreCanvasRef ?? undefined,
          planeswalkerPost: planeswalkerPostCanvasRef ?? undefined,
          saga: sagaCanvasRef ?? undefined,
          class: classCanvasRef ?? undefined,
          dungeon: dungeonCanvasRef ?? undefined,
          dungeonFX: dungeonFXCanvasRef ?? undefined,
          stationPre: stationPreCanvasRef ?? undefined,
          stationPost: stationPostCanvasRef ?? undefined,
        },
        // Special card type images (for detailed PSD layers)
        planeswalkerImages,
        sagaImages,
        stationImages,
        planeswalkerAbilityLayout: PLANESWALKER_ICON_LAYOUT,
        // Flavor divider image
        flavorBarImage,
      });

      toaster.create({
        title: 'PSD exported successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('PSD export failed', error);
      toaster.create({
        title: 'PSD export failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        type: 'error',
      });
    } finally {
      setExportingPSD(false);
    }
  }, [
    card,
    previewCanvasRef,
    bottomInfoCanvasRef,
    planeswalkerPreCanvasRef,
    planeswalkerPostCanvasRef,
    sagaCanvasRef,
    classCanvasRef,
    dungeonCanvasRef,
    dungeonFXCanvasRef,
    stationPreCanvasRef,
    stationPostCanvasRef,
    artImage,
    setSymbolImage,
    watermarkImage,
    loadedPack,
    artGrayscale,
    artX,
    artY,
    artZoom,
    artRotate,
    setSymbolX,
    setSymbolY,
    setSymbolZoom,
    setSymbolRotate,
    setCode,
    rarity,
    watermarkX,
    watermarkY,
    watermarkZoom,
    watermarkOpacity,
    watermarkLeft,
    watermarkRight,
  ]);

  return (
    <VStack align="stretch" gap={4}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
        hidden
        onChange={handleUploadChange}
      />

      <Box>
        <Heading size="md" mb={4}>
          Save & Export
        </Heading>

        <LabeledSwitch
          label="Embedded JSON (EXPERIMENTAL)"
          checked={embedJson}
          onCheckedChange={setEmbedJson}
          colorPalette="purple"
          mb={3}
        />

        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          <Button onClick={handleDownloadImage} colorPalette="blue">
            Download Created Card
          </Button>
          <Button onClick={handleUploadButtonClick} colorPalette="purple">
            Upload Card
          </Button>
          <Button onClick={handleExportJSON} colorPalette="green">
            Export to JSON
          </Button>
          <Button
            onClick={handleExportPSD}
            colorPalette="purple"
            loading={exportingPSD}
            loadingText="Exporting..."
          >
            Save to PSD File
          </Button>
        </Grid>
      </Box>

      {/* Browser Storage Section */}
      <Box>
        <Heading size="md" mb={4}>
          Browser Storage (EXPERIMENTAL)
        </Heading>

        <Box mb={3}>
          <LabeledInput
            label="Card Name (optional)"
            value={customSaveName}
            onChange={setCustomSaveName}
            placeholder={getCardName(card)}
          />
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          <Button onClick={handleSaveToBrowser} colorPalette="teal">
            Save to Browser
          </Button>
          <Button onClick={() => setLoadDrawerOpen(true)} colorPalette="cyan">
            Load from Browser
          </Button>
        </Grid>

        <Text fontSize="xs" color="gray.400" mt={2}>
          Cards are saved locally in your browser. Saved cards: {savedCards.length}
        </Text>
      </Box>

      <Box>
        <Heading size="sm" mb={3}>
          JSON Data
        </Heading>
        <Textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          rows={10}
          placeholder="Click 'Export to JSON' to see card data here..."
          fontFamily="mono"
          fontSize="sm"
          readOnly
        />
      </Box>

      {message && (
        <Box
          p={3}
          bg={message.startsWith('Error') ? 'red.900' : 'green.900'}
          color={message.startsWith('Error') ? 'red.100' : 'green.100'}
          borderRadius="md"
        >
          {message}
        </Box>
      )}

      <Box>
        <Heading size="sm" mb={3}>
          Danger Zone
        </Heading>
        <Button onClick={handleClearCard} colorPalette="red" width="full">
          Clear Card
        </Button>
      </Box>

      {/* Load Saved Cards Drawer */}
      <Drawer.Root
        open={loadDrawerOpen}
        onOpenChange={(e) => !e.open && setLoadDrawerOpen(false)}
        placement="end"
        size="lg"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header borderBottomWidth="1px">
                <HStack justify="space-between" w="full">
                  <Heading size="md">Load Saved Card</Heading>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </HStack>
              </Drawer.Header>

              <Drawer.Body>
                <VStack align="stretch" gap={4} py={4}>
                  {loadingCards ? (
                    <HStack justify="center" py={8}>
                      <Spinner size="lg" />
                      <Text>Loading saved cards...</Text>
                    </HStack>
                  ) : savedCards.length === 0 ? (
                    <Text textAlign="center" color="gray.400" py={8}>
                      No saved cards found. Save a card to see it here!
                    </Text>
                  ) : (
                    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
                      {savedCards.map((savedCard) => (
                        <Box
                          key={savedCard.id}
                          cursor="pointer"
                          onClick={() => handleCardClick(savedCard.id)}
                          position="relative"
                          border="2px solid transparent"
                          borderRadius="md"
                          overflow="hidden"
                          transition="all 0.2s"
                          _hover={{
                            borderColor: 'cyan.400',
                            bg: 'rgba(0, 188, 212, 0.1)',
                          }}
                        >
                          {/* Thumbnail */}
                          {savedCard.thumbnail ? (
                            <img
                              src={savedCard.thumbnail}
                              alt={savedCard.name}
                              style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                          ) : (
                            <Box
                              bg="gray.700"
                              height="280px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text color="gray.500">No Preview</Text>
                            </Box>
                          )}

                          {/* Card Info Overlay */}
                          <Box p={2} bg="rgba(0, 0, 0, 0.8)">
                            <Text fontSize="sm" fontWeight="bold" truncate>
                              {savedCard.name}
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                              {formatTimestamp(savedCard.timestamp)}
                            </Text>
                          </Box>

                          {/* Delete Button (on hover) */}
                          <Button
                            size="xs"
                            colorPalette="red"
                            position="absolute"
                            top={2}
                            right={2}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCard(savedCard.id, savedCard.name);
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      ))}
                    </Grid>
                  )}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </VStack>
  );
};

SaveImportTabComponent.displayName = 'SaveImportTab';
export const SaveImportTab = memo(SaveImportTabComponent);
