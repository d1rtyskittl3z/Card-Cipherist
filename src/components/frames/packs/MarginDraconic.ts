import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Masks for draconic margins
const masks: Mask[] = [
  { src: '/img/frames/draconic/margin/masks/maskBorderless.png', name: 'Borderless' },
];

// Common bounds for draconic margin extensions
const bounds: Bounds = { x: -88 / 2010, y: -80 / 2817, width: 2187 / 2010, height: 2978 / 2817 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

// Alternative bounds for borderless extension
const bounds2: Bounds = { x: -0.044, y: -1 / 35, width: 1.088, height: 37 / 35 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/draconic/margin/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/draconic/margin/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/draconic/margin/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/draconic/margin/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/draconic/margin/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/draconic/margin/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/draconic/margin/a.png', bounds, ogBounds, masks },
  { name: 'Borderless Extension', src: '/img/frames/margins/borderlessBorderExtension.png', bounds: bounds2 },
];

const template: FramePackTemplate = {
  id: 'MarginDraconic',
  label: 'Draconic Margins',
  version: 'margin',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
