import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/split/top.svg', name: 'Top Half' },
  { src: '/img/frames/m15/split/bottom.svg', name: 'Bottom Half' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/split/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/split/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/split/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/split/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/split/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/split/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/split/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/split/l.png', masks },
];

const template: FramePackTemplate = {
  id: 'Split',
  label: 'Split Cards',
  version: 'split',
  artBounds: { x: 0.0558, y: 0.1034, width: 0.5700, height: 0.2886, rotation: -90 },
  artBounds2: { x: 0.0558, y: 0.5599, width: 0.5700, height: 0.2886, rotation: -90 },
  setSymbolBounds: { x: 1855 / 2010, y: 2707 / 2814, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost (Left)', text: '', x: 0.0847, y: 0.8943, width: 0.5367, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, rotation: -90 },
    title: { name: 'Title (Left)', text: '', x: 0.072, y: 0.8943, width: 0.5367, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: -90 },
    type: { name: 'Type (Left)', text: '', x: 0.55, y: 0.8943, width: 0.5367, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, rotation: -90 },
    rules: { name: 'Rules Text (Left)', text: '', x: 0.6087, y: 0.8896, width: 0.5174, height: 0.2443, size: 0.0362, rotation: -90 },
    pt: { name: 'PT Text (Left)', text: '', x: 0.8550, y: 0.8296, width: 0.828, height: 0.12, size: 0.0286, font: 'belerenbsc', oneLine: true, align: 'center', rotation: -90 },
    mana2: { name: 'Mana Cost (Right)', text: '', x: 0.0847, y: 0.4381, width: 0.5367, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, rotation: -90 },
    title2: { name: 'Title (Right)', text: '', x: 0.072, y: 0.4381, width: 0.5367, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: -90 },
    type2: { name: 'Type (Right)', text: '', x: 0.55, y: 0.4381, width: 0.5367, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, rotation: -90 },
    rules2: { name: 'Rules Text (Right)', text: '', x: 0.6087, y: 0.4334, width: 0.5174, height: 0.2443, size: 0.0362, rotation: -90 },
    pt2: { name: 'PT Text (Right)', text: '', x: 0.8550, y: 0.3734, width: 0.828, height: 0.12, size: 0.0286, font: 'belerenbsc', oneLine: true, align: 'center', rotation: -90 },
  },
};

export default template;
