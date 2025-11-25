import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/fullText/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/fullText/rules.svg', name: 'Rules' },
  { src: '/img/frames/m15/fullText/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

// Shared bounds for PT boxes
const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/fullTextAlt/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/fullTextAlt/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/fullTextAlt/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/fullTextAlt/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/fullTextAlt/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/fullTextAlt/m.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds: ptBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'FullTextAlt',
  label: 'Full Text (Alt)',
  version: 'fullText',
  artBounds: { x: 0, y: 0, width: 0, height: 0 },
  setSymbolBounds: { x: 0.9213, y: 0.1396, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.5505, width: 0.75, height: 0.4562 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.1157, width: 0.828, height: 0.8024, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
