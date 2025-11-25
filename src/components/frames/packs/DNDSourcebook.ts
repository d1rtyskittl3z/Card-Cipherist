import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Shared bounds
const ptBounds: Bounds = { x: 0.774, y: 0.8862, width: 0.1734, height: 0.0629 };
const crownBounds: Bounds = { x: 0, y: 0, width: 1, height: 0.1162 };
const holoBounds: Bounds = { x: 0.438, y: 0.9129, width: 0.124, height: 0.0372 };

// Frames array
const frames: FrameItem[] = [
  { name: 'Frame', src: '/img/frames/dndSourcebook/frame.png' },
  { name: 'Power/Toughness', src: '/img/frames/dndSourcebook/pt.png', bounds: ptBounds },
  { name: 'Legend Crown', src: '/img/frames/dndSourcebook/crown.png', bounds: crownBounds },
  { name: 'Holo Stamp', src: '/img/frames/dndSourcebook/holo.png', bounds: holoBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'DNDSourcebook',
  label: 'D&D Sourcebook (AFR)',
  version: 'dndSourcebook',
  artBounds: { x: 0.04, y: 0.11, width: 0.92, height: 0.452 },
  setSymbolBounds: { x: 0.9213, y: 0.5953, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5705, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.27, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
