import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/expedition/bfz/expeditionMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/expedition/bfz/expeditionMaskType.png', name: 'Type' },
  { src: '/img/frames/expedition/bfz/expeditionMaskTextbox.png', name: 'Rules' },
  { src: '/img/frames/expedition/bfz/expeditionMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/expedition/bfz/expeditionFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/expedition/bfz/expeditionFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/expedition/bfz/expeditionFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/expedition/bfz/expeditionFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/expedition/bfz/expeditionFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/expedition/bfz/expeditionFrameM.png', masks },
  { name: 'Land Frame', src: '/img/frames/expedition/bfz/expeditionFrameL.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/expedition/bfz/expeditionFrameA.png', masks }
];

// Template
const template: FramePackTemplate = {
  id: 'ExpeditionBFZ-1',
  label: 'BFZ Expeditions (2015)',
  version: 'expeditionBFZ',
  artBounds: { x: 0.0754, y: 0.111, width: 0.8494, height: 0.6991 },
  setSymbolBounds: { x: 0.9214, y: 0.8439, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8196, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.09, y: 0.5996, width: 0.82, height: 0.2072, size: 0.0362 }
  }
};

export default template;
