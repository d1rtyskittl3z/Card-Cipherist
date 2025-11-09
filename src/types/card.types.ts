/**
 * Card Conjurer - TypeScript Type Definitions
 * Port from creator-23.js vanilla JavaScript
 */
import type { StretchConfig } from '../components/frames/packs/types';

export interface FrameColorOverride {
  mode: 'auto' | 'manual';
  color: string;
  source?: 'preset' | 'custom';
}

export interface CardBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Mask {
  name: string;
  src: string;
  image: HTMLImageElement;
  bounds?: CardBounds;
  ogBounds?: CardBounds;
}

export interface Frame {
  name: string;
  src: string;
  image: HTMLImageElement | null;
  masks: Mask[];
  bounds?: CardBounds;
  ogBounds?: CardBounds;
  opacity: number;
  mode?: GlobalCompositeOperation;
  erase?: boolean;
  preserveAlpha?: boolean;
  stretch?: StretchConfig[];
  colorOverrides?: Record<string, FrameColorOverride>;
  colorOverlay?: string;
  colorOverlayCheck?: boolean;
  hslHue?: number;
  hslSaturation?: number;
  hslLightness?: number;
  visible?: boolean;
  locked?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;

  // Original values for reset functionality
  ogOpacity?: number;
  ogHslHue?: number;
  ogHslSaturation?: number;
  ogHslLightness?: number;
  ogColorOverlay?: string;
  ogColorOverlayCheck?: boolean;
  ogVisible?: boolean;
  ogX?: number;
  ogY?: number;
  ogWidth?: number;
  ogHeight?: number;
  ogScale?: number;
  neoBasicsModified?: boolean;
}

export interface TextObject {
  name: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  size: number;
  font: string;
  color: string;
  align?: 'left' | 'center' | 'right';
  oneLine?: boolean;
  outlineWidth?: number;
  outlineColor?: string;
  fontSizeAdjustment?: number;
  // Mana symbol customization
  manaPrefix?: string;
  manaPlacement?: { x: number[]; y: number[] };
  noVerticalCenter?: boolean;
  manaCost?: boolean;
  shadowX?: number;
  shadowY?: number;
  shadowColor?: string;
  manaSpacing?: number;
}

export interface ManaSymbol {
  name: string;
  path: string;
  image: HTMLImageElement;
  width: number;
  height: number;
  matchColor: boolean;
  back?: string;
  backs?: number;
}

export interface BottomInfo {
  [key: string]: TextObject;
}

export interface SagaInfo {
  abilities: number[];
  count: number;
  x: number;
  width: number;
}

export interface PlaneswalkerAbilityBounds {
  x: number;
  width: number;
}

export interface PlaneswalkerInfo {
  abilities: [string, string, string, string];
  abilityAdjust: [number, number, number, number];
  count: number;
  x: number;
  width: number;
  invert?: boolean;
  baseY?: number;
  originalAbilityBounds?: PlaneswalkerAbilityBounds[];
  defaultHeights?: [number, number, number, number];
  defaultAbilities?: [string, string, string, string];
  defaultAbilityAdjust?: [number, number, number, number];
}

export type StationColorMode =
  | 'auto'
  | 'white'
  | 'blue'
  | 'black'
  | 'red'
  | 'green'
  | 'multi'
  | 'colorless'
  | 'artifact'
  | 'land'
  | 'custom';

export interface StationSquare {
  width: number;
  height: number;
  x: number;
  y: number;
  enabled: boolean;
  color: string;
  opacity: number;
}

