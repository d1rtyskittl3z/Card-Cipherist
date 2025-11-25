import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/fang/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/fang/title.svg', name: 'Title' },
  { src: '/img/frames/m15/fang/type.svg', name: 'Type' },
  { src: '/img/frames/m15/fang/typeSides.svg', name: 'Type Sides' },
  { src: '/img/frames/m15/fang/rules.svg', name: 'Rules' },
  { src: '/img/frames/m15/fang/gold.svg', name: 'Gold Accents' },
  { src: '/img/frames/m15/fang/border.svg', name: 'Border' }
];

// Shared bounds
const bounds: Bounds = { x: 0.76, y: 0.8762, width: 0.204, height: 0.0781 };
const bounds2: Bounds = { x: 0.0814, y: 0.0191, width: 0.838, height: 0.021 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/fang/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/fang/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/fang/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/fang/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/fang/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/fang/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/fang/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/fang/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/fang/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/fang/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/fang/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/fang/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/fang/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/fang/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/fang/pt/a.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/fang/pt/l.png', bounds },
  { name: 'White Legend Crown', src: '/img/frames/m15/fang/crown/w.png', bounds: bounds2 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/fang/crown/u.png', bounds: bounds2 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/fang/crown/b.png', bounds: bounds2 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/fang/crown/r.png', bounds: bounds2 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/fang/crown/g.png', bounds: bounds2 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/fang/crown/m.png', bounds: bounds2 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/fang/crown/a.png', bounds: bounds2 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/fang/crown/l.png', bounds: bounds2 }
];

// Template
const template: FramePackTemplate = {
  id: 'Fang',
  label: 'Fang (VOW)',
  version: 'm15Fang',
  artBounds: { x: 0.078, y: 0.1105, width: 0.844, height: 0.4439 },
  setSymbolBounds: { x: 0.92, y: 0.59, width: 0.12, height: 0.04, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0591, width: 0.9234, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0867, y: 0.05, width: 0.8267, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0867, y: 0.5653, width: 0.8267, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.096, y: 0.6303, width: 0.808, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
