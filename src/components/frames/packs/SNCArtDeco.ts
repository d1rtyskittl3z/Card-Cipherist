import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/snc/artDeco/title.svg', name: 'Title' },
  { src: '/img/frames/snc/artDeco/type.svg', name: 'Type' },
  { src: '/img/frames/snc/artDeco/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/snc/artDeco/rules.svg', name: 'Rules' },
  { src: '/img/frames/snc/artDeco/border.svg', name: 'Border' },
];

const bounds = { x: 0.7674, y: 0.8862, width: 0.194, height: 0.0581 };
const bounds2 = { x: 0.028, y: 0.0205, width: 0.944, height: 0.0972 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/snc/artDeco/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/snc/artDeco/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/snc/artDeco/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/snc/artDeco/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/snc/artDeco/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/snc/artDeco/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/snc/artDeco/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/snc/artDeco/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/snc/artDeco/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/snc/artDeco/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/snc/artDeco/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/snc/artDeco/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/snc/artDeco/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/snc/artDeco/pt/a.png', bounds },
  { name: 'White Legend Crown', src: '/img/frames/snc/artDeco/crowns/w.png', bounds: bounds2 },
  { name: 'Blue Legend Crown', src: '/img/frames/snc/artDeco/crowns/u.png', bounds: bounds2 },
  { name: 'Black Legend Crown', src: '/img/frames/snc/artDeco/crowns/b.png', bounds: bounds2 },
  { name: 'Red Legend Crown', src: '/img/frames/snc/artDeco/crowns/r.png', bounds: bounds2 },
  { name: 'Green Legend Crown', src: '/img/frames/snc/artDeco/crowns/g.png', bounds: bounds2 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/snc/artDeco/crowns/m.png', bounds: bounds2 },
  { name: 'Artifact Legend Crown', src: '/img/frames/snc/artDeco/crowns/a.png', bounds: bounds2 },
  { name: 'Rare Stamp', src: '/img/frames/snc/stamp.png', bounds: { x: 0.4554, y: 0.9172, width: 0.0894, height: 0.032 } },
];

const template: FramePackTemplate = {
  id: 'SNCArtDeco',
  label: 'Art Deco (SNC)',
  version: 'sncArtDeco',
  artBounds: { x: 0.042, y: 0.0943, width: 0.916, height: 0.4648 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2762, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7954, y: 0.9, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
