/**
 * Card Conjurer - Zustand State Store
 * Central state management for the card creator
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  Card,
  Frame,
  TextObject,
  FrameOption,
  CardBounds,
  SagaInfo,
  PlaneswalkerInfo,
  FrameColorOverride,
  StationState,
} from '../types/card.types';
import type { FramePackTemplate } from '../components/frames/packs/types';
import {
  NEO_BASICS_FRAME_PREFIX,
  NEO_BASICS_BASE_TITLE_HEIGHT,
  NEO_BASICS_MIN_TITLE_HEIGHT,
  DEFAULT_COLOR_OVERRIDE,
  clampNeoBasicsTitleHeight,
  cloneNeoBasicsOverrides,
  computeNeoBasicsChange,
  generateStretchedFrameImage,
} from '../utils/neoBasics';
import { loadImage } from '../utils/canvasHelpers';
import {
  applyStationVersionPreset,
  areStationsEqual,
  cloneStationState,
  createStationDefaults,
  mergeStationDefaults,
} from '../utils/stationDefaults';
import { TABS, CARD_VERSIONS, TEXT_FIELDS } from '../constants';

const BASE_WIDTH = 2010;
const BASE_HEIGHT = 2814;

interface CardState {
  // Card data
  card: Card;

  // UI state
  selectedFrameIndex: number;
  selectedMaskIndex: number;
  selectedTextIndex: number;
  availableFrames: FrameOption[];
  currentTab: string;
  showGuidelines: boolean;
  showTransparencies: boolean;
  loadedPack: FramePackTemplate | null;
  isFrameEditorOpen: boolean;
  editingFrameIndex: number | null;
  hasShownSagaTab: boolean;
  hasShownPlaneswalkerTab: boolean;
  hasShownKamigawaTab: boolean;
  hasShownStationsTab: boolean;
  neoBasicsTitleHeight: number;
  neoBasicsElements: string[];
  neoBasicsColorOverrides: Record<string, FrameColorOverride>;

  // Set Symbol inputs (not persisted - reset on reload)
  setCode: string;
  rarity: string;

  // Collector info inputs (not persisted - reset on reload)
  collectorSetCode: string;
  collectorLanguage: string;
  collectorArtist: string;
  collectorRarity: string;
  collectorDigits: string;

  // Image elements (not persisted)
  artImage: HTMLImageElement | null;
  setSymbolImage: HTMLImageElement | null;
  watermarkImage: HTMLImageElement | null;
  manaSymbolImages: { [key: string]: HTMLImageElement };

  // Canvas reference (not persisted)
  previewCanvasRef: HTMLCanvasElement | null;

  // Actions - Card Management
  updateCard: (updates: Partial<Card>) => void;
  resetCard: () => void;

  // Actions - Frame Management
  addFrame: (frame: Frame) => void;
  removeFrame: (index: number) => void;
  updateFrame: (index: number, updates: Partial<Frame>) => void;
  reorderFrames: (oldIndex: number, newIndex: number) => void;
  setSelectedFrameIndex: (index: number) => void;
  toggleFrameVisibility: (index: number) => void;

  // Actions - Text Management
  updateText: (name: string, updates: Partial<TextObject>) => void;
  setText: (text: { [key: string]: TextObject }) => void;
  setSelectedTextIndex: (index: number) => void;

  // Actions - Art Management
  updateArt: (updates: {
    artSource?: string;
    artX?: number;
    artY?: number;
    artZoom?: number;
    artRotate?: number;
  }) => void;
  setArtImage: (image: HTMLImageElement | null) => void;

  // Actions - Set Symbol Management
  updateSetSymbol: (updates: {
    setSymbolSource?: string;
    setSymbolX?: number;
    setSymbolY?: number;
    setSymbolZoom?: number;
  }) => void;
  setSetSymbolImage: (image: HTMLImageElement | null) => void;
  setSetCode: (code: string) => void;
  setRarity: (rarity: string) => void;

  // Actions - Collector Info Management
  setCollectorSetCode: (code: string) => void;
  setCollectorLanguage: (language: string) => void;
  setCollectorArtist: (artist: string) => void;
  setCollectorRarity: (rarity: string) => void;
  setCollectorDigits: (digits: string) => void;

  // Actions - Watermark Management
  updateWatermark: (updates: {
    watermarkSource?: string;
    watermarkX?: number;
    watermarkY?: number;
    watermarkZoom?: number;
    watermarkLeft?: string;
    watermarkRight?: string;
    watermarkOpacity?: number;
  }) => void;
  setWatermarkImage: (image: HTMLImageElement | null) => void;

  // Actions - Mana Symbol Management
  setManaSymbolImages: (images: { [key: string]: HTMLImageElement }) => void;

  // Actions - Canvas Management
  setPreviewCanvasRef: (ref: HTMLCanvasElement | null) => void;

  // Actions - UI Management
  setCurrentTab: (tab: string) => void;
  setAvailableFrames: (frames: FrameOption[]) => void;
  setShowGuidelines: (show: boolean) => void;
  setShowTransparencies: (show: boolean) => void;
  setLoadedPack: (pack: FramePackTemplate | null) => void;
  openFrameEditor: (index: number) => void;
  closeFrameEditor: () => void;
  setHasShownSagaTab: (shown: boolean) => void;
  setHasShownPlaneswalkerTab: (shown: boolean) => void;
  setHasShownKamigawaTab: (shown: boolean) => void;
  setHasShownStationsTab: (shown: boolean) => void;
  initializeNeoBasicsControls: (elements: string[]) => void;
  setNeoBasicsTitleHeight: (value: number) => void;
  setNeoBasicsColorOverride: (
    element: string,
    override: Partial<FrameColorOverride> & { mode?: 'auto' | 'manual' }
  ) => void;
  resetNeoBasicsColors: () => void;
  applyNeoBasicsAdjustments: () => void;
  setSagaInfo: (updates: Partial<SagaInfo>) => void;
  resetSagaInfo: (preset?: SagaInfo | null) => void;
  setPlaneswalkerInfo: (updates: Partial<PlaneswalkerInfo>) => void;
  resetPlaneswalkerInfo: (preset?: PlaneswalkerInfo | null) => void;
  // Serial visibility
  showSerialNumbers: boolean;
  setShowSerialNumbers: (show: boolean) => void;

  // Station management
  initializeStation: (version?: string) => void;
  updateStationState: (updater: (station: StationState) => StationState) => void;
  resetStationSettings: () => void;

  // Art debugging
  showArtBoundsDebug: boolean;
  customArtBounds: CardBounds | null;
  setShowArtBoundsDebug: (show: boolean) => void;
  setCustomArtBounds: (bounds: CardBounds | null) => void;

  // Auto-fit art (not persisted)
  autoFitArt: boolean;
  setAutoFitArt: (enabled: boolean) => void;
}

/**
 * Calculate required margins based on frame and mask bounds
 * Returns the maximum margin needed to accommodate all frames and their masks
 */
