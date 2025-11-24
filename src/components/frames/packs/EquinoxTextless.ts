import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/equinox/textless/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/equinox/textless/title.svg', name: 'Title' },
  { src: '/img/frames/m15/equinox/textless/type.svg', name: 'Type' }
];

const bounds: Bounds = { x: 0.7794, y: 0.8839, width: 0.1827, height: 0.0639 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/equinox/textless/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/equinox/textless/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/equinox/textless/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/equinox/textless/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/equinox/textless/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/equinox/textless/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/equinox/textless/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/equinox/textless/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/equinox/back/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/equinox/back/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/equinox/back/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/equinox/back/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/equinox/back/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/equinox/back/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/equinox/back/pt/a.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/equinox/back/pt/l.png', bounds }
];

const template: FramePackTemplate = {
  id: 'EquinoxTextless',
  label: 'Textless Equinox (MID)',
  version: 'equinoxTextless',
  artBounds: { x: 0.0754, y: 0.0534, width: 0.8574, height: 0.8715 },
  setSymbolBounds: { x: 0.9067, y: 0.8896, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0643, width: 0.9234, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0967, y: 0.0553, width: 0.8067, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.11, y: 0.8648, width: 0.8067, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7947, y: 0.9, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
