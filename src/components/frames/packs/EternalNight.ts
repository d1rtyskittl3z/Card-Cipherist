import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

const crownMasks: Mask[] = [
  { src: '/img/frames/m15/crowns/m15MaskLegendCrown.png', name: 'Crown Without Pinlines' },
  { src: '/img/frames/m15/crowns/m15MaskLegendCrownPinline.png', name: 'Crown With Pinlines' }
];

// Shared bounds
const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const crownBounds: Bounds = { x: 0.0274, y: 0.0191, width: 0.9454, height: 0.1667 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/mid/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/mid/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/mid/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/mid/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/mid/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/mid/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/mid/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/mid/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/mid/wpt.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/mid/upt.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/mid/bpt.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/mid/rpt.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/mid/gpt.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/mid/mpt.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/mid/apt.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/mid/lpt.png', bounds },
  { name: 'White Legend Crown', src: '/img/frames/m15/crowns/m15CrownW.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/crowns/m15CrownU.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/mid/bCrown.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/crowns/m15CrownR.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/crowns/m15CrownG.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/crowns/m15CrownM.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/crowns/m15CrownA.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/crowns/m15CrownL.png', masks: crownMasks, bounds: crownBounds, complementary: 24 },
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 } }
];

// Template
const template: FramePackTemplate = {
  id: 'EternalNight',
  label: 'Eternal Night (MID)',
  version: 'm15MID',
  artBounds: { x: 0.0594, y: 0.0477, width: 0.8814, height: 0.8762 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
