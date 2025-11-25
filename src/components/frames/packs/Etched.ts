import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/etched/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/etched/regular/title.svg', name: 'Title' },
  { src: '/img/frames/etched/regular/type.svg', name: 'Type' },
  { src: '/img/frames/etched/regular/rules.svg', name: 'Rules' },
  { src: '/img/frames/etched/regular/border.svg', name: 'Border' }
];

// Shared bounds
const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const holoBounds: Bounds = { x: 0.42, y: 0.9062, width: 0.16, height: 0.0453 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/etched/regular/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/etched/regular/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/etched/regular/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/etched/regular/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/etched/regular/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/etched/regular/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/etched/regular/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/etched/regular/l.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/etched/regular/c.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/etched/regular/v.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/etched/regular/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/etched/regular/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/etched/regular/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/etched/regular/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/etched/regular/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/etched/regular/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/etched/regular/pt/a.png', bounds: ptBounds },
  { name: 'Land Power/Toughness', src: '/img/frames/etched/regular/pt/l.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/etched/regular/pt/v.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/etched/regular/pt/c.png', bounds: ptBounds },
  { name: 'White Holo Stamp', src: '/img/frames/etched/regular/holo/w.png', bounds: holoBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/etched/regular/holo/u.png', bounds: holoBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/etched/regular/holo/b.png', bounds: holoBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/etched/regular/holo/r.png', bounds: holoBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/etched/regular/holo/g.png', bounds: holoBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/etched/regular/holo/m.png', bounds: holoBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/etched/regular/holo/a.png', bounds: holoBounds },
  { name: 'Land Holo Stamp', src: '/img/frames/etched/regular/holo/l.png', bounds: holoBounds },
  { name: 'Colorless Holo Stamp', src: '/img/frames/etched/regular/holo/c.png', bounds: holoBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'Etched',
  label: 'Etched',
  version: 'etched',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.0927, y: 0.6303, width: 0.8147, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