const calculateRequiredMargins = (frames: Frame[]): { marginX: number; marginY: number } => {
  let maxMarginX = 0;
  let maxMarginY = 0;

  const checkBounds = (bounds: { x: number; y: number; width: number; height: number }) => {
    // Calculate how much the bounds extend beyond [0, 1] range
    // Negative X means it extends to the left
    if (bounds.x < 0) {
      maxMarginX = Math.max(maxMarginX, Math.abs(bounds.x));
    }

    // If (x + width) > 1, it extends to the right
    if (bounds.x + bounds.width > 1) {
      maxMarginX = Math.max(maxMarginX, bounds.x + bounds.width - 1);
    }

    // Negative Y means it extends to the top
    if (bounds.y < 0) {
      maxMarginY = Math.max(maxMarginY, Math.abs(bounds.y));
    }

    // If (y + height) > 1, it extends to the bottom
    if (bounds.y + bounds.height > 1) {
      maxMarginY = Math.max(maxMarginY, bounds.y + bounds.height - 1);
    }
  };

  frames.forEach((frame) => {
    // Check frame bounds
    if (frame.bounds) {
      checkBounds(frame.bounds);
    }

    // Check mask bounds (margin masks can extend beyond frame)
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

const PLANESWALKER_SLOT_COUNT = 4;

const clonePlaneswalkerInfo = (info?: PlaneswalkerInfo | null): PlaneswalkerInfo => ({
  abilities: [
    info?.abilities?.[0] ?? '',
    info?.abilities?.[1] ?? '',
    info?.abilities?.[2] ?? '',
    info?.abilities?.[3] ?? '',
  ] as [string, string, string, string],
  abilityAdjust: [
    info?.abilityAdjust?.[0] ?? 0,
    info?.abilityAdjust?.[1] ?? 0,
    info?.abilityAdjust?.[2] ?? 0,
    info?.abilityAdjust?.[3] ?? 0,
  ] as [number, number, number, number],
  count: info?.count ?? 0,
  x: info?.x ?? 0.1167,
  width: info?.width ?? 0.8094,
  invert: info?.invert ?? false,
  baseY: info?.baseY,
  originalAbilityBounds: info?.originalAbilityBounds
    ? info.originalAbilityBounds.map((bounds) => ({ ...bounds }))
    : [],
  defaultHeights: info?.defaultHeights
    ? ([...info.defaultHeights] as [number, number, number, number])
    : undefined,
  defaultAbilities: info?.defaultAbilities
    ? ([...info.defaultAbilities] as [string, string, string, string])
    : undefined,
  defaultAbilityAdjust: info?.defaultAbilityAdjust
    ? ([...info.defaultAbilityAdjust] as [number, number, number, number])
    : undefined,
});

const mergePlaneswalkerInfo = (
  current: PlaneswalkerInfo | null | undefined,
  updates: Partial<PlaneswalkerInfo>
): PlaneswalkerInfo => {
  const next = clonePlaneswalkerInfo(current);

  if (updates.abilities) {
    for (let i = 0; i < PLANESWALKER_SLOT_COUNT; i += 1) {
      if (updates.abilities[i] !== undefined) {
        next.abilities[i] = updates.abilities[i] ?? '';
      }
    }
  }

  if (updates.abilityAdjust) {
    for (let i = 0; i < PLANESWALKER_SLOT_COUNT; i += 1) {
      if (updates.abilityAdjust[i] !== undefined) {
        next.abilityAdjust[i] = updates.abilityAdjust[i] ?? 0;
      }
    }
  }

  if (typeof updates.count === 'number') {
    next.count = updates.count;
  }
  if (typeof updates.x === 'number') {
    next.x = updates.x;
  }
  if (typeof updates.width === 'number') {
    next.width = updates.width;
  }
  if (typeof updates.invert === 'boolean') {
    next.invert = updates.invert;
  }
  if (updates.baseY !== undefined) {
    next.baseY = updates.baseY;
  }
  if (updates.originalAbilityBounds) {
    next.originalAbilityBounds = updates.originalAbilityBounds.map((bounds) => ({ ...bounds }));
  }
  if (updates.defaultHeights) {
    next.defaultHeights = [...updates.defaultHeights] as [number, number, number, number];
  }
  if (updates.defaultAbilities) {
    next.defaultAbilities = [...updates.defaultAbilities] as [string, string, string, string];
  }
  if (updates.defaultAbilityAdjust) {
    next.defaultAbilityAdjust = [...updates.defaultAbilityAdjust] as [number, number, number, number];
  }

  return next;
};

const getInitialCard = (): Card => ({
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
  marginX: 0,
  marginY: 0,
  frames: [],
  artSource: '/img/blank.png',
  artX: 0,
  artY: 0,
  artZoom: 1,
  artRotate: 0,
  setSymbolSource: '/img/blank.png',
  setSymbolX: 0,
  setSymbolY: 0,
  setSymbolZoom: 1,
  watermarkSource: '/img/blank.png',
  watermarkX: 0,
  watermarkY: 0,
  watermarkZoom: 1,
  watermarkLeft: '#b79d58',
  watermarkRight: 'none',
  watermarkOpacity: 0.4,
  version: '',
  manaSymbols: [],
  text: {},
  bottomInfo: {},
  // Serial defaults
  serialNumber: undefined,
  serialTotal: undefined,
  serialX: 172,
  serialY: 1383,
  serialScale: 1.0,
  landscape: false,
  margins: false,
  bottomInfoTranslate: { x: 0, y: 0 },
  bottomInfoRotate: 0,
  bottomInfoZoom: 1,
  bottomInfoColor: 'white',
  hideBottomInfoBorder: false,
  showsFlavorBar: true,
  onload: null,
  infoYear: new Date().getFullYear(),
  showCollectorInfo: false,
  collectorInfoStyle: 'default',
  saga: null,
});

export const useCardStore = create<CardState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        card: getInitialCard(),
        selectedFrameIndex: 0,
        selectedMaskIndex: 0,
        selectedTextIndex: 0,
        availableFrames: [],
        currentTab: TABS.FRAME,
  planeswalker: null,
        showGuidelines: false,
        showTransparencies: false,
        loadedPack: null,
        isFrameEditorOpen: false,
        editingFrameIndex: null,
        hasShownSagaTab: false,
        hasShownPlaneswalkerTab: false,
        hasShownKamigawaTab: false,
        hasShownStationsTab: false,
  neoBasicsTitleHeight: NEO_BASICS_MIN_TITLE_HEIGHT,
  neoBasicsElements: [],
  neoBasicsColorOverrides: {},
        setCode: '',
        rarity: '',
        collectorSetCode: 'MTG',
        collectorLanguage: 'EN',
        collectorArtist: '',
        collectorRarity: 'P',
        collectorDigits: '2025',
        artImage: null,
        setSymbolImage: null,
        watermarkImage: null,
        manaSymbolImages: {},
        previewCanvasRef: null,
        showSerialNumbers: false,
        showArtBoundsDebug: false,
        customArtBounds: null,
        autoFitArt: true,

        // Card Management
        updateCard: (updates) => {
          set((state) => ({
            card: { ...state.card, ...updates },
          }));
        },

        resetCard: () => {
          set({
            card: getInitialCard(),
            selectedFrameIndex: 0,
            selectedMaskIndex: 0,
            selectedTextIndex: 0,
          });
        },

        // Frame Management
        addFrame: (frame) => {
          set((state) => {
            const newFrames = [...state.card.frames, frame];
            const { marginX, marginY } = calculateRequiredMargins(newFrames);

            return {
              card: {
                ...state.card,
                frames: newFrames,
                marginX,
                marginY,
              },
            };
          });
        },

        removeFrame: (index) => {
          set((state) => {
            const newFrames = state.card.frames.filter((_, i) => i !== index);
            const { marginX, marginY } = calculateRequiredMargins(newFrames);

            return {
              card: {
                ...state.card,
                frames: newFrames,
                marginX,
                marginY,
              },
              selectedFrameIndex: Math.max(0, state.selectedFrameIndex - 1),
            };
          });
        },

        updateFrame: (index, updates) => {
          set((state) => ({
            card: {
              ...state.card,
              frames: state.card.frames.map((frame, i) =>
                i === index ? { ...frame, ...updates } : frame
              ),
            },
          }));
        },

        reorderFrames: (oldIndex, newIndex) => {
          set((state) => {
            const frames = [...state.card.frames];
            const [movedFrame] = frames.splice(oldIndex, 1);
            frames.splice(newIndex, 0, movedFrame);
            return {
              card: { ...state.card, frames },
            };
          });
        },

        setSelectedFrameIndex: (index) => {
          set({ selectedFrameIndex: index });
        },

        toggleFrameVisibility: (index) => {
          set((state) => ({
            card: {
              ...state.card,
              frames: state.card.frames.map((frame, i) =>
                i === index ? { ...frame, visible: frame.visible === false ? true : false } : frame
              ),
            },
          }));
        },

        // Text Management
        updateText: (name, updates) => {
          set((state) => ({
            card: {
              ...state.card,
              text: {
                ...state.card.text,
                [name]: { ...(state.card.text?.[name] || {}), ...updates } as TextObject,
              },
            },
          }));
        },

        setText: (text) => {
          set((state) => ({
            card: { ...state.card, text },
          }));
        },

        setSelectedTextIndex: (index) => {
          set({ selectedTextIndex: index });
        },

        // Art Management
        updateArt: (updates) => {
          set((state) => ({
            card: { ...state.card, ...updates },
          }));
        },

        setArtImage: (image) => {
          set({ artImage: image });
        },

        // Set Symbol Management
        updateSetSymbol: (updates) => {
          set((state) => ({
            card: { ...state.card, ...updates },
          }));
        },

        setSetSymbolImage: (image) => {
          set({ setSymbolImage: image });
        },

        setSetCode: (code) => {
          set({ setCode: code });
        },

        setRarity: (rarity) => {
          set({ rarity: rarity });
        },

        // Collector Info Management
        setCollectorSetCode: (code) => {
          set({ collectorSetCode: code });
        },

        setCollectorLanguage: (language) => {
          set({ collectorLanguage: language });
        },

        setCollectorArtist: (artist) => {
          set({ collectorArtist: artist });
        },

        setCollectorRarity: (rarity) => {
          set({ collectorRarity: rarity });
        },

        setCollectorDigits: (digits) => {
          set({ collectorDigits: digits });
        },

        // Watermark Management
        updateWatermark: (updates) => {
          set((state) => ({
            card: { ...state.card, ...updates },
          }));
        },

        setWatermarkImage: (image) => {
          set({ watermarkImage: image });
        },

        // Mana Symbol Management
        setManaSymbolImages: (images) => {
          set({ manaSymbolImages: images });
        },

        // Canvas Management
        setPreviewCanvasRef: (ref) => {
          set({ previewCanvasRef: ref });
        },

        // UI Management
        setCurrentTab: (tab) => {
          set({ currentTab: tab });
        },

        setAvailableFrames: (frames) => {
          set({ availableFrames: frames });
        },

        setShowGuidelines: (show) => {
          set({ showGuidelines: show });
        },

        setShowTransparencies: (show) => {
          set({ showTransparencies: show });
        },

        setLoadedPack: (pack) => {
          set({ loadedPack: pack });
        },

        openFrameEditor: (index) => {
          set({ editingFrameIndex: index, isFrameEditorOpen: true });
        },

        closeFrameEditor: () => {
          set({ editingFrameIndex: null, isFrameEditorOpen: false });
        },

        setHasShownSagaTab: (shown) => {
          set({ hasShownSagaTab: shown });
        },

        setHasShownPlaneswalkerTab: (shown) => {
          set({ hasShownPlaneswalkerTab: shown });
        },

        setHasShownKamigawaTab: (shown) => {
          set({ hasShownKamigawaTab: shown });
        },

        setHasShownStationsTab: (shown) => {
          set({ hasShownStationsTab: shown });
        },

        initializeNeoBasicsControls: (elements) => {
          set(() => {
            const overrides = elements.reduce<Record<string, FrameColorOverride>>((acc, name) => {
              acc[name] = { ...DEFAULT_COLOR_OVERRIDE };
              return acc;
            }, {});

            return {
              neoBasicsTitleHeight: NEO_BASICS_MIN_TITLE_HEIGHT,
              neoBasicsElements: [...elements],
              neoBasicsColorOverrides: overrides,
            };
          });

          const store = useCardStore.getState();
          if (store.card.version === CARD_VERSIONS.NEO_BASICS && store.card.text?.[TEXT_FIELDS.TITLE]) {
            const change = computeNeoBasicsChange(NEO_BASICS_MIN_TITLE_HEIGHT);
            store.updateText(TEXT_FIELDS.TITLE, {
              height: change[1] + NEO_BASICS_BASE_TITLE_HEIGHT,
            });
          }

          refreshNeoBasicsFrames().catch((error: unknown) => {
            console.error('Failed to initialize Neo Basics stretch state:', error);
          });
        },

        setNeoBasicsTitleHeight: (value) => {
          const clamped = clampNeoBasicsTitleHeight(value);
          set({ neoBasicsTitleHeight: clamped });

          const store = useCardStore.getState();
          if (store.card.version === CARD_VERSIONS.NEO_BASICS && store.card.text?.[TEXT_FIELDS.TITLE]) {
            const change = computeNeoBasicsChange(clamped);
            store.updateText(TEXT_FIELDS.TITLE, {
              height: change[1] + NEO_BASICS_BASE_TITLE_HEIGHT,
            });
          }

          refreshNeoBasicsFrames().catch((error: unknown) => {
            console.error('Failed to update Neo Basics frame stretch:', error);
          });
        },

        setNeoBasicsColorOverride: (element, override) => {
          set((state) => {
            const nextOverrides: Record<string, FrameColorOverride> = {
              ...state.neoBasicsColorOverrides,
            };
            const previous = nextOverrides[element] ?? { ...DEFAULT_COLOR_OVERRIDE };
            nextOverrides[element] = { ...previous, ...override };
            return { neoBasicsColorOverrides: nextOverrides };
          });

          refreshNeoBasicsFrames().catch((error: unknown) => {
            console.error('Failed to update Neo Basics color override:', error);
          });
        },

        resetNeoBasicsColors: () => {
          set((state) => {
            const overrides = state.neoBasicsElements.reduce<Record<string, FrameColorOverride>>(
              (acc, name) => {
                acc[name] = { ...DEFAULT_COLOR_OVERRIDE };
                return acc;
              },
              {},
            );

            return { neoBasicsColorOverrides: overrides };
          });

          refreshNeoBasicsFrames().catch((error: unknown) => {
            console.error('Failed to reset Neo Basics color overrides:', error);
          });
        },

        applyNeoBasicsAdjustments: () => {
          refreshNeoBasicsFrames().catch((error: unknown) => {
            console.error('Failed to apply Neo Basics adjustments:', error);
          });
        },

        setSagaInfo: (updates) => {
          set((state) => {
            const currentSaga = state.card.saga || null;
            const updatedSaga = currentSaga ? { ...currentSaga, ...updates } : { abilities: [1, 1, 1, 0], count: 3, x: 0.1, width: 0.3947, ...updates };
            return {
              card: {
                ...state.card,
                saga: updatedSaga,
              },
            };
          });
        },

        resetSagaInfo: (preset) => {
          set((state) => ({
            card: {
              ...state.card,
              saga: preset ?? null,
            },
          }));
        },
        setPlaneswalkerInfo: (updates) => {
          set((state) => ({
            card: {
              ...state.card,
              planeswalker: mergePlaneswalkerInfo(state.card.planeswalker, updates),
            },
          }));
        },

        resetPlaneswalkerInfo: (preset) => {
          set((state) => ({
            card: {
              ...state.card,
              planeswalker: preset ? clonePlaneswalkerInfo(preset) : null,
            },
          }));
        },
        initializeStation: (version) => {
          set((state) => {
            const nextStation = applyStationVersionPreset(
              mergeStationDefaults(state.card.station),
              version
            );

            if (state.card.station && areStationsEqual(state.card.station, nextStation)) {
              return {};
            }

            return {
              card: {
                ...state.card,
                station: nextStation,
              },
            };
          });
        },

        updateStationState: (updater) => {
          set((state) => {
            if (!state.card.station) {
              return {};
            }

            const draft = cloneStationState(state.card.station);
            const maybeUpdated = updater(draft);
            const nextStation = maybeUpdated ?? draft;

            if (areStationsEqual(state.card.station, nextStation)) {
              return {};
            }

            return {
              card: {
                ...state.card,
                station: nextStation,
              },
            };
          });
        },

        resetStationSettings: () => {
          set((state) => {
            if (!state.card.station) {
              return {};
            }

            const preservedBadge = [...state.card.station.badgeValues] as [
              string,
              string,
              string
            ];
            const preservedOffset = state.card.station.borderlessXOffset ?? 0;
            const version = state.card.version;

            let station = createStationDefaults();
            station.badgeValues = preservedBadge;
            station.borderlessXOffset = preservedOffset;
            station = applyStationVersionPreset(station, version);

            return {
              card: {
                ...state.card,
                station,
              },
            };
          });
        },
        setShowSerialNumbers: (show) => {
          set({ showSerialNumbers: show })
        },

        // Art Debugging Management
        setShowArtBoundsDebug: (show) => {
          set({ showArtBoundsDebug: show });
        },

        setCustomArtBounds: (bounds) => {
          set({ customArtBounds: bounds });
        },

        // Auto-fit Art Management
        setAutoFitArt: (enabled) => {
          set({ autoFitArt: enabled });
        },
      }),
      {
        name: 'card-conjurer-storage',
        partialize: (state) => ({
          // Only persist card data, not UI state or images
          card: {
            ...state.card,
            onload: null, // Don't persist functions
            frames: [], // Don't persist frames - start with clean slate on refresh
            marginX: 0, // Don't persist margins - they're derived from frames
            marginY: 0, // Don't persist margins - they're derived from frames
            saga: null,
            planeswalker: null,
            station: null,
            text: {}, // Don't persist text - reset on refresh
            bottomInfo: {}, // Don't persist bottom info - reset on refresh
            showCollectorInfo: false, // Always start OFF on load
            collectorInfoStyle: 'default', // Always reset to default on reload
            serialNumber: undefined, // Don't persist serial number - reset on refresh
            serialTotal: undefined, // Don't persist serial total - reset on refresh
            artSource: '/img/blank.png', // Don't persist art - reset on refresh
            artX: 0, // Don't persist art position - reset on refresh
            artY: 0, // Don't persist art position - reset on refresh
            artZoom: 1, // Don't persist art zoom - reset on refresh
            artRotate: 0, // Don't persist art rotation - reset on refresh
            setSymbolSource: '/img/blank.png', // Don't persist set symbol - reset on refresh
            setSymbolX: 0, // Don't persist set symbol position - reset on refresh
            setSymbolY: 0, // Don't persist set symbol position - reset on refresh
            setSymbolZoom: 1, // Don't persist set symbol zoom - reset on refresh
            watermarkSource: '/img/blank.png', // Don't persist watermark - reset on refresh
            watermarkX: 0, // Don't persist watermark position - reset on refresh
            watermarkY: 0, // Don't persist watermark position - reset on refresh
            watermarkZoom: 1, // Don't persist watermark zoom - reset on refresh
            watermarkOpacity: 0.4, // Don't persist watermark opacity - reset on refresh
            watermarkLeft: '#b79d58', // Default to White color
            watermarkRight: 'none', // Don't persist watermark colors - reset on refresh
          },
        }),
      }
    ),
    {
      name: 'CardStore',
    }
  )
);

