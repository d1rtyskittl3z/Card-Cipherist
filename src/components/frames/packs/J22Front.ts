import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Frame', src: '/img/frames/token/jmpFront/j22Frame.png' },
];

const template: FramePackTemplate = {
  id: 'J22Front',
  label: 'Jumpstart 2022 Front Cards',
  version: 'j22Front',
  artBounds: { x: 0.0474, y: 0.0353, width: 0.9054, height: 0.9296 },
  setSymbolBounds: { x: 0.5, y: 0.9524, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Color Identity', text: '', y: 1752 / 2100, width: 1, height: 100 / 2100, oneLine: true, size: 100 / 1638, align: 'center', manaCost: true, manaSpacing: 0, },
    title: { name: 'Title', text: '', x: 0.0474, y: 1525 / 2100, width: 0.9054, height: 0.0534, oneLine: true, font: 'gothammedium', size: 0.0534, color: 'white', align: 'center', },
    subtitle: { name: 'Subtitle', text: '', x: 0.0474, y: 1631 / 2100, width: 0.9054, height: 0.03, oneLine: true, font: 'belerenbsc', size: 0.03, color: 'white', align: 'center', },
  },
};

export default template;
