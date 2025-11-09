import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Emblem Frame', src: '/img/frames/token/emblem/frame.png' },
];

const template: FramePackTemplate = {
  id: 'Emblem',
  label: 'Planeswalker Emblems',
  version: 'emblem',
  artBounds: { x: 0.142, y: 0.0496, width: 0.716, height: 0.8548 },
  setSymbolBounds: { x: 0.9213, y: 0.7043, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.8177, width: 0.75, height: 0.1472 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 0.0381, color: 'white', align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.68, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7443, width: 0.828, height: 0.1748, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
