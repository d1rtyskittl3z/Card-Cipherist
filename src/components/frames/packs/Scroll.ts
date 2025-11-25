import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/scroll/maskNoOverlay.png', name: 'No Art Overlay' },
  { src: '/img/frames/scroll/maskExtendedArt.png', name: 'Extended Art Overlay' },
  { src: '/img/frames/scroll/maskBorderless.png', name: 'Borderless Overlay' },
  { src: '/img/frames/scroll/maskBorderlessWithBorder.png', name: 'Borderless With Border Overlay' },
];

// Shared bounds
const crownBounds: Bounds = { x: 49 / 2010, y: 43 / 2814, width: 1909 / 2010, height: 70 / 2814 };
const stampBounds: Bounds = { x: 834 / 2010, y: 2518 / 2814, width: 349 / 2010, height: 181 / 2814 };
const ptBounds: Bounds = { x: 1492 / 2010, y: 2422 / 2814, width: 435 / 2010, height: 266 / 2814 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/scroll/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/scroll/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/scroll/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/scroll/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/scroll/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/scroll/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/scroll/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/scroll/l.png', masks },

  { name: 'Multicolored Bars', src: '/img/frames/scroll/multicolor-bar-overlay.png' },

  { name: 'White Power/Toughness', src: '/img/frames/scroll/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/scroll/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/scroll/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/scroll/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/scroll/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/scroll/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/scroll/pt/a.png', bounds: ptBounds },

  { name: 'White Legendary Crown', src: '/img/frames/scroll/crowns/w.png', bounds: crownBounds },
  { name: 'Blue Legendary Crown', src: '/img/frames/scroll/crowns/u.png', bounds: crownBounds },
  { name: 'Black Legendary Crown', src: '/img/frames/scroll/crowns/b.png', bounds: crownBounds },
  { name: 'Red Legendary Crown', src: '/img/frames/scroll/crowns/r.png', bounds: crownBounds },
  { name: 'Green Legendary Crown', src: '/img/frames/scroll/crowns/g.png', bounds: crownBounds },
  { name: 'Multicolored Legendary Crown', src: '/img/frames/scroll/crowns/m.png', bounds: crownBounds },
  { name: 'Artifact Legendary Crown', src: '/img/frames/scroll/crowns/a.png', bounds: crownBounds },
  { name: 'Land Legendary Crown', src: '/img/frames/scroll/crowns/l.png', bounds: crownBounds },

  { name: 'White Holo Stamp', src: '/img/frames/scroll/stamps/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/scroll/stamps/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/scroll/stamps/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/scroll/stamps/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/scroll/stamps/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/scroll/stamps/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/scroll/stamps/a.png', bounds: stampBounds },
  { name: 'Land Holo Stamp', src: '/img/frames/scroll/stamps/l.png', bounds: stampBounds },
  { name: 'Gray Stamp', src: '/img/frames/scroll/stamps/gray.png', bounds: stampBounds },
];

// Template
const template: FramePackTemplate = {
  id: 'Scroll',
  label: 'Scrolls of Middle-earth (LTR)',
  version: 'scroll',
  artBounds: { x: 150 / 2010, y: 311 / 2814, width: 1711 / 2010, height: 1252 / 2814 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  replacementMasks: { 'Right Half': '/img/frames/scroll/maskRightHalf.png' },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
