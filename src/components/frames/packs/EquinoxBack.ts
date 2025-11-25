import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks2: Mask[] = [
  { src: '/img/frames/m15/equinox/back/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/equinox/back/title.svg', name: 'Title' },
  { src: '/img/frames/m15/equinox/back/type.svg', name: 'Type' },
  { src: '/img/frames/m15/equinox/back/text.svg', name: 'Rules' }
];

// Shared bounds
const bounds2: Bounds = { x: 0.7794, y: 0.8839, width: 0.1827, height: 0.0639 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/equinox/back/w.png', masks: masks2 },
  { name: 'Blue Frame', src: '/img/frames/m15/equinox/back/u.png', masks: masks2 },
  { name: 'Black Frame', src: '/img/frames/m15/equinox/back/b.png', masks: masks2 },
  { name: 'Red Frame', src: '/img/frames/m15/equinox/back/r.png', masks: masks2 },
  { name: 'Green Frame', src: '/img/frames/m15/equinox/back/g.png', masks: masks2 },
  { name: 'Multicolored Frame', src: '/img/frames/m15/equinox/back/m.png', masks: masks2 },
  { name: 'Artifact Frame', src: '/img/frames/m15/equinox/back/a.png', masks: masks2 },
  { name: 'Land Frame', src: '/img/frames/m15/equinox/back/l.png', masks: masks2 },
  { name: 'White Power/Toughness', src: '/img/frames/m15/equinox/back/pt/w.png', bounds: bounds2 },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/equinox/back/pt/u.png', bounds: bounds2 },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/equinox/back/pt/b.png', bounds: bounds2 },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/equinox/back/pt/r.png', bounds: bounds2 },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/equinox/back/pt/g.png', bounds: bounds2 },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/equinox/back/pt/m.png', bounds: bounds2 },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/equinox/back/pt/a.png', bounds: bounds2 },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/equinox/back/pt/l.png', bounds: bounds2 }
];

// Template
const template: FramePackTemplate = {
  id: 'EquinoxBack',
  label: 'Equinox: Transform Back (MID)',
  version: 'equinoxBack',
  artBounds: { x: 0.0754, y: 0.0534, width: 0.8574, height: 0.8715 },
  setSymbolBounds: { x: 0.9067, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0643, width: 0.9234, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, color: 'white' },
    title: { name: 'Title', text: '', x: 0.0967, y: 0.0553, width: 0.8067, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 165/1500, y: 0.5664, width: 1190/1500, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.1, y: 0.6303, width: 0.8, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7947, y: 0.9, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
