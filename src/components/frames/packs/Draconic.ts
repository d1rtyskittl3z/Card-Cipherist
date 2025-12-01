import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/draconic/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/draconic/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/draconic/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/draconic/masks/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/draconic/masks/maskFullart.png', name: 'Fullart' },
  { src: '/img/frames/draconic/masks/maskBorderless.png', name: 'Borderless' },
  { src: '/img/frames/draconic/masks/maskTrueBorderless.png', name: 'True Borderless' },
];

const ptBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };
const stampBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/draconic/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/draconic/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/draconic/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/draconic/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/draconic/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/draconic/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/draconic/a.png', masks },
  // { name: 'Colorless Frame', src: '/img/frames/draconic/c.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/draconic/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/draconic/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/draconic/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/draconic/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/draconic/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/draconic/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/draconic/pt/a.png', bounds: ptBounds },
  // { name: 'Colorless Power/Toughness', src: '/img/frames/draconic/pt/c.png', bounds: ptBounds },
  { name: 'White Holo Stamp', src: '/img/frames/draconic/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/draconic/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/draconic/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/draconic/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/draconic/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/draconic/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/draconic/stamp/a.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'Draconic',
  label: 'Draconic (TDM)',
  version: 'draconic',
  artBounds: { x: 66 / 2010, y: 323 / 2814, width: 1876 / 2010, height: 1252 / 2814 },
  setSymbolBounds: { x: 1386 / 1500, y: 1240 / 2100, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 176 / 2814, width: 1864 / 2010, height: 71 / 2100, oneLine: true, size: 70.5 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 168 / 2010, y: 145 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 168 / 2010, y: 1588 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1780 / 2814, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
