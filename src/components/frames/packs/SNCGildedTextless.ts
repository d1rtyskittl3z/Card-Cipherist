import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [];

const frames: FrameItem[] = [
  { name: 'Regular Frame', src: '/img/frames/snc/gilded/textless/m.png', masks }
];

const template: FramePackTemplate = {
  id: 'SNCGildedTextless',
  label: 'Textless Golden Age (SNC)',
  version: 'sncGildedTextless',
  artBounds: { x: 0.064, y: 0.0372, width: 0.872, height: 0.8843 },
  setSymbolBounds: { x: 0.9213, y: 0.8948, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0629, width: 0.928, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8686, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' }
  }
};

export default template;
