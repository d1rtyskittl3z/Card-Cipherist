import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [];

// Power/Toughness bounds
const ptBounds: Bounds = { x: 1155/1500, y: 1850/2100, width: 274/1500, height: 150/2100 };

// Legend crown bounds
const crownBounds: Bounds = { x: 180/1500, y: 51/2100, width: 1145/1500, height: 65/2100 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/tarkir/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/tarkir/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/tarkir/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/tarkir/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/tarkir/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/tarkir/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/tarkir/a.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/tarkir/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/tarkir/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/tarkir/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/tarkir/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/tarkir/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/tarkir/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/tarkir/pt/a.png', bounds: ptBounds },

  { name: 'White Legend Crown', src: '/img/frames/tarkir/crowns/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/tarkir/crowns/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/tarkir/crowns/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/tarkir/crowns/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/tarkir/crowns/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/tarkir/crowns/m.png', bounds: crownBounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/tarkir/crowns/a.png', bounds: crownBounds },

  { name: 'Holo Stamp', src: '/img/frames/tarkir/stamp.png', bounds: { x: 638/1500, y: 1888/2100, width: 225/1500, height: 101/2100 } }
];

// Template
const template: FramePackTemplate = {
  id: 'Tarkir',
  label: 'Tarkir Sketch (MOM)',
  version: 'tarkir',
  artBounds: { x: 131/1500, y: 233/2100, width: 1235/1500, height: 926/2100 },
  setSymbolBounds: { x: 1386/1500, y: 1234/2100, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  replacementMasks: { 'Right Half': 'img/frames/tarkir/maskFrame.png' },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: -5/1500, y: 127/2100, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 124/1500, y: 104/2100, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 123/1500, y: 1182/2100, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1326/2100, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
