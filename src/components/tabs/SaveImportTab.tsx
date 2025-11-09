/**
 * Save/Import Tab Component
 * Card saving, loading, and export interface
 */

import { Box, Button, Grid, Heading, Text, Textarea, VStack } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useCardStore } from '../../store/cardStore';
import { getCardName, loadImage } from '../../utils/canvasHelpers';
import type { Card, Frame, Mask } from '../../types/card.types';
import { Switch } from '../ui/switch';

const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
const METADATA_KEY = 'CardConjurerJSON';
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder('utf-8');

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
      } catch (error) {
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

export const SaveImportTab = () => {
  const card = useCardStore((state) => state.card);
  const resetCard = useCardStore((state) => state.resetCard);
  const updateCardState = useCardStore((state) => state.updateCard);
  const setArtImage = useCardStore((state) => state.setArtImage);
  const setSetSymbolImage = useCardStore((state) => state.setSetSymbolImage);
  const setWatermarkImage = useCardStore((state) => state.setWatermarkImage);
  const previewCanvasRef = useCardStore((state) => state.previewCanvasRef);

  const [jsonText, setJsonText] = useState('');
  const [message, setMessage] = useState('');
  const [embedJson, setEmbedJson] = useState(false);

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

  const hydrateImportedCard = useCallback(
    async (rawJson: string) => {
      const parsed = JSON.parse(rawJson) as Card;
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

      const [artImg, setSymbolImg, watermarkImg] = await Promise.all([
        loadOptionalImage(nextCard.artSource),
        loadOptionalImage(nextCard.setSymbolSource),
        loadOptionalImage(nextCard.watermarkSource),
      ]);

      setArtImage(artImg);
      setSetSymbolImage(setSymbolImg);
      setWatermarkImage(watermarkImg);

      return JSON.stringify(nextCard, null, 2);
    },
    [loadOptionalImage, resetCard, setArtImage, setSetSymbolImage, setWatermarkImage, updateCardState]
  );

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

        const normalizedJson = await hydrateImportedCard(embeddedJson);
        setJsonText(normalizedJson);
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

        <Box mb={3}>
          <Switch
            checked={embedJson}
            onCheckedChange={(e) => setEmbedJson(e.checked)}
            colorPalette="purple"
          >
            <Text fontSize="sm">Embedded JSON (EXPERIMENTAL)</Text>
          </Switch>
        </Box>

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
        </Grid>
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
    </VStack>
  );
};
