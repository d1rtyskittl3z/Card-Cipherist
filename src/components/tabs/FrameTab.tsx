/**
 * Frame Tab Component
 * Frame selection and management interface
 */

import { Box, Heading, Input, VStack, HStack, Button, SimpleGrid, Checkbox, Collapsible, Image, IconButton, RadioCard } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { NativeSelectRoot, NativeSelectField } from '../ui/native-select';
import { toaster } from '../ui/toaster';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { LegacyGroup } from '../frames/groups/types';
import type { Card, TextObject, PlaneswalkerInfo, FrameColorOverride } from '../../types/card.types';
import type { FramePackTemplate, Mask, FrameItem } from '../frames/packs/types';
import { loadFramePack } from '../frames/packs/packLoader';
import { getThumbnailPath } from '../frames/packs/types';
import { FrameLayerList } from '../frames/FrameLayerList';
import { FrameLayerEditor } from '../FrameLayerEditor';
import { useCardStore } from '../../store/cardStore';
import { applySagaHeights, calculateSagaAbilityHeights } from '../../utils/sagaHelpers';
import {
  adjustPlaneswalkerTextBounds,
  applyPlaneswalkerLayout,
  computePlaneswalkerCount,
  PLANESWALKER_ABILITY_KEYS,
} from '../../utils/planeswalkerHelpers';
import { DEFAULT_COLOR_OVERRIDE } from '../../utils/neoBasics';

// Import all frame groups
import Standard3 from '../frames/groups/Standard-3';
import Token2 from '../frames/groups/Token-2';
import Saga1 from '../frames/groups/Saga-1';
import Planeswalker from '../frames/groups/Planeswalker';
import Modal1 from '../frames/groups/Modal-1';
import DFC from '../frames/groups/DFC';
import Showcase5 from '../frames/groups/Showcase-5';
import UniversesBeyond from '../frames/groups/UniversesBeyond';
import Promo2 from '../frames/groups/Promo-2';
import Textless4 from '../frames/groups/Textless-4';
import Custom from '../frames/groups/Custom';
import Misc2 from '../frames/groups/Misc-2';
import Accurate from '../frames/groups/Accurate';
import Margin from '../frames/groups/Margin';
import FleshAndBlood from '../frames/groups/FleshAndBlood';

// Create a mapping of all groups
const FRAME_GROUPS: Record<string, LegacyGroup> = {
  'Standard-3': Standard3,
  'Token-2': Token2,
  'Saga-1': Saga1,
  'Planeswalker': Planeswalker,
  'Modal-1': Modal1,
  'DFC': DFC,
  'Showcase-5': Showcase5,
  'UniversesBeyond': UniversesBeyond,
  'Promo-2': Promo2,
  'Textless-4': Textless4,
  'Custom': Custom,
  'Misc-2': Misc2,
  'Accurate': Accurate,
  'Margin': Margin,
  'FleshAndBlood': FleshAndBlood,
};

const PLANESWALKER_FALLBACK_ABILITIES: [string, string, string, string] = ['', '+1', '0', '-7'];
const PLANESWALKER_FALLBACK_ADJUST: [number, number, number, number] = [0, 0, 0, 0];
const PLANESWALKER_FALLBACK_X = 0.1167;
const PLANESWALKER_FALLBACK_WIDTH = 0.8094;

type SearchResult =
  | { type: 'group'; groupId: string; groupLabel: string }
  | { type: 'pack'; groupId: string; packId: string; packLabel: string; groupLabel: string };

