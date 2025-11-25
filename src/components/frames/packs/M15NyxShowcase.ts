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

// Shared bounds
const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const innerCrownBounds: Bounds = { x: 0.164, y: 0.0239, width: 0.672, height: 0.0239 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/nyxShowcase/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/nyxShowcase/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/nyxShowcase/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/nyxShowcase/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/nyxShowcase/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/nyxShowcase/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/nyxShowcase/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTC.png', bounds },
  { name: 'White Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownWNyx.png', bounds: innerCrownBounds },
  { name: 'Blue Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownUNyx.png', bounds: innerCrownBounds },
  { name: 'Black Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownBNyx.png', bounds: innerCrownBounds },
  { name: 'Red Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownRNyx.png', bounds: innerCrownBounds },
  { name: 'Green Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownGNyx.png', bounds: innerCrownBounds },
  { name: 'Multicolored Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownMNyx.png', bounds: innerCrownBounds },
  { name: 'Artifact Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/m15InnerCrownANyx.png', bounds: innerCrownBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'M15NyxShowcase',
  label: 'Theros Beyond Death (THB)',
  version: 'nyxShowcase',
  artBounds: { x: 0.062, y: 0.1129, width: 0.876, height: 0.8096 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white', shadowX: 0.0013, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
