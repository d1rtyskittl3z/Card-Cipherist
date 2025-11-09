import type { FramePackTemplate, Mask, FrameItem } from './types';

// Common masks for Nyx enchantment frames
// Note: Includes special SVG mask for "Frame - Top 2/3" effect
const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/nyx/verticalMask.svg', name: 'Frame - Top 2/3' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

// Bounds for inner crown decorative elements
const crownBounds = { x: 0.164, y: 0.0239, width: 0.672, height: 0.0239 };

const frames: FrameItem[] = [
  // Nyx enchantment frames
  { name: 'White Frame', src: '/img/frames/m15/nyx/m15FrameWNyx.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/nyx/m15FrameUNyx.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/nyx/m15FrameBNyx.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/nyx/m15FrameRNyx.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/nyx/m15FrameGNyx.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/nyx/m15FrameMNyx.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/nyx/m15FrameANyx.png', masks },
  
  // Inner crown decorative elements
  { name: 'White Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownWNyx.png', bounds: crownBounds },
  { name: 'Blue Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownUNyx.png', bounds: crownBounds },
  { name: 'Black Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownBNyx.png', bounds: crownBounds },
  { name: 'Red Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownRNyx.png', bounds: crownBounds },
  { name: 'Green Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownGNyx.png', bounds: crownBounds },
  { name: 'Multicolored Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownMNyx.png', bounds: crownBounds },
  { name: 'Artifact Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownANyx.png', bounds: crownBounds },
];

const template: FramePackTemplate = {
  id: 'M15Nyx',
  label: 'Enchantment Frames (Nyx)',
  version: 'm15Nyx',
  notice: 'This pack uses the standard M15 layout. No custom onclick handler was defined in the source.',
  // Default M15 bounds (same as M15Regular-1)
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
