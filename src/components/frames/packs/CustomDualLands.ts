import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/custom/dualLands/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/custom/dualLands/type.svg', name: 'Type' },
];

// Shared bounds
const bounds: Bounds = { x: 0.07, y: 0.8153, width: 0.16, height: 0.1143 };
const bounds2: Bounds = { x: 0.77, y: 0.8153, width: 0.16, height: 0.1143 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/dualLands/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/dualLands/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/dualLands/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/dualLands/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/dualLands/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/dualLands/m.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/custom/dualLands/l.png', masks },
  { name: 'White Mana Symbol (Left)', src: '/img/frames/textless/zendikar/sw.svg', bounds },
  { name: 'Blue Mana Symbol (Left)', src: '/img/frames/textless/zendikar/su.svg', bounds },
  { name: 'Black Mana Symbol (Left)', src: '/img/frames/textless/zendikar/sb.svg', bounds },
  { name: 'Red Mana Symbol (Left)', src: '/img/frames/textless/zendikar/sr.svg', bounds },
  { name: 'Green Mana Symbol (Left)', src: '/img/frames/textless/zendikar/sg.svg', bounds },
  { name: 'Colorless Mana Symbol (Left)', src: '/img/frames/textless/zendikar/sc.svg', bounds },
  { name: 'White Mana Symbol (Right)', src: '/img/frames/textless/zendikar/sw.svg', bounds: bounds2 },
  { name: 'Blue Mana Symbol (Right)', src: '/img/frames/textless/zendikar/su.svg', bounds: bounds2 },
  { name: 'Black Mana Symbol (Right)', src: '/img/frames/textless/zendikar/sb.svg', bounds: bounds2 },
  { name: 'Red Mana Symbol (Right)', src: '/img/frames/textless/zendikar/sr.svg', bounds: bounds2 },
  { name: 'Green Mana Symbol (Right)', src: '/img/frames/textless/zendikar/sg.svg', bounds: bounds2 },
  { name: 'Colorless Mana Symbol (Right)', src: '/img/frames/textless/zendikar/sc.svg', bounds: bounds2 },
];

// Template
const template: FramePackTemplate = {
  id: 'CustomDualLands',
  label: 'Textless Duals',
  version: 'customDualLands',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.5, y: 0.9524, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type (Left)', text: '', x: 0.25, y: 0.8481, width: 0.5, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, align: 'center' },
  },
};

export default template;