export const FrameTab = () => {
  const addFrame = useCardStore((state) => state.addFrame);
  const showGuidelines = useCardStore((state) => state.showGuidelines);
  const setShowGuidelinesStore = useCardStore((state) => state.setShowGuidelines);
  const showTransparencies = useCardStore((state) => state.showTransparencies);
  const setShowTransparenciesStore = useCardStore((state) => state.setShowTransparencies);
  const setLoadedPackStore = useCardStore((state) => state.setLoadedPack);
  const isFrameEditorOpen = useCardStore((state) => state.isFrameEditorOpen);
  const editingFrameIndex = useCardStore((state) => state.editingFrameIndex);
  const closeFrameEditor = useCardStore((state) => state.closeFrameEditor);
  const setHasShownSagaTab = useCardStore((state) => state.setHasShownSagaTab);
  const setHasShownPlaneswalkerTab = useCardStore((state) => state.setHasShownPlaneswalkerTab);
  const setHasShownKamigawaTab = useCardStore((state) => state.setHasShownKamigawaTab);
  const setHasShownStationsTab = useCardStore((state) => state.setHasShownStationsTab);
  const initializeNeoBasicsControls = useCardStore((state) => state.initializeNeoBasicsControls);
  const applyNeoBasicsAdjustments = useCardStore((state) => state.applyNeoBasicsAdjustments);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('Standard-3');
  const [selectedPackId, setSelectedPackId] = useState<string>('M15Regular-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [roundedCorners, setRoundedCorners] = useState(false);

  // Frame pack loading state
  const [loadedPack, setLoadedPack] = useState<FramePackTemplate | null>(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<number | null>(null);
  const [selectedMaskIndex, setSelectedMaskIndex] = useState<number | null>(0); // Default to "No Mask" at index 0

  // Custom frames state (no persistence - reset on page reload)
  const [customFrames, setCustomFrames] = useState<FrameItem[]>([]);
  const [customFrameCounter, setCustomFrameCounter] = useState(1);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom masks state (no persistence - reset on page reload or pack change)
  const [customMasks, setCustomMasks] = useState<Mask[]>([]);
  const [customMaskCounter, setCustomMaskCounter] = useState(1);
  const maskFileInputRef = useRef<HTMLInputElement>(null);

  // URL upload state
  const [urlUploadType, setUrlUploadType] = useState<'frame' | 'mask' | null>(null);

  // Drag & Drop upload state (separate from URL)
  const [dragDropType, setDragDropType] = useState<'frame' | 'mask' | null>(null);

  // Track if the group change is from search (to prevent pack reset)
  const isSearchSelection = useRef(false);

  // Track the previous group ID to detect actual changes
  const previousGroupId = useRef(selectedGroupId);

  // Define frame group sections with labels
  const frameGroupSections = useMemo(
    () => [
      {
        label: "Standard Frames",
        groups: [
          { id: "Standard-3", label: "Regular" },
          { id: "Token-2", label: "Tokens" },
          { id: "Saga-1", label: "Sagas" },
          { id: "Planeswalker", label: "Planeswalkers" },
          { id: "Modal-1", label: "Modal DFC's" },
          { id: "DFC", label: "Transform" },
        ],
      },
      {
        label: "Special Frames",
        groups: [
          { id: "Showcase-5", label: "Showcase Frames" },
          { id: "UniversesBeyond", label: "Universes Beyond" },
          { id: "Promo-2", label: "Promos (Tall Art)" },
          { id: "Textless-4", label: "Textless/Fullart" },
        ],
      },
      {
        label: "Other Frames",
        groups: [
          { id: "Custom", label: "Custom" },
          { id: "Misc-2", label: "Old/Misc" },
          { id: "Accurate", label: "Accurate Frames" },
          { id: "Margin", label: "1/8th Inch Margin" },
        ],
      },
      {
        label: "Other Games",
        groups: [{ id: "FleshAndBlood", label: "Flesh and Blood" }],
      },
    ],
    [],
  );

  // Get the selected group's data
  const selectedGroup = useMemo(() => {
    return FRAME_GROUPS[selectedGroupId];
  }, [selectedGroupId]);

  // Get the packs for the selected group
  const availablePacks = useMemo(() => {
    return selectedGroup?.packs || [];
  }, [selectedGroup]);

  // Reset pack when group ACTUALLY changes (unless it's from search)
  useEffect(() => {
    // Only reset if the group ID actually changed
    if (previousGroupId.current !== selectedGroupId) {
      if (!isSearchSelection.current) {
        // Set to first pack in the group instead of empty string
        const currentGroup = FRAME_GROUPS[selectedGroupId];
        const firstPack = currentGroup?.packs.find((p) => p.kind === 'pack');
        setSelectedPackId(firstPack && firstPack.kind === 'pack' ? firstPack.id : '');
      }

      // Show toast if the selected group has a notice
      const currentGroup = FRAME_GROUPS[selectedGroupId];
      if (currentGroup?.notice) {
        toaster.create({
          title: currentGroup.label,
          description: currentGroup.notice,
          type: 'info',
          duration: 10000, // 10 seconds
        });
      }

      previousGroupId.current = selectedGroupId;
    }

    isSearchSelection.current = false;
  }, [selectedGroupId]);

  // Load frame pack when selectedPackId changes
  useEffect(() => {
    if (!selectedPackId) {
      setLoadedPack(null);
      setLoadedPackStore(null);
      return;
    }

    loadFramePack(selectedPackId).then((pack) => {
      const store = useCardStore.getState();
      setLoadedPack(pack);
      setLoadedPackStore(pack); // Update store for guidelines
      setSelectedFrameIndex(null);
      setSelectedMaskIndex(null);

      // Show toast if the pack has a notice
      if (pack?.notice) {
        toaster.create({
          title: pack.label || 'Frame Pack Notice',
          description: pack.notice,
          type: 'info',
          duration: 8000, // 8 seconds
        });
      }

      // Auto-load text fields from pack if it has text configuration (full packs)
      if (pack?.text && pack.version) {
        // Convert TextConfig objects to TextObject format
        // Preserve ALL properties from pack config (including manaPlacement, manaPrefix, etc.)
        // IMPORTANT: Preserve existing text content when loading pack
        const currentTextFields = store.card.text || {};
        const textFields: Record<string, TextObject> = {};
        for (const [key, config] of Object.entries(pack.text)) {
          // Spread all properties from config, then fill in required fields with defaults if missing
          const baseConfig = config as TextObject;
          textFields[key] = {
            ...baseConfig,
            // Preserve existing text content if it exists
            text: currentTextFields[key]?.text || baseConfig.text || '',
            x: baseConfig.x ?? 0,
            y: baseConfig.y ?? 0,
            width: baseConfig.width ?? 0,
            height: baseConfig.height ?? 0,
            font: baseConfig.font ?? 'beleren',
            color: baseConfig.color ?? 'black',
          };
        }
        // Set all text fields at once
        store.setText(textFields);
      }

      if (pack) {
        const cardUpdates: Partial<Card> = {};

        if (pack.version) {
          cardUpdates.version = pack.version;
        }
        if (pack.artBounds) {
          cardUpdates.artBounds = pack.artBounds;
        }
        if (pack.setSymbolBounds) {
          cardUpdates.setSymbolBounds = pack.setSymbolBounds;
        }
        if (pack.watermarkBounds) {
          cardUpdates.watermarkBounds = pack.watermarkBounds;
        }

        if (Object.keys(cardUpdates).length > 0) {
          store.updateCard(cardUpdates);
        }

        const isSagaPack = pack.version?.toLowerCase().includes('saga');
        if (isSagaPack) {
          setHasShownSagaTab(true);

          const defaults = pack.saga ?? {
            x: 0.1,
            width: 0.3947,
            defaultAbilities: [1, 1, 1, 0],
            defaultCount: 3,
          };

          const defaultCount =
            defaults.defaultCount ??
            defaults.defaultAbilities?.filter((value) => value > 0).length ??
            0;

          store.resetSagaInfo({
            abilities: [...(defaults.defaultAbilities ?? [1, 1, 1, 0])],
            count: defaultCount,
            x: defaults.x,
            width: defaults.width,
          });

          const updatedCard = useCardStore.getState().card;
          const heights = calculateSagaAbilityHeights(updatedCard, updatedCard.saga?.count);

          if (heights.some((value) => value > 0)) {
            const textWithSaga = applySagaHeights(updatedCard, heights);
            store.setText(textWithSaga);
            store.setSagaInfo({
              count: heights.filter((value) => value > 0).length,
            });
          }
        } else {
          store.resetSagaInfo(null);
        }

        const isPlaneswalkerPack = pack.version?.toLowerCase().includes('planeswalker');
        if (isPlaneswalkerPack) {
          setHasShownPlaneswalkerTab(true);

          const packDefaults = pack.planeswalker;
          const defaultAbilities = (packDefaults?.defaultAbilities ?? PLANESWALKER_FALLBACK_ABILITIES) as [
            string,
            string,
            string,
            string
          ];
          const defaultAdjust = (packDefaults?.defaultAbilityAdjust ?? PLANESWALKER_FALLBACK_ADJUST) as [
            number,
            number,
            number,
            number
          ];
          const defaultHeights = (packDefaults?.defaultHeights ?? [
            pack.text?.ability0?.height ?? 0,
            pack.text?.ability1?.height ?? 0,
            pack.text?.ability2?.height ?? 0,
            pack.text?.ability3?.height ?? 0,
          ]) as [number, number, number, number];

          const baseY = pack.text?.ability0?.y ?? store.card.text?.ability0?.y ?? 0.6239;

          const originalBounds = PLANESWALKER_ABILITY_KEYS.map((key) => ({
            x: pack.text?.[key]?.x ?? store.card.text?.[key]?.x ?? 0.18,
            width: pack.text?.[key]?.width ?? store.card.text?.[key]?.width ?? 0.7467,
          }));

          const planeswalkerPreset: PlaneswalkerInfo = {
            abilities: [...defaultAbilities],
            abilityAdjust: [...defaultAdjust],
            count: computePlaneswalkerCount([...defaultHeights]),
            x: packDefaults?.x ?? PLANESWALKER_FALLBACK_X,
            width: packDefaults?.width ?? PLANESWALKER_FALLBACK_WIDTH,
            invert: packDefaults?.invert ?? false,
            baseY,
            originalAbilityBounds: originalBounds,
            defaultAbilities: [...defaultAbilities],
            defaultAbilityAdjust: [...defaultAdjust],
            defaultHeights: [...defaultHeights],
          };

          store.resetPlaneswalkerInfo(planeswalkerPreset);

          const refreshedCard = useCardStore.getState().card;
          const refreshedInfo = refreshedCard.planeswalker;
          if (refreshedInfo) {
            let nextText = applyPlaneswalkerLayout(refreshedCard, defaultHeights, baseY);
            PLANESWALKER_ABILITY_KEYS.forEach((_, abilityIndex) => {
              const hasCost = Boolean(refreshedInfo.abilities?.[abilityIndex]?.trim());
              nextText = adjustPlaneswalkerTextBounds(nextText, refreshedInfo, abilityIndex, hasCost);
            });

            store.setText(nextText);
            store.setPlaneswalkerInfo({
              count: computePlaneswalkerCount([...defaultHeights]),
              baseY,
            });
          }
        } else {
          store.resetPlaneswalkerInfo(null);
        }
      } else {
        store.resetSagaInfo(null);
        store.resetPlaneswalkerInfo(null);
      }

      if (pack?.id === 'NeoBasics') {
        setHasShownKamigawaTab(true);
        const elementNames = Array.from(
          new Set(
            pack.frames.flatMap((frame) => frame.stretch?.map((entry) => entry.name) ?? []),
          ),
        );
        initializeNeoBasicsControls(elementNames);
      }

      // Show Stations tab for Station packs
      if (pack?.id === 'StationRegular' || pack?.id === 'StationBorderless') {
        setHasShownStationsTab(true);
        toaster.create({
          title: 'Station Pack Selected',
          description: 'A "Stations" tab has appeared with controls for the Station frame elements.',
          type: 'info',
          duration: 8000,
        });
      }
    });

    // Clear custom masks when pack changes (they're tied to the loaded pack)
    setCustomMasks([]);
    setCustomMaskCounter(1);
  }, [selectedPackId, setLoadedPackStore, setHasShownKamigawaTab, setHasShownSagaTab, setHasShownPlaneswalkerTab, setHasShownStationsTab, initializeNeoBasicsControls]);

  // Get frames and masks from loaded pack
  const availableFrames = useMemo(() => {
    const packFrames = loadedPack?.frames || [];
    // Add custom frames at the bottom
    return [...packFrames, ...customFrames];
  }, [loadedPack, customFrames]);

  // Reset mask selection when frame selection changes (different frames have different masks)
  useEffect(() => {
    setSelectedMaskIndex(null); // Reset to no selection
  }, [selectedFrameIndex]);

  const availableMasks = useMemo(() => {
    // "No Mask" option (only shown if frame doesn't have noDefaultMask)
    const noMask: Mask = { src: '/img/black.png', name: 'No Mask' };

    // If no frame is selected, show only "No Mask"
    if (selectedFrameIndex === null) {
      return [noMask];
    }

    // Get the selected frame
    const selectedFrame = availableFrames[selectedFrameIndex];
    if (!selectedFrame) {
      return [noMask];
    }

    // If the frame has no masks property, only show "No Mask"
    if (!selectedFrame.masks || selectedFrame.masks.length === 0) {
      return [noMask];
    }

    // If frame has noDefaultMask: true, don't include "No Mask" option
    if (selectedFrame.noDefaultMask) {
      return [...selectedFrame.masks, ...customMasks];
    }

    // Return "No Mask" + frame's specific masks + custom masks
    return [noMask, ...selectedFrame.masks, ...customMasks];
  }, [customMasks, selectedFrameIndex, availableFrames]);

  const getMaskOptionsForFrame = useCallback(
    (frame: FrameItem | undefined | null) => {
      const noMask: Mask = { src: '/img/black.png', name: 'No Mask' };

      if (!frame) {
        return [noMask, ...customMasks];
      }

      const frameMasks = frame.masks ? [...frame.masks] : [];
      const baseOptions = frame.noDefaultMask ? frameMasks : [noMask, ...frameMasks];

      return [...baseOptions, ...customMasks];
    },
    [customMasks],
  );

  // Search through groups and packs
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    // Search through all groups and their packs
    Object.entries(FRAME_GROUPS).forEach(([groupId, group]) => {
      const groupLabel = group.label;

      // Check if group label matches
      if (groupLabel.toLowerCase().includes(query)) {
        results.push({
          type: 'group',
          groupId,
          groupLabel,
        });
      }

      // Search through packs in this group
      group.packs.forEach((pack) => {
        if (pack.kind === 'pack' && pack.label.toLowerCase().includes(query)) {
          results.push({
            type: 'pack',
            groupId,
            packId: pack.id,
            packLabel: pack.label,
            groupLabel,
          });
        }
      });
    });

    return results;
  }, [searchQuery]);

  // Handle search result selection
  const handleSearchResultSelect = (result: SearchResult) => {
    // Mark this as a search selection to prevent pack reset
    isSearchSelection.current = true;

    if (result.type === 'group') {
      // Set pack to first available pack in the group
      const group = FRAME_GROUPS[result.groupId];
      const firstPack = group.packs.find((p) => p.kind === 'pack');

      // Update both states together
      setSelectedGroupId(result.groupId);
      setSelectedPackId(firstPack && firstPack.kind === 'pack' ? firstPack.id : '');
    } else {
      // Select both group and pack together
      setSelectedGroupId(result.groupId);
      setSelectedPackId(result.packId);
    }

    // Show toast and set flags for Saga or Planeswalker groups
    if (result.groupId === 'Saga-1') {
      setHasShownSagaTab(true);
      toaster.create({
        title: 'Saga Group Selected',
        description: 'When you load the Saga frame version, a "Saga" tab will appear. This tab controls the placement and chapter counts for Saga chapters.',
        type: 'info',
        duration: 10000,
      });
    } else if (result.groupId === 'Planeswalker') {
      setHasShownPlaneswalkerTab(true);
      toaster.create({
        title: 'Planeswalker Group Selected',
        description: 'When you load a Planeswalker frame version, a "Planeswalker" tab will appear. This tab controls the placement and loyalty costs for Planeswalker abilities.',
        type: 'info',
        duration: 10000,
      });
    }

    // Clear search
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Handle manual group selection (clear search)
  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
    setSearchQuery('');

    // Show toast and set flags for Saga or Planeswalker groups
    if (groupId === 'Saga-1') {
      setHasShownSagaTab(true);
      toaster.create({
        title: 'Saga Group Selected',
        description: 'When you load the Saga frame version, a "Saga" tab will appear. This tab controls the placement and chapter counts for Saga chapters.',
        type: 'info',
        duration: 10000,
      });
    } else if (groupId === 'Planeswalker') {
      setHasShownPlaneswalkerTab(true);
      toaster.create({
        title: 'Planeswalker Group Selected',
        description: 'When you load a Planeswalker frame version, a "Planeswalker" tab will appear. This tab controls the placement and loyalty costs for Planeswalker abilities.',
        type: 'info',
        duration: 10000,
      });
    }
  };

  // Handle manual pack selection (clear search)
  const handlePackChange = (packId: string) => {
    setSelectedPackId(packId);
    setSearchQuery('');
  };

  // Load an image and return a promise
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Handle custom frame upload from file
  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toaster.create({
        title: 'Invalid File Type',
        description: 'Please upload a PNG or JPEG image',
        type: 'error',
        duration: 5000,
      });
      return;
    }

    try {
      // Read file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          // Create custom frame
          const customFrame: FrameItem = {
            name: `Custom Frame ${customFrameCounter}`,
            src: dataUrl,
            bounds: { x: 0, y: 0, width: 1, height: 1 }, // Default bounds
          };

          setCustomFrames((prev) => [...prev, customFrame]);
          setCustomFrameCounter((prev) => prev + 1);

          toaster.create({
            title: 'Custom Frame Added',
            description: `${customFrame.name} added to frame picker`,
            type: 'success',
            duration: 3000,
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading custom frame:', error);
      toaster.create({
        title: 'Upload Failed',
        description: 'Failed to upload custom frame',
        type: 'error',
        duration: 5000,
      });
    }
  };

  // Handle URL upload (for both frames and masks)
  const handleUrlUpload = async () => {
    if (!urlInputValue.trim() || !urlUploadType) return;

    try {
      // Test if URL is valid by loading the image
      await loadImage(urlInputValue);

      if (urlUploadType === 'frame') {
        // Create custom frame
        const customFrame: FrameItem = {
          name: `Custom Frame ${customFrameCounter}`,
          src: urlInputValue,
          bounds: { x: 0, y: 0, width: 1, height: 1 },
        };

        setCustomFrames((prev) => [...prev, customFrame]);
        setCustomFrameCounter((prev) => prev + 1);
        setUrlInputValue(''); // Clear input

        toaster.create({
          title: 'Custom Frame Added',
          description: `${customFrame.name} added from URL`,
          type: 'success',
          duration: 3000,
        });
      } else if (urlUploadType === 'mask') {
        // Create custom mask
        const customMask: Mask = {
          name: `Custom Mask ${customMaskCounter}`,
          src: urlInputValue,
        };

        setCustomMasks((prev) => [...prev, customMask]);
        setCustomMaskCounter((prev) => prev + 1);
        setUrlInputValue(''); // Clear input

        toaster.create({
          title: 'Custom Mask Added',
          description: `${customMask.name} added from URL`,
          type: 'success',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error loading image from URL:', error);
      toaster.create({
        title: 'Invalid URL',
        description: 'Failed to load image from URL. Please check the URL and try again.',
        type: 'error',
        duration: 5000,
      });
    }
  };

  // Handle drag and drop (unified for both frames and masks)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragDropType) return; // Don't allow drop if no type selected

    const file = e.dataTransfer.files[0];
    if (file) {
      if (dragDropType === 'frame') {
        handleFileUpload(file);
      } else if (dragDropType === 'mask') {
        handleMaskFileUpload(file);
      }
    }
  };

  // Handle file input click (unified)
  const handleFileInputClick = () => {
    if (!dragDropType) return;

    if (dragDropType === 'frame') {
      fileInputRef.current?.click();
    } else if (dragDropType === 'mask') {
      maskFileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // Reset input so same file can be uploaded again
    e.target.value = '';
  };

  // Delete custom frame
  const handleDeleteCustomFrame = (index: number) => {
    const packFramesCount = loadedPack?.frames.length || 0;
    const customFrameIndex = index - packFramesCount;

    if (customFrameIndex >= 0 && customFrameIndex < customFrames.length) {
      const deletedFrame = customFrames[customFrameIndex];
      setCustomFrames((prev) => prev.filter((_, i) => i !== customFrameIndex));

      // Reset selection if deleted frame was selected
      if (selectedFrameIndex === index) {
        setSelectedFrameIndex(null);
      } else if (selectedFrameIndex !== null && selectedFrameIndex > index) {
        // Adjust selection index if needed
        setSelectedFrameIndex(selectedFrameIndex - 1);
      }

      toaster.create({
        title: 'Custom Frame Deleted',
        description: `${deletedFrame.name} removed from frame picker`,
        type: 'info',
        duration: 3000,
      });
    }
  };

  // Handle custom mask upload from file
  const handleMaskFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toaster.create({
        title: 'Invalid File Type',
        description: 'Please upload a PNG or JPEG image',
        type: 'error',
        duration: 5000,
      });
      return;
    }

    try {
      // Read file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          // Create custom mask
          const customMask: Mask = {
            name: `Custom Mask ${customMaskCounter}`,
            src: dataUrl,
          };

          setCustomMasks((prev) => [...prev, customMask]);
          setCustomMaskCounter((prev) => prev + 1);

          toaster.create({
            title: 'Custom Mask Added',
            description: `${customMask.name} added to mask picker`,
            type: 'success',
            duration: 3000,
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading custom mask:', error);
      toaster.create({
        title: 'Upload Failed',
        description: 'Failed to upload custom mask',
        type: 'error',
        duration: 5000,
      });
    }
  };

  const handleMaskFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleMaskFileUpload(file);
    }
    // Reset input so same file can be uploaded again
    e.target.value = '';
  };

  // Delete custom mask
  const handleDeleteCustomMask = (index: number) => {
    // Calculate how many pack masks exist
    const packMasksSet = new Map<string, Mask>();
    loadedPack?.frames.forEach((frame) => {
      frame.masks?.forEach((mask) => {
        if (!packMasksSet.has(mask.src)) {
          packMasksSet.set(mask.src, mask);
        }
      });
    });
    const packMasksCount = packMasksSet.size;
    const customMaskIndex = index - packMasksCount;

    if (customMaskIndex >= 0 && customMaskIndex < customMasks.length) {
      const deletedMask = customMasks[customMaskIndex];
      setCustomMasks((prev) => prev.filter((_, i) => i !== customMaskIndex));

      // Reset selection if deleted mask was selected
      if (selectedMaskIndex === index) {
        setSelectedMaskIndex(null);
      } else if (selectedMaskIndex !== null && selectedMaskIndex > index) {
        // Adjust selection index if needed
        setSelectedMaskIndex(selectedMaskIndex - 1);
      }

      toaster.create({
        title: 'Custom Mask Deleted',
        description: `${deletedMask.name} removed from mask picker`,
        type: 'info',
        duration: 3000,
      });
    }
  };

  // Handle adding frame to card with optional position mask
  const handleAddFrameToCard = async (forceMaskIndex?: number, positionMask?: { name: string; src: string }, forceFrameIndex?: number) => {
    // Use forced frame index if provided (from double-click), otherwise use selected frame
    const frameIndex = forceFrameIndex !== undefined ? forceFrameIndex : selectedFrameIndex;
    if (frameIndex === null || !loadedPack) return;

    const selectedFrame = availableFrames[frameIndex];
    if (!selectedFrame) return;

    // Use forced mask index if provided (from double-click), otherwise use selected or default to 0
    const maskOptions = forceFrameIndex !== undefined ? getMaskOptionsForFrame(selectedFrame) : availableMasks;

    let maskIndex = forceMaskIndex !== undefined ? forceMaskIndex : (selectedMaskIndex !== null ? selectedMaskIndex : 0);

    if (maskOptions.length === 0) {
      maskIndex = -1;
    } else if (maskIndex < 0 || maskIndex >= maskOptions.length) {
      const fallbackIndex = selectedFrame.noDefaultMask
        ? 0
        : maskOptions.findIndex((mask) => mask.name === 'No Mask');
      maskIndex = fallbackIndex >= 0 ? fallbackIndex : 0;
    }

    const selectedMask = maskIndex >= 0 ? maskOptions[maskIndex] : undefined;

    try {
      // Load the frame image and ensure it's fully decoded
      const frameImage = await loadImage(selectedFrame.src);
      await frameImage.decode(); // Ensure image is ready to draw

      // Create the mask array with loaded image
      const masks: import('../../types/card.types').Mask[] = [];

      // Add regular mask if selected (and not "No Mask")
      if (selectedMask && selectedMask.name !== 'No Mask') {
        const maskImage = await loadImage(selectedMask.src);
        await maskImage.decode(); // Ensure mask image is ready to draw
        masks.push({
          name: selectedMask.name,
          src: selectedMask.src,
          image: maskImage,
          bounds: selectedMask.bounds,
          ogBounds: selectedMask.ogBounds,
        });
      }

      // Add position mask if provided
      if (positionMask) {
        const positionMaskImage = await loadImage(positionMask.src);
        await positionMaskImage.decode();
        masks.push({
          name: positionMask.name,
          src: positionMask.src,
          image: positionMaskImage,
        });
      }

      const stretchConfig = selectedFrame.stretch
        ? selectedFrame.stretch.map((entry) => ({
            name: entry.name,
            targets: [...entry.targets],
            change: entry.change ? ([...entry.change] as [number, number]) : ([0, 0] as [number, number]),
          }))
        : undefined;

      let initialColorOverrides: Record<string, FrameColorOverride> | undefined;
      if (stretchConfig) {
        const storeOverrides = useCardStore.getState().neoBasicsColorOverrides;
        initialColorOverrides = stretchConfig.reduce<Record<string, FrameColorOverride>>(
          (acc, entry) => {
            const existingOverride = storeOverrides[entry.name];
            acc[entry.name] = existingOverride ? { ...existingOverride } : { ...DEFAULT_COLOR_OVERRIDE };
            return acc;
          },
          {},
        );
      }

      // Build layer name
      const layerParts = [selectedFrame.name];
      if (selectedMask && selectedMask.name !== 'No Mask') {
        layerParts.push(selectedMask.name);
      }
      if (positionMask) {
        layerParts.push(positionMask.name);
      }
      const layerName = layerParts.join(' - ');

      // Create the frame object with initial and original values
      const newFrame: import('../../types/card.types').Frame = {
        name: layerName,
        src: selectedFrame.src,
        image: frameImage,
        masks,
        bounds: selectedFrame.bounds,
        ogBounds: selectedFrame.ogBounds || selectedFrame.bounds,
        opacity: 100, // 100 = fully opaque (0-100 scale)
        visible: true, // Default to visible
        x: 0,
        y: 0,
        scale: 1,
        hslHue: 0,
        hslSaturation: 0,
        hslLightness: 0,
        colorOverlay: '#000000',
        colorOverlayCheck: false,
        locked: false,
        erase: selectedFrame.erase, // Use destination-out compositing if true
        preserveAlpha: selectedFrame.preserveAlpha, // Preserve alpha during color adjustments
  stretch: stretchConfig,
  colorOverrides: initialColorOverrides,
        // Store original values for reset
        ogOpacity: 100,
        ogVisible: true,
        ogX: 0,
        ogY: 0,
        ogScale: 1,
        ogHslHue: 0,
        ogHslSaturation: 0,
        ogHslLightness: 0,
        ogColorOverlay: '#000000',
        ogColorOverlayCheck: false,
        neoBasicsModified: false,
      };

      // Handle complementary frames BEFORE adding the main frame
      // This ensures complementary frames appear below the main frame in the layer stack
      if (selectedFrame.complementary && masks.length === 0) {
        const complementaryIndices = Array.isArray(selectedFrame.complementary) 
          ? selectedFrame.complementary 
          : [selectedFrame.complementary];
        
        for (const complementaryIndex of complementaryIndices) {
          if (complementaryIndex < availableFrames.length) {
            // Recursively add the complementary frame(s) with no mask
            // These will be added first, appearing as bottom layers
            await handleAddFrameToCard(0, undefined, complementaryIndex); // 0 = "No Mask"
          }
        }
      }

      // Add main frame to store (goes on top of complementary frames)
      addFrame(newFrame);

      if (loadedPack?.id === 'NeoBasics') {
        applyNeoBasicsAdjustments();
      }

      // Handle special packs that add text fields dynamically
      // M15Nickname-2, M15SmoothNickname, & PromoNickname: Add nickname text field when any frame from these packs is added
      if ((loadedPack?.id === 'M15Nickname-2' || loadedPack?.id === 'M15SmoothNickname' || loadedPack?.id === 'M15Nickname' || loadedPack?.id === 'PromoNickname') && loadedPack.text?.nickname) {
        const currentText = useCardStore.getState().card.text;
        if (currentText && !currentText.nickname) {
          // Add the nickname text field from the pack's configuration
          // Convert TextConfig to TextObject (fill in required fields with defaults)
          const nicknameConfig = loadedPack.text.nickname;
          const nicknameField = {
            name: nicknameConfig.name,
            text: nicknameConfig.text,
            x: nicknameConfig.x ?? 0,
            y: nicknameConfig.y,
            width: nicknameConfig.width,
            height: nicknameConfig.height,
            size: nicknameConfig.size,
            font: nicknameConfig.font ?? 'beleren',
            color: nicknameConfig.color ?? 'black',
            align: nicknameConfig.align,
            oneLine: nicknameConfig.oneLine,
          };
          useCardStore.getState().updateText('nickname', nicknameField);
        }
      }

      toaster.create({
        title: 'Frame Added',
        description: layerName + ' added to card',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error loading frame images:', error);
      toaster.create({
        title: 'Error',
        description: 'Failed to load frame image',
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <VStack align="stretch" gap={4}>
      {/* Frame Selectors Row */}
      <HStack align="flex-start" gap={3}>
        {/* Frame Group Selector */}
        <Box flex={1}>
          <Field label="Frame Group">
            <NativeSelectRoot>
              <NativeSelectField
                value={selectedGroupId}
                onChange={(e) => handleGroupChange(e.target.value)}
              >
                {frameGroupSections.map((section) => (
                  <optgroup key={section.label} label={section.label}>
                    {section.groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
        </Box>

        {/* Frame Pack Selector - Dynamically populated based on selected group */}
        <Box flex={1}>
          <Field label="Frame Pack">
            <NativeSelectRoot>
              <NativeSelectField
                value={selectedPackId || ''}
                onChange={(e) => handlePackChange(e.target.value)}
              >
                {!selectedPackId && <option value="">Select a pack...</option>}
                {availablePacks.map((entry, index) => {
                  if (entry.kind === 'label') {
                    return (
                      <option key={`label-${index}`} disabled style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                        {entry.label}
                      </option>
                    );
                  } else {
                    return (
                      <option key={entry.id} value={entry.id}>
                        {entry.label}
                      </option>
                    );
                  }
                })}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
        </Box>

        {/* Search */}
        <Box flex={1}>
          <Field label="Search Groups & Packs">
            <Box position="relative">
              <Input
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => {
                  // Delay to allow click on search results
                  setTimeout(() => setShowSearchResults(false), 200);
                }}
                bg="rgba(0, 0, 0, 0.3)"
              />

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  mt={1}
                  bg="rgba(20, 20, 20, 0.98)"
                  border="1px solid"
                  borderColor="gray.600"
                  borderRadius="md"
                  maxH="300px"
                  overflowY="auto"
                  zIndex={1000}
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#1a1a1a',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#404040',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#505050',
                    },
                  }}
                >
                  {searchResults.map((result, index) => (
                    <Box
                      key={index}
                      p={3}
                      cursor="pointer"
                      _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                      borderBottom={index < searchResults.length - 1 ? '1px solid' : 'none'}
                      borderColor="gray.700"
                      onClick={() => handleSearchResultSelect(result)}
                    >
                      {result.type === 'group' ? (
                        <VStack align="stretch" gap={1}>
                          <Box fontSize="sm" fontWeight="medium" color="blue.300">
                            Group: {result.groupLabel}
                          </Box>
                        </VStack>
                      ) : (
                        <VStack align="stretch" gap={1}>
                          <Box fontSize="sm" fontWeight="medium">
                            {result.packLabel}
                          </Box>
                          <Box fontSize="xs" color="gray.400">
                            in {result.groupLabel}
                          </Box>
                        </VStack>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Field>
        </Box>
      </HStack>

      {/* Load Frame Version */}
      {/* -- Temprarily Disabled this, I think its useless, it should autoload whatever frame you choose by default--DSKZ 
      <HStack gap={2}>
        <Button flex={1} colorPalette="blue" variant="outline">
          Load Frame Version
        </Button>
        <Checkbox.Root
          checked={autoLoad}
          onCheckedChange={(e) => setAutoLoad(e.checked === true)}
          colorPalette="blue"
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Auto</Checkbox.Label>
        </Checkbox.Root>
      </HStack>*/}

      {/* Frame Picker and Mask Picker Side by Side */}
      <Box>
        <Heading size="sm" mb={3}>
          Frame & Mask Picker
        </Heading>
        <HStack align="stretch" gap={3}>
          {/* Frame Picker */}
          <Box flex={1}>
            <Box
              bg="rgba(0, 0, 0, 0.5)"
              borderRadius="md"
              p={3}
              h="300px"
              overflowY="auto"
              pointerEvents="auto"
              opacity={1}
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#1a1a1a',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#404040',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#505050',
                },
              }}
            >
              <SimpleGrid columns={5} gap={2}>
                {availableFrames.length === 0 ? (
                  <Box
                    gridColumn="1 / -1"
                    textAlign="center"
                    color="gray.500"
                    py={8}
                  >
                    Select a frame pack to load frames
                  </Box>
                ) : (
                  availableFrames.map((frame, index) => {
                    const packFramesCount = loadedPack?.frames.length || 0;
                    const isCustomFrame = index >= packFramesCount;

                    return (
                      <Box
                        key={index}
                        position="relative"
                        borderRadius="md"
                        p={1}
                        cursor="pointer"
                        border="2px solid"
                        borderColor={selectedFrameIndex === index ? 'blue.400' : 'transparent'}
                        boxShadow={selectedFrameIndex === index ? '0 0 12px rgba(66, 153, 225, 0.6)' : 'none'}
                        _hover={{ borderColor: selectedFrameIndex === index ? 'blue.300' : 'gray.600' }}
                        transition="all 0.2s"
                        onClick={() => setSelectedFrameIndex(selectedFrameIndex === index ? null : index)}
                        onDoubleClick={() => {
                          setSelectedFrameIndex(index);
                          // Pass the frame index directly to avoid state timing issues
                          handleAddFrameToCard(undefined, undefined, index);
                        }}
                      >
                        {/* Delete button for custom frames only */}
                        {isCustomFrame && (
                          <IconButton
                            position="absolute"
                            top={1}
                            left={1}
                            size="xs"
                            aria-label="Delete custom frame"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomFrame(index);
                            }}
                            bg="red.500"
                            colorPalette="red"
                            _hover={{ bg: 'red.600' }}
                            borderRadius="sm"
                            zIndex={10}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </IconButton>
                        )}

                        <Image
                          src={isCustomFrame ? frame.src : getThumbnailPath(frame.src)}
                          alt={frame.name}
                          w="full"
                          h="100px"
                          objectFit="contain"
                          borderRadius="sm"
                          bg="transparent"
                          onError={(e) => {
                            // Fallback to full image if thumbnail fails
                            const img = e.currentTarget as HTMLImageElement;
                            if (!img.src.endsWith(frame.src)) {
                              img.src = frame.src;
                            }
                          }}
                        />
                      </Box>
                    );
                  })
                )}
              </SimpleGrid>
            </Box>
          </Box>

          {/* Mask Picker */}
          <Box flex={1}>
            <Box
              bg="rgba(0, 0, 0, 0.5)"
              borderRadius="md"
              p={3}
              h="300px"
              overflowY="auto"
              pointerEvents="auto"
              opacity={1}
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#1a1a1a',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#404040',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#505050',
                },
              }}
            >
              <SimpleGrid columns={4} gap={2}>
                {availableMasks.length === 0 ? (
                  <Box
                    gridColumn="1 / -1"
                    textAlign="center"
                    color="gray.500"
                    py={8}
                  >
                    Select a frame pack to load masks
                  </Box>
                ) : (
                  availableMasks.map((mask, index) => {
                    // Calculate if this is a custom mask
                    // availableMasks structure depends on noDefaultMask:
                    // - Without noDefaultMask: [noMask, ...selectedFrame.masks, ...customMasks]
                    // - With noDefaultMask: [...selectedFrame.masks, ...customMasks]
                    const selectedFrame = selectedFrameIndex !== null ? availableFrames[selectedFrameIndex] : null;
                    const hasNoMask = !selectedFrame?.noDefaultMask;
                    const frameMasksCount = (selectedFrame?.masks?.length || 0) + (hasNoMask ? 1 : 0);
                    const isCustomMask = index >= frameMasksCount;

                    return (
                      <Box
                        key={index}
                        position="relative"
                        borderRadius="md"
                        p={1}
                        cursor="pointer"
                        border="2px solid"
                        borderColor={selectedMaskIndex === index ? 'green.400' : 'transparent'}
                        boxShadow={selectedMaskIndex === index ? '0 0 12px rgba(72, 187, 120, 0.6)' : 'none'}
                        _hover={{ borderColor: selectedMaskIndex === index ? 'green.300' : 'gray.600' }}
                        transition="all 0.2s"
                        onClick={() => setSelectedMaskIndex(selectedMaskIndex === index ? null : index)}
                        onDoubleClick={() => {
                          setSelectedMaskIndex(index);
                          // Pass the mask index directly to avoid state timing issues
                          handleAddFrameToCard(index);
                        }}
                      >
                        {/* Delete button for custom masks only */}
                        {isCustomMask && (
                          <IconButton
                            position="absolute"
                            top={1}
                            left={1}
                            size="xs"
                            aria-label="Delete custom mask"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomMask(index);
                            }}
                            bg="red.500"
                            colorPalette="red"
                            _hover={{ bg: 'red.600' }}
                            borderRadius="sm"
                            zIndex={10}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </IconButton>
                        )}

                        <Image
                          src={isCustomMask ? mask.src : getThumbnailPath(mask.src)}
                          alt={mask.name}
                          w="full"
                          h="100px"
                          objectFit="contain"
                          borderRadius="sm"
                          bg="transparent"
                          onError={(e) => {
                            // Fallback to full image if thumbnail fails
                            const img = e.currentTarget as HTMLImageElement;
                            if (!img.src.endsWith(mask.src)) {
                              img.src = mask.src;
                            }
                          }}
                        />
                        <Box
                          mt={1}
                          textAlign="center"
                          fontSize="xs"
                          color="gray.300"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {mask.name}
                        </Box>
                      </Box>
                    );
                  })
                )}
              </SimpleGrid>
            </Box>
          </Box>
        </HStack>
      </Box>

      {/* Add Frame Buttons */}
      <Box>
        {/* <Heading size="sm" mb={3}>
          Add Frame to Card
        </Heading> */}
        <SimpleGrid columns={3} gap={2}>
          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            disabled={selectedFrameIndex === null}
            onClick={() => handleAddFrameToCard()}
          >
            Add Frame to Card
          </Button>
          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            disabled={selectedFrameIndex === null}
            onClick={() => handleAddFrameToCard(undefined, { name: 'Left Half', src: '/img/frames/maskLeftHalf.png' })}
          >
            Left Half
          </Button>
          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            disabled={selectedFrameIndex === null}
            onClick={() => handleAddFrameToCard(undefined, { name: 'Right Half', src: '/img/frames/maskRightHalf.png' })}
          >
            Right Half
          </Button>
          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            disabled={selectedFrameIndex === null}
            onClick={() => handleAddFrameToCard(undefined, { name: 'Middle', src: '/img/frames/maskMiddleThird.png' })}
          >
            Middle
          </Button>
          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            disabled={selectedFrameIndex === null}
            onClick={() => handleAddFrameToCard(undefined, { name: 'Top Half', src: '/img/frames/maskTopHalf.png' })}
          >
            Top Half
          </Button>
          <Button
            colorPalette="green"
            variant="outline"
            size="sm"
            disabled={selectedFrameIndex === null}
            onClick={() => handleAddFrameToCard(undefined, { name: 'Bottom Half', src: '/img/frames/maskBottomHalf.png' })}
          >
            Bottom Half
          </Button>
        </SimpleGrid>
      </Box>

      {/* Frame Layer List */}
      <Box>
        <Heading size="sm" mb={2}>
          Frame Layers
        </Heading>
        <Box
          bg="rgba(0, 0, 0, 0.3)"
          borderRadius="md"
          p={3}
        >
          <Box
            fontSize="xs"
            color="gray.400"
            mb={3}
            textAlign="center"
          >
            Drag to reorder frame images
          </Box>
          <FrameLayerList />
          {useCardStore((state) => state.card.frames).length === 0 && (
            <Box
              textAlign="center"
              color="gray.500"
              fontSize="sm"
              py={6}
            >
              No frames added yet. Select a frame and click "Add Frame to Card" or double-click a frame.
            </Box>
          )}
        </Box>
        <Box
          fontSize="xs"
          color="gray.400"
          mt={2}
          textAlign="center"
        >
          You may also click to edit opacity, position, size, and more
        </Box>
      </Box>

      {/* More Options - Collapsible */}
      <Box>
        <Collapsible.Root open={showMoreOptions}>
          <Collapsible.Trigger asChild>
            <Button
              variant="ghost"
              w="full"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              justifyContent="space-between"
            >
              More Options
              <Box transform={showMoreOptions ? 'rotate(180deg)' : 'rotate(0deg)'} transition="transform 0.2s">
                ▼
              </Box>
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <VStack align="stretch" gap={3} mt={3} p={4} bg="rgba(0, 0, 0, 0.3)" borderRadius="md">
              {/* Drag & Drop Upload Section */}
              <Box>
                <Heading size="xs" mb={2}>
                  Drag & Drop to Upload Custom Frame or Mask
                </Heading>

                {/* Radio Cards */}
                <RadioCard.Root
                  value={dragDropType || ''}
                  onValueChange={(e) => setDragDropType(e.value as 'frame' | 'mask' | null)}
                >
                  <HStack gap={3} align="stretch">
                    <RadioCard.Item
                      value="frame"
                      flex={1}
                      cursor="pointer"
                      border="2px solid"
                      borderColor={dragDropType === 'frame' ? 'blue.400' : 'gray.600'}
                      boxShadow={dragDropType === 'frame' ? '0 0 12px rgba(66, 153, 225, 0.6)' : 'none'}
                      _hover={{ borderColor: dragDropType === 'frame' ? 'blue.300' : 'gray.500' }}
                      transition="all 0.2s"
                      p={4}
                      borderRadius="md"
                      bg="rgba(0, 0, 0, 0.3)"
                    >
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText textAlign="center" fontSize="sm">
                          Upload Custom Frame
                        </RadioCard.ItemText>
                      </RadioCard.ItemControl>
                    </RadioCard.Item>

                    <RadioCard.Item
                      value="mask"
                      flex={1}
                      cursor="pointer"
                      border="2px solid"
                      borderColor={dragDropType === 'mask' ? 'green.400' : 'gray.600'}
                      boxShadow={dragDropType === 'mask' ? '0 0 12px rgba(72, 187, 120, 0.6)' : 'none'}
                      _hover={{ borderColor: dragDropType === 'mask' ? 'green.300' : 'gray.500' }}
                      transition="all 0.2s"
                      p={4}
                      borderRadius="md"
                      bg="rgba(0, 0, 0, 0.3)"
                    >
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText textAlign="center" fontSize="sm">
                          Upload Custom Mask
                        </RadioCard.ItemText>
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  </HStack>
                </RadioCard.Root>

                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
                <input
                  ref={maskFileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  style={{ display: 'none' }}
                  onChange={handleMaskFileInputChange}
                />

                {/* Drag and drop zone */}
                <Box mt={3}>
                  <Box
                    border="2px dashed"
                    borderColor={dragDropType ? 'gray.600' : 'gray.700'}
                    borderRadius="md"
                    p={6}
                    textAlign="center"
                    color={dragDropType ? 'gray.400' : 'gray.600'}
                    cursor={dragDropType ? 'pointer' : 'not-allowed'}
                    opacity={dragDropType ? 1 : 0.5}
                    _hover={dragDropType ? { borderColor: 'gray.500', bg: 'rgba(255, 255, 255, 0.05)' } : {}}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleFileInputClick}
                  >
                    {dragDropType === 'frame' && 'Drag & Drop or Click to Upload a Custom Frame'}
                    {dragDropType === 'mask' && 'Drag & Drop or Click to Upload a Custom Mask'}
                    {!dragDropType && 'Select frame or mask above'}
                    <Box fontSize="xs" mt={1} color={dragDropType ? 'gray.500' : 'gray.600'}>
                      {dragDropType ? 'Accepts PNG, JPG, JPEG' : ''}
                    </Box>
                  </Box>
                  {/* {dragDropType === 'mask' && (
                    <Box fontSize="xs" color="gray.500" mt={2} textAlign="center">
                      Custom masks are tied to the current frame pack and will be removed when changing packs
                    </Box>
                  )} */}
                </Box>
              </Box>

              {/* URL Upload Section with Radio Cards */}
              <Box>
                <Heading size="xs" mb={2}>
                  Upload from URL
                </Heading>

                {/* Radio Cards */}
                <RadioCard.Root
                  value={urlUploadType || ''}
                  onValueChange={(e) => setUrlUploadType(e.value as 'frame' | 'mask' | null)}
                >
                  <HStack gap={3} align="stretch">
                    <RadioCard.Item
                      value="frame"
                      flex={1}
                      cursor="pointer"
                      border="2px solid"
                      borderColor={urlUploadType === 'frame' ? 'blue.400' : 'gray.600'}
                      boxShadow={urlUploadType === 'frame' ? '0 0 12px rgba(66, 153, 225, 0.6)' : 'none'}
                      _hover={{ borderColor: urlUploadType === 'frame' ? 'blue.300' : 'gray.500' }}
                      transition="all 0.2s"
                      p={4}
                      borderRadius="md"
                      bg="rgba(0, 0, 0, 0.3)"
                    >
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText textAlign="center" fontSize="sm">
                          Upload Custom Frame from URL
                        </RadioCard.ItemText>
                      </RadioCard.ItemControl>
                    </RadioCard.Item>

                    <RadioCard.Item
                      value="mask"
                      flex={1}
                      cursor="pointer"
                      border="2px solid"
                      borderColor={urlUploadType === 'mask' ? 'green.400' : 'gray.600'}
                      boxShadow={urlUploadType === 'mask' ? '0 0 12px rgba(72, 187, 120, 0.6)' : 'none'}
                      _hover={{ borderColor: urlUploadType === 'mask' ? 'green.300' : 'gray.500' }}
                      transition="all 0.2s"
                      p={4}
                      borderRadius="md"
                      bg="rgba(0, 0, 0, 0.3)"
                    >
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText textAlign="center" fontSize="sm">
                          Upload Custom Mask from URL
                        </RadioCard.ItemText>
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  </HStack>
                </RadioCard.Root>

                {/* URL Input */}
                <Box mt={3}>
                  <Field label="Image URL:">
                    <HStack gap={2}>
                      <Input
                        placeholder={
                          urlUploadType === 'frame'
                            ? 'https://example.com/frame.png'
                            : urlUploadType === 'mask'
                            ? 'https://example.com/mask.png'
                            : 'Select frame or mask above'
                        }
                        bg="rgba(0, 0, 0, 0.3)"
                        value={urlInputValue}
                        onChange={(e) => setUrlInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && urlUploadType && urlInputValue.trim()) {
                            handleUrlUpload();
                          }
                        }}
                        disabled={!urlUploadType}
                      />
                      <Button
                        colorPalette={urlUploadType === 'frame' ? 'blue' : urlUploadType === 'mask' ? 'green' : 'gray'}
                        variant="outline"
                        size="sm"
                        onClick={handleUrlUpload}
                        disabled={!urlUploadType || !urlInputValue.trim()}
                      >
                        Add
                      </Button>
                    </HStack>
                  </Field>
                </Box>
              </Box>

              {/* Settings */}
              <Box>
                <Heading size="xs" mb={2}>
                  Frame Settings
                </Heading>
                <VStack align="stretch" gap={2}>
                  <Checkbox.Root
                    checked={roundedCorners}
                    onCheckedChange={(e) => setRoundedCorners(e.checked === true)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Rounded Corners (PENDING IMPLEMENTATION)</Checkbox.Label>
                  </Checkbox.Root>
                  <Checkbox.Root
                    checked={showGuidelines}
                    onCheckedChange={(e) => setShowGuidelinesStore(e.checked === true)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Show Guidelines</Checkbox.Label>
                  </Checkbox.Root>
                  <Checkbox.Root
                    checked={showTransparencies}
                    onCheckedChange={(e) => setShowTransparenciesStore(e.checked === true)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>Show Transparencies</Checkbox.Label>
                  </Checkbox.Root>
                </VStack>
              </Box>
            </VStack>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>

      {/* Frame Layer Editor Drawer */}
      <FrameLayerEditor
        isOpen={isFrameEditorOpen}
        onClose={closeFrameEditor}
        frameIndex={editingFrameIndex}
      />
    </VStack>
  );
};
