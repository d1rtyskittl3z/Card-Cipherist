import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for main frames
const masks: Mask[] = [
  { src: '/img/frames/mysticalArchive/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/mysticalArchive/pinlineRight.svg', name: 'Pinline (Right)' },
];

// Shared bounds for crowns
const crownBounds: Bounds = { x: 0, y: 0, width: 1, height: 97 / 2100 };

// Shared bounds for power/toughness boxes
const ptBounds: Bounds = { x: 1135 / 1500, y: 1848 / 2100, width: 317 / 1500, height: 159 / 2100 };

// Power/toughness masks (empty)
const ptMasks: Mask[] = [];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/mysticalArchive/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/mysticalArchive/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/mysticalArchive/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/mysticalArchive/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/mysticalArchive/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/mysticalArchive/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/mysticalArchive/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/mysticalArchive/c.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/mysticalArchive/pt/w.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Blue Power/Toughness', src: '/img/frames/mysticalArchive/pt/u.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Black Power/Toughness', src: '/img/frames/mysticalArchive/pt/b.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Red Power/Toughness', src: '/img/frames/mysticalArchive/pt/r.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Green Power/Toughness', src: '/img/frames/mysticalArchive/pt/g.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/mysticalArchive/pt/m.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Artifact Power/Toughness', src: '/img/frames/mysticalArchive/pt/a.png', bounds: ptBounds, masks: ptMasks },
  { name: 'Land Power/Toughness', src: '/img/frames/mysticalArchive/pt/c.png', bounds: ptBounds, masks: ptMasks },

  { name: 'White Crown', src: '/img/frames/mysticalArchive/crowns/w.png', bounds: crownBounds },
  { name: 'Blue Crown', src: '/img/frames/mysticalArchive/crowns/u.png', bounds: crownBounds },
  { name: 'Black Crown', src: '/img/frames/mysticalArchive/crowns/b.png', bounds: crownBounds },
  { name: 'Red Crown', src: '/img/frames/mysticalArchive/crowns/r.png', bounds: crownBounds },
  { name: 'Green Crown', src: '/img/frames/mysticalArchive/crowns/g.png', bounds: crownBounds },
  { name: 'Multicolored Crown', src: '/img/frames/mysticalArchive/crowns/m.png', bounds: crownBounds },
  { name: 'Artifact Crown', src: '/img/frames/mysticalArchive/crowns/a.png', bounds: crownBounds },
  { name: 'Land Crown', src: '/img/frames/mysticalArchive/crowns/c.png', bounds: crownBounds },
];

const template: FramePackTemplate = {
  id: 'MysticalArchive',
  label: 'Mystical Archive (STA)',
  version: 'mysticalArchive',
  artBounds: { x: 0, y: 0.1205, width: 1, height: 0.7539 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', manaCost: true, manaSpacing: -0.0027, manaPrefix: 'outline' },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.0934, y: 0.6303, width: 0.8134, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
