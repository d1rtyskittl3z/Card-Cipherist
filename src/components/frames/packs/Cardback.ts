import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/cardbacks/outer.svg', name: 'Outer Frame' },
  { src: '/img/frames/cardbacks/inner.svg', name: 'Inner Frame' },
  { src: '/img/frames/cardbacks/border.svg', name: 'Border' },
];

// Frames array
const frames: FrameItem[] = [
  { name: 'Cardback', src: '/img/frames/cardbacks/cardback.png', masks },
];

// Template
const template: FramePackTemplate = {
  id: 'Cardback',
  label: 'Cardback',
  version: 'cardback',
  artBounds: { x: 0, y: 0, width: 1, height: 1 },
  setSymbolBounds: { x: 2, y: 2, width: 0.12, height: 0.0362, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.5, width: 0.75, height: 0.75 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.0474, y: 0.7039, width: 0.9054, height: 0.0534, oneLine: true, font: 'gothammedium', size: 0.0534, color: 'white', align: 'center' },
  },
};

export default template;
