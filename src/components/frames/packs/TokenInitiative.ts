import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Initiative Frame', src: '/img/frames/token/initiative/initiative.png' },
];

const template: FramePackTemplate = {
  id: 'TokenInitiative',
  label: 'Initiative Token',
  version: 'tokenInitiative',
  artBounds: { x: 0.04, y: 0.0286, width: 0.92, height: 0.8953 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', align: 'center' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
  },
};

export default template;
