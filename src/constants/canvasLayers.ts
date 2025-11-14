/**
 * Canvas layer names for multi-layer rendering
 */
export const CANVAS_LAYERS = {
  CARD: 'card',
  FRAME: 'frame',
  FRAME_MASKING: 'frameMasking',
  FRAME_COMPOSITING: 'frameCompositing',
  SAGA: 'saga',
  PLANESWALKER_PRE: 'planeswalkerPre',
  PLANESWALKER_POST: 'planeswalkerPost',
  STATION_PRE: 'stationPre',
  STATION_POST: 'stationPost',
  TEXT: 'text',
  PARAGRAPH: 'paragraph',
  LINE: 'line',
  WATERMARK: 'watermark',
  BOTTOM_INFO: 'bottomInfo',
  GUIDELINES: 'guidelines',
  PRE_PT: 'prePT',
  PREVIEW: 'preview',
} as const;

export type CanvasLayerKey = typeof CANVAS_LAYERS[keyof typeof CANVAS_LAYERS];

/**
 * Array of all canvas layer names for initialization
 */
export const ALL_CANVAS_LAYERS = [
  'card',
  'frame',
  'frameMasking',
  'frameCompositing',
  'saga',
  'planeswalkerPre',
  'planeswalkerPost',
  'stationPre',
  'stationPost',
  'text',
  'paragraph',
  'line',
  'watermark',
  'bottomInfo',
  'guidelines',
  'prePT',
] as const;
