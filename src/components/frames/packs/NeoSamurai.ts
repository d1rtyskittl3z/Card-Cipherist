import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/neo/samurai/frame.svg', name: 'Frame' },
  { src: '/img/frames/neo/samurai/frame2.svg', name: 'Rules & Accents' },
];

const bounds = { x: 0.7634, y: 0.8858, width: 0.1954, height: 0.0677 };
const bounds2 = { x: 0.0294, y: 0.0162, width: 0.942, height: 0.0753 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/neo/samurai/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/neo/samurai/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/neo/samurai/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/neo/samurai/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/neo/samurai/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/neo/samurai/m.png', masks },
  { name: 'Artifact Overlay', src: '/img/frames/neo/samurai/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/neo/samurai/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/neo/samurai/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/neo/samurai/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/neo/samurai/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/neo/samurai/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/neo/samurai/pt/m.png', bounds },
  { name: 'White Legend Crown', src: '/img/frames/neo/samurai/crown/w.png', bounds: bounds2 },
  { name: 'Blue Legend Crown', src: '/img/frames/neo/samurai/crown/u.png', bounds: bounds2 },
  { name: 'Black Legend Crown', src: '/img/frames/neo/samurai/crown/b.png', bounds: bounds2 },
  { name: 'Red Legend Crown', src: '/img/frames/neo/samurai/crown/r.png', bounds: bounds2 },
  { name: 'Green Legend Crown', src: '/img/frames/neo/samurai/crown/g.png', bounds: bounds2 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/neo/samurai/crown/m.png', bounds: bounds2 },
  { name: 'Rare Stamp', src: '/img/frames/neo/samurai/stamp.png', bounds: { x: 0.4354, y: 0.9072, width: 0.1294, height: 0.042 } },
];

const template: FramePackTemplate = {
  id: 'NeoSamurai',
  label: 'Samurai (NEO)',
  version: 'neoSamurai',
  artBounds: { x: 0.04, y: 0.1253, width: 0.92, height: 0.441 },
  setSymbolBounds: { x: 0.916, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0777, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0686, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2762, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.9062, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