export interface StationBadgeSettings {
  fontSize: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface StationTextPosition {
  x: number;
  y: number;
}

export interface StationTextOffset {
  x: number;
  y: number;
}

export interface StationPTSettings {
  fontSize: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface StationColorSettingsEntry {
  square1: string;
  square2OpacityOffset: number;
}

export interface StationImportSettings {
  singleAbility: {
    yOffset: number;
    height1: number;
  };
  versionOverrides: Record<
    string,
    {
      yOffset?: number;
      height1?: number;
      minDistanceFromBottom?: number;
    }
  >;
}

export interface StationState {
  abilityCount: number;
  x: number;
  width: number;
  badgeX: number;
  badgeValues: [string, string, string];
  disableFirstAbility: boolean;
  disabledTextX: number;
  disabledTextWidth: number;
  importSettings: StationImportSettings;
  badgeSettings: StationBadgeSettings;
  squares: Record<1 | 2, StationSquare>;
  minDistanceFromBottom: number;
  baseTextPositions: {
    ability1: StationTextPosition;
    ability2: StationTextPosition;
  };
  textOffsets: Record<1 | 2, StationTextOffset>;
  ptSettings: StationPTSettings;
  colorModes: Record<1 | 2, StationColorMode>;
  ptColorMode: StationColorMode;
  badgeColorMode: StationColorMode;
  colorSettings: Record<string, StationColorSettingsEntry>;
  packDefaults: {
    ability: CardBounds;
  };
  borderlessXOffset?: number;
  badgeVariant?: string;
  ptVariant?: string;
}

export interface Card {
  width: number;
  height: number;
  marginX: number;
  marginY: number;
  frames: Frame[];
  artSource: string;
  artX: number;
  artY: number;
  artZoom: number;
  artRotate: number;
  artGrayscale?: boolean;
  setSymbolSource: string;
  setSymbolX: number;
  setSymbolY: number;
  setSymbolZoom: number;
  watermarkSource: string;
  watermarkX: number;
  watermarkY: number;
  watermarkZoom: number;
  watermarkLeft: string;
  watermarkRight: string;
  watermarkOpacity: number;
  version: string;
  manaSymbols: string[];
  text?: { [key: string]: TextObject };
  bottomInfo?: BottomInfo;
  landscape?: boolean;
  margins?: boolean;
  bottomInfoTranslate?: { x: number; y: number };
  bottomInfoRotate?: number;
  bottomInfoZoom?: number;
  bottomInfoColor?: string;
  hideBottomInfoBorder?: boolean;
  showsFlavorBar?: boolean;
  onload?: (() => void) | null;
  artBounds?: CardBounds;
  setSymbolBounds?: CardBounds;
  watermarkBounds?: CardBounds;
  infoYear?: number;
  showCollectorInfo?: boolean;
  collectorInfoStyle?: 'default' | 'new' | 'artist';
  // Serial plate
  serialNumber?: string | number;
  serialTotal?: string | number;
  serialX?: number;
  serialY?: number;
  serialScale?: number;
  saga?: SagaInfo | null;
  planeswalker?: PlaneswalkerInfo | null;
  station?: StationState | null;
}

export interface FrameOption {
  name: string;
  src: string;
  noThumb?: boolean;
  onload?: () => void;
  complementary?: FrameOption[];
}

export interface ScryfallCard {
  name: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  loyalty?: string;
  flavor_text?: string;
  artist?: string;
  set: string;
  collector_number?: string;
  rarity?: string;
  image_uris?: {
    art_crop?: string;
    large?: string;
  };
  card_faces?: Array<{
    name: string;
    image_uris?: {
      art_crop?: string;
    };
  }>;
}

export interface CanvasRefs {
  card: HTMLCanvasElement;
  frame: HTMLCanvasElement;
  frameMasking: HTMLCanvasElement;
  frameCompositing: HTMLCanvasElement;
  saga: HTMLCanvasElement;
  planeswalkerPre: HTMLCanvasElement;
  planeswalkerPost: HTMLCanvasElement;
  stationPre: HTMLCanvasElement;
  stationPost: HTMLCanvasElement;
  text: HTMLCanvasElement;
  paragraph: HTMLCanvasElement;
  line: HTMLCanvasElement;
  watermark: HTMLCanvasElement;
  bottomInfo: HTMLCanvasElement;
  guidelines: HTMLCanvasElement;
  prePT: HTMLCanvasElement;
  preview: HTMLCanvasElement;
}

export interface CanvasContextRefs {
  card: CanvasRenderingContext2D;
  frame: CanvasRenderingContext2D;
  frameMasking: CanvasRenderingContext2D;
  frameCompositing: CanvasRenderingContext2D;
  saga: CanvasRenderingContext2D;
  planeswalkerPre: CanvasRenderingContext2D;
  planeswalkerPost: CanvasRenderingContext2D;
  stationPre: CanvasRenderingContext2D;
  stationPost: CanvasRenderingContext2D;
  text: CanvasRenderingContext2D;
  paragraph: CanvasRenderingContext2D;
  line: CanvasRenderingContext2D;
  watermark: CanvasRenderingContext2D;
  bottomInfo: CanvasRenderingContext2D;
  guidelines: CanvasRenderingContext2D;
  prePT: CanvasRenderingContext2D;
  preview: CanvasRenderingContext2D;
}
