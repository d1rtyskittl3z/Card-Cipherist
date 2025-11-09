import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/textless/2022/maskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/textless/2022/maskType.png', name: 'Type' },
  { src: '/img/frames/textless/2022/maskBorder.png', name: 'Border' },
];

const bounds: Bounds = { x: 62 / 1500, y: 1752 / 2100, width: 168 / 1500, height: 168 / 2100 };

const stampBounds: Bounds = { x: 657 / 1500, y: 1907 / 2100, width: 186 / 1500, height: 82 / 2100 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/textless/2022/ub/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/textless/2022/ub/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/textless/2022/ub/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/textless/2022/ub/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/textless/2022/ub/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/textless/2022/ub/m.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/textless/2022/ub/l.png', masks },
  { name: 'White Mana Symbol', src: '/img/frames/textless/2022/sw.png', bounds },
  { name: 'Blue Mana Symbol', src: '/img/frames/textless/2022/su.png', bounds },
  { name: 'Black Mana Symbol', src: '/img/frames/textless/2022/sb.png', bounds },
  { name: 'Red Mana Symbol', src: '/img/frames/textless/2022/sr.png', bounds },
  { name: 'Green Mana Symbol', src: '/img/frames/textless/2022/sg.png', bounds },
  { name: 'Colorless Mana Symbol', src: '/img/frames/textless/2022/sc.png', bounds },
  { name: 'Gold Holo Stamp', src: '/img/frames/textless/2022/ub/stamp.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/textless/2022/ub/grayStamp.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'TextlessBasics2022UB',
  label: 'Fullart Basics (Universes Beyond)',
  version: 'textlessBasics2022UB',
  artBounds: { x: 0.0394, y: 0.0281, width: 0.9214, height: 0.8929 },
  setSymbolBounds: { x: 0.9213, y: 0.8739, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 283 / 1500, y: 0.8481, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
  },
};

export default template;
