import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/snc/skyscraper/title.svg', name: 'Title' },
  { src: '/img/frames/snc/skyscraper/type.svg', name: 'Type' },
  { src: '/img/frames/snc/skyscraper/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/snc/skyscraper/rules.svg', name: 'Rules' },
  { src: '/img/frames/snc/skyscraper/frame.svg', name: 'Frame' },
  { src: '/img/frames/snc/skyscraper/border.svg', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/snc/skyscraper/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/snc/skyscraper/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/snc/skyscraper/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/snc/skyscraper/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/snc/skyscraper/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/snc/skyscraper/m.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/snc/skyscraper/c.png', masks },
  { name: 'Rare Stamp', src: '/img/frames/snc/stamp.png', bounds: { x: 0.4554, y: 0.9172, width: 0.0894, height: 0.032 } },
];

const template: FramePackTemplate = {
  id: 'SNCSkyscraper',
  label: 'Skyscraper (SNC)',
  version: 'sncSkyscraper',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
