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
const boundsPT: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

// Frames array
const frames: FrameItem[] = [
  { name: 'Artifact Frame', src: '/img/frames/m15/invention/mul/a.png', masks },
  { name: 'White Frame', src: '/img/frames/m15/invention/mul/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/invention/mul/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/invention/mul/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/invention/mul/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/invention/mul/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/invention/mul/m.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/invention/mul/l.png', masks },
  { name: 'Invention Power/Toughness', src: '/img/frames/m15/invention/inventionPT.png', bounds: boundsPT },
  { name: 'Original Invention Frame', src: '/img/frames/m15/invention/inventionFrameA.png', masks },
  { name: 'Silver Frame', src: '/img/frames/m15/invention/a.png', masks },
  { name: 'Silver Power/Toughness', src: '/img/frames/m15/invention/apt.png', bounds: boundsPT },
  { name: 'Phyrexian Frame', src: '/img/frames/m15/invention/phyrexian.png', masks },
  { name: 'Phyrexian Power/Toughness', src: '/img/frames/m15/invention/phyrexianPT.png', bounds: boundsPT },
  { name: 'Darksteel Frame', src: '/img/frames/m15/invention/darksteel.png', masks },
  { name: 'Darksteel Power/Toughness', src: '/img/frames/m15/invention/darksteelPT.png', bounds: boundsPT }
];

// Template
const template: FramePackTemplate = {
  id: 'Invention',
  label: 'Kaladesh Inventions',
  version: 'invention',
  artBounds: { x: 0.04, y: 0.0286, width: 0.92, height: 0.8953 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
