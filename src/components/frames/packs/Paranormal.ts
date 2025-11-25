import type { FramePackTemplate, FrameItem, Bounds } from './types';

const ptBounds: Bounds = { x: 1552 / 2010, y: 2461 / 2814, width: 406 / 2010, height: 211 / 2814 };
const crownBounds: Bounds = { x: 161 / 2010, y: 39 / 2814, width: 1656 / 2010, height: 43 / 2814 };
const stampBounds: Bounds = { x: 858 / 2010, y: 2532 / 2814, width: 284 / 2010, height: 131 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/paranormal/w.png' },
  { name: 'Blue Frame', src: '/img/frames/m15/paranormal/u.png' },
  { name: 'Black Frame', src: '/img/frames/m15/paranormal/b.png' },
  { name: 'Red Frame', src: '/img/frames/m15/paranormal/r.png' },
  { name: 'Green Frame', src: '/img/frames/m15/paranormal/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/m15/paranormal/m.png' },
  { name: 'Artifact Frame', src: '/img/frames/m15/paranormal/a.png' },
//   { name: 'Land Frame', src: '/img/frames/m15/paranormal/l.png' },

  { name: 'White Power/Toughness', src: '/img/frames/m15/paranormal/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/paranormal/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/paranormal/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/paranormal/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/paranormal/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/paranormal/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/paranormal/pt/a.png', bounds: ptBounds },
//   { name: 'Land Power/Toughness', src: '/img/frames/m15/paranormal/pt/l.png', bounds: ptBounds },

  { name: 'White Legend Crown', src: '/img/frames/m15/paranormal/crown/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/paranormal/crown/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/m15/paranormal/crown/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/m15/paranormal/crown/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/m15/paranormal/crown/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/paranormal/crown/m.png', bounds: crownBounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/paranormal/crown/a.png', bounds: crownBounds },
//   { name: 'Land Legend Crown', src: '/img/frames/m15/paranormal/crown/l.png', bounds: crownBounds },

  { name: 'White Holo Stamp', src: '/img/frames/m15/paranormal/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/m15/paranormal/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/m15/paranormal/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/m15/paranormal/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/m15/paranormal/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/m15/paranormal/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/m15/paranormal/stamp/a.png', bounds: stampBounds },
//   { name: 'Land Holo Stamp', src: '/img/frames/m15/paranormal/stamp/l.png', bounds: stampBounds }
];

const template: FramePackTemplate = {
  id: 'Paranormal',
  label: 'Paranormal (DSK)',
  version: 'paranormal',
  artBounds: { x: 157 / 2010, y: 327 / 2814, width: 1577 / 2010, height: 1203 / 2814 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 141 / 2814, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 110 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 172 / 2010, y: 1789 / 2814, width: 1664 / 2010, height: 792 / 2814, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
