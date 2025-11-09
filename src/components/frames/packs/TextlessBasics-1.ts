import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/textless/basics/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/textless/basics/type.svg', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/textless/basics/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/textless/basics/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/textless/basics/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/textless/basics/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/textless/basics/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/textless/basics/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/textless/basics/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/textless/basics/l.png', masks },
];

const template: FramePackTemplate = {
  id: 'TextlessBasics',
  label: 'Fullart Basics (THB)',
  version: 'textlessBasics',
  artBounds: { x: 0.0394, y: 0.0281, width: 0.9214, height: 0.8929 },
  setSymbolBounds: { x: 0.9213, y: 0.8739, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type (Left)', text: '', x: 0.0854, y: 0.8481, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
  },
};

export default template;
