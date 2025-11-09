import type { FramePackTemplate, FrameItem } from './types';

// Bounds for floating legend crowns (slightly different positioning than standard crowns)
const crownBounds = { x: 0.0307, y: 0.0191, width: 0.9387, height: 0.1024 };

// Border cover and cutout bounds
const borderCoverBounds = { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 };
const lowerCutoutBounds = { x: 0.0734, y: 0.1096, width: 0.8532, height: 0.0143 };
const outlineBounds = { x: 0.028, y: 0.0172, width: 0.944, height: 0.1062 };

const frames: FrameItem[] = [
  // Floating legend crowns - automatically add border cover (index 10) when no mask is selected
  { name: 'White Legend Crown', src: '/img/frames/m15/crowns/m15CrownWFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/crowns/m15CrownUFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/crowns/m15CrownBFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/crowns/m15CrownRFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/crowns/m15CrownGFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/crowns/m15CrownMFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/crowns/m15CrownAFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Artifact Legend Crown (Alt)', src: '/img/frames/m15/crowns/m15CrownAFloatingAlt.png', bounds: crownBounds, complementary: 10 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/crowns/m15CrownLFloating.png', bounds: crownBounds, complementary: 10 },
  { name: 'Colorless Legend Crown', src: '/img/frames/m15/crowns/m15CrownCFloating.png', bounds: crownBounds, complementary: 10 },
  
  // Support elements
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: borderCoverBounds },
  { name: 'Legend Crown Lower Cutout', src: '/img/black.png', bounds: lowerCutoutBounds, erase: true }, // Erases pixels to create cutout effect
  { name: 'Legend Crown Outline', src: '/img/frames/m15/crowns/m15CrownFloatingOutline.png', bounds: outlineBounds },
];

const template: FramePackTemplate = {
  id: 'M15LegendCrownsFloating',
  label: 'Floating Legend Crowns',
  version: 'm15LegendCrownsFloating',
  notice: 'Floating legend crowns with a unique layered design. The "Lower Cutout" frame uses erase mode to create a cutout effect below the crown. When added without a mask, crowns automatically include the border cover.',
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
