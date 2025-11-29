import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks (empty for Dossier)
const masks: Mask[] = [];

// Shared bounds for legendary crowns
const crownBounds: Bounds = { x: 33 / 2010, y: 0, width: 1790 / 2010, height: 419 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/dossier/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/dossier/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/dossier/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/dossier/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/dossier/g.png', masks },
  { name: 'Multicolor Frame', src: '/img/frames/dossier/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/dossier/a.png', masks },

  { name: 'Power/Toughness Box', src: '/img/frames/dossier/pt.png', bounds: { x: 1538 / 2010, y: 2468 / 2814, width: 392 / 2010, height: 195 / 2814 } },

  { name: 'White Legendary Crown', src: '/img/frames/dossier/crown/w.png', bounds: crownBounds },
  { name: 'Blue Legendary Crown', src: '/img/frames/dossier/crown/u.png', bounds: crownBounds },
  { name: 'Black Legendary Crown', src: '/img/frames/dossier/crown/b.png', bounds: crownBounds },
  { name: 'Red Legendary Crown', src: '/img/frames/dossier/crown/r.png', bounds: crownBounds },
  { name: 'Green Legendary Crown', src: '/img/frames/dossier/crown/g.png', bounds: crownBounds },
  { name: 'Multicolor Legendary Crown', src: '/img/frames/dossier/crown/m.png', bounds: crownBounds },
  { name: 'Artifact Legendary Crown', src: '/img/frames/dossier/crown/a.png', bounds: crownBounds },

  { name: 'Holo Stamp', src: '/img/frames/dossier/stamp.png', bounds: { x: 857 / 2010, y: 2540 / 2814, width: 295 / 2010, height: 134 / 2814 } },
];

const template: FramePackTemplate = {
  id: 'Dossier',
  label: 'Dossier (MKM)',
  version: 'dossier',
  artBounds: { x: 103 / 2010, y: 365 / 2814, width: 1766 / 2010, height: 1149 / 2814 },
  setSymbolBounds: { x: 1829 / 2010, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 1804 / 2010, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', manaCost: true, rotation: 1, manaSpacing: -0.0008, manaPrefix: 'outlineAlt' },
    title: { name: 'Title', text: '', x: 0.0854, y: 132 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: 1 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, rotation: -0.5 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, font: 'specialelite' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 2534 / 2814, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', rotation: -2.5 },
  },
};

export default template;
