import type { FramePackTemplate, Mask, FrameItem } from './types';

// Common masks for legend crown frames
const masks: Mask[] = [
  { src: '/img/frames/m15/crowns/m15MaskLegendCrown.png', name: 'Crown Without Pinlines' },
  { src: '/img/frames/m15/crowns/m15MaskLegendCrownPinline.png', name: 'Crown With Pinlines' },
];

// Bounds for legend crowns (positioned at top of card)
const crownBounds = { x: 0.0274, y: 0.0191, width: 0.9454, height: 0.1667 };

// Border cover bounds (hides border behind crown)
const borderCoverBounds = { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 };

const frames: FrameItem[] = [
  // Legend crowns with masks - automatically add border cover (index 9) when no mask is selected
  { name: 'White Legend Crown', src: '/img/frames/m15/crowns/m15CrownW.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/crowns/m15CrownU.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/crowns/m15CrownB.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/crowns/m15CrownR.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/crowns/m15CrownG.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/crowns/m15CrownM.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/crowns/m15CrownA.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/crowns/m15CrownL.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Colorless Legend Crown', src: '/img/frames/m15/crowns/m15CrownC.png', masks, bounds: crownBounds, complementary: 9 },
  
  // Border cover (uses black.png to hide border behind crown)
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: borderCoverBounds },
];

const template: FramePackTemplate = {
  id: 'M15LegendCrowns',
  label: 'Legend Crowns',
  version: 'm15LegendCrowns',
  notice: 'Legend crowns are decorative overlays for legendary creatures. When added without a mask, they automatically include the border cover frame to hide the black border.',
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
