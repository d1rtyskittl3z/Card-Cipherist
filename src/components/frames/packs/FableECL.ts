import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for frames
const masks: Mask[] = [
  { src: '/img/frames/fable/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/fable/masks/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/fable/masks/maskNoBorder.png', name: 'No Border' },
  { src: '/img/frames/fable/masks/maskNoTitle.png', name: 'No Title' },
  { src: '/img/frames/fable/masks/maskBorder.png', name: 'Border' },
];

// Shared bounds for P/T boxes
const ptBounds: Bounds = { x: 6 / 2010, y: 11 / 2814, width: 1, height: 1 };

// Shared bounds for holo stamps
const stampBounds: Bounds = { x: 805 / 2010, y: 2500 / 2814, width: 400 / 2010, height: 125 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/fable/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/fable/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/fable/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/fable/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/fable/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/fable/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/fable/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/fable/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/fable/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/fable/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/fable/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/fable/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/fable/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/fable/pt/a.png', bounds: ptBounds },
  { name: 'White Holo Stamp', src: '/img/frames/fable/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/fable/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/fable/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/fable/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/fable/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/fable/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/fable/stamp/a.png', bounds: stampBounds },
  { name: 'Plain Holo Stamp', src: '/img/frames/m15/holoStamps/stamp.png', bounds: { x: 916 / 2010, y: 2555 / 2814, width: 180 / 2010, height: 90 / 2814 } },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/holoStamps/gray.png', bounds: { x: 916 / 2010, y: 2555 / 2814, width: 180 / 2010, height: 90 / 2814 } },
];

const template: FramePackTemplate = {
  id: 'FableECL',
  label: 'Fable (ECL)',
  version: 'fableECL',
  artBounds: { x: 0 / 2010, y: 0 / 2814, width: 2010 / 2010, height: 1585 / 2814 },
  setSymbolBounds: { x: 1845 / 2010, y: 1240 / 2100, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: -34 / 2010, y: 194 / 2814, width: 1864 / 2010, height: 71 / 2100, oneLine: true, size: 70.5 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 168 / 2010, y: 163 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 168 / 2010, y: 1588 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 187 / 2010, y: 1780 / 2814, width: 1650 / 2010, height: 790 / 2814, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 2532 / 2814, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