async function refreshNeoBasicsFrames(): Promise<void> {
  const state = useCardStore.getState();
  if (state.card.version !== CARD_VERSIONS.NEO_BASICS) {
    return;
  }

  const change = computeNeoBasicsChange(state.neoBasicsTitleHeight);
  const EPSILON = 0.000001;

  const tasks = state.card.frames.map(async (frame, index) => {
    if (!frame.src.includes(NEO_BASICS_FRAME_PREFIX) || !frame.stretch) {
      return;
    }

    const updatedStretch = frame.stretch.map((entry) => ({
      name: entry.name,
      targets: [...entry.targets],
      change: [...change] as [number, number],
    }));

    const elementNames = updatedStretch.map((entry) => entry.name);
    const overrides = cloneNeoBasicsOverrides(state.neoBasicsColorOverrides, elementNames);

    const shouldStretch = Math.abs(change[0]) > EPSILON || Math.abs(change[1]) > EPSILON;
    const hasManualOverride = Object.values(overrides).some(
      (override) => override.mode === 'manual',
    );
    const needsCustomImage = shouldStretch || hasManualOverride;

    useCardStore.getState().updateFrame(index, {
      stretch: updatedStretch,
      colorOverrides: overrides,
    });

    if (!needsCustomImage) {
      if (frame.neoBasicsModified) {
        try {
          const baseImage = await loadImage(frame.src);
          useCardStore.getState().updateFrame(index, {
            image: baseImage,
            neoBasicsModified: false,
          });
        } catch (error) {
          console.error(`Failed to restore Neo Basics frame: ${frame.name}`, error);
        }
      }
      return;
    }

    try {
      const cardSnapshot = useCardStore.getState().card;
      const image = await generateStretchedFrameImage({
        src: frame.src,
        card: cardSnapshot,
        stretch: updatedStretch,
        colorOverrides: overrides,
      });

      useCardStore.getState().updateFrame(index, { image, neoBasicsModified: true });
    } catch (error) {
      console.error(`Failed to stretch Neo Basics frame: ${frame.name}`, error);
    }
  });

  await Promise.all(tasks);
}
