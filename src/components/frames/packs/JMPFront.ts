import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Frame', src: '/img/frames/token/jmpFront/frame.svg' },
];

const template: FramePackTemplate = {
  id: 'JMPFront',
  label: 'Jumpstart Front Cards',
  version: 'jmpFront',
  artBounds: { x: 0.0474, y: 0.0353, width: 0.9054, height: 0.9296 },
  setSymbolBounds: { x: 0.5, y: 0.9524, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Color Identity', text: '', y: 0.9167, width: 0.9292, height: 83 / 2100, oneLine: true, size: 83 / 1638, align: 'right', manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0474, y: 0.7039, width: 0.9054, height: 0.0534, oneLine: true, font: 'gothammedium', size: 0.0534, color: 'white', align: 'center' },
    subtitle: { name: 'Subtitle', text: '', x: 0.0474, y: 0.7543, width: 0.9054, height: 0.03, oneLine: true, font: 'belerenbsc', size: 0.03, color: 'white', align: 'center' },
  },
};

export default template;
