import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for M15 Eighth Edition UB style frames
const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/custom/m15-eighth/regular/Frame.png', name: 'Frame' },
  { src: '/img/frames/custom/m15-eighth/regular/Border.png', name: 'Border' },
];

// Power/Toughness bounds
const ptBounds: Bounds = { x: 0.7573, y: 1901 / 2100, width: 0.188, height: 0.0733 };

// Holo stamp bounds and masks
const stampBounds: Bounds = { x: 0.4254, y: 0.9005, width: 0.1494, height: 0.0486 };
const stampMasks: Mask[] = [{ src: '/img/frames/custom/m15-eighth/ub/stamp/pinline.png', name: 'Pinline' }];

// Available frames - Universes Beyond variant
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/m15-eighth/ub/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/m15-eighth/ub/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/m15-eighth/ub/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/m15-eighth/ub/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/m15-eighth/ub/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/m15-eighth/ub/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/custom/m15-eighth/ub/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/custom/m15-eighth/ub/l.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/custom/m15-eighth/ub/v.png', masks },

  { name: 'White Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/we.png', masks },
  { name: 'Blue Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/ue.png', masks },
  { name: 'Black Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/be.png', masks },
  { name: 'Red Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/re.png', masks },
  { name: 'Green Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/ge.png', masks },
  { name: 'Multicolored Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/me.png', masks },
  { name: 'Artifact Enchantment Frame', src: '/img/frames/custom/m15-eighth/ub/ae.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/ub/pt/v.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds: ptBounds },

  { name: 'White Land Frame', src: '/img/frames/custom/m15-eighth/ub/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/custom/m15-eighth/ub/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/custom/m15-eighth/ub/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/custom/m15-eighth/ub/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/custom/m15-eighth/ub/gl.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/custom/m15-eighth/ub/ml.png', masks },

  { name: 'White Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/w.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Blue Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/u.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Black Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/b.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Red Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/r.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Green Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/g.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/m.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Artifact Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/a.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Land Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/l.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Vehicle Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/v.png', bounds: stampBounds, masks: stampMasks },

  { name: 'Gray Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/gray.png', bounds: stampBounds },
  { name: 'Silver Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/silver.png', bounds: stampBounds },
  { name: 'Gold Holo Stamp', src: '/img/frames/custom/m15-eighth/ub/stamp/gold.png', bounds: stampBounds },
  { name: 'Black Stamp Background', src: '/img/frames/custom/m15-eighth/ub/stamp/black.png', bounds: stampBounds },

  { name: 'M15 Border', src: '/img/frames/m15/regular/m15MaskBorder.png' },
];

const template: FramePackTemplate = {
  id: 'M15EighthUB',
  label: 'Universes Beyond',
  version: 'm15EighthUB',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 1937 / 2100, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 0.0647, y: 1973 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'belerenbsc', size: 0.02095, color: 'black', conditionalColor: 'White Enchantment Frame,Blue Enchantment Frame,Black Enchantment Frame,Red Enchantment Frame,Green Enchantment Frame,Multicolored Enchantment Frame,Artifact Enchantment Frame,M15 Border,Vehicle Frame:white' },
  },
  brush: '/img/manaSymbols/artistbrush.svg',
};

export default template;
