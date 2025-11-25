import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Shared bounds
const boundsIcon: Bounds = { x: 0.06, y: 0.05, width: 0.0667, height: 0.0481 };
const boundsPT: Bounds = { x: 0.7567, y: 0.8786, width: 0.2007, height: 0.0748 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/ixalan/ixalanFrameW.png' },
  { name: 'Blue Frame', src: '/img/frames/ixalan/ixalanFrameU.png' },
  { name: 'Black Frame', src: '/img/frames/ixalan/ixalanFrameB.png' },
  { name: 'Red Frame', src: '/img/frames/ixalan/ixalanFrameR.png' },
  { name: 'Green Frame', src: '/img/frames/ixalan/ixalanFrameG.png' },
  { name: 'Multicolored Frame', src: '/img/frames/ixalan/ixalanFrameM.png' },
  { name: 'Colorless Frame', src: '/img/frames/ixalan/ixalanFrameL.png' },
  { name: 'Creature Icon', src: '/img/frames/ixalan/ixalanIconCreature.png', bounds: boundsIcon },
  { name: 'Instant Icon', src: '/img/frames/ixalan/ixalanIconInstant.png', bounds: boundsIcon },
  { name: 'Sorcery Icon', src: '/img/frames/ixalan/ixalanIconSorcery.png', bounds: boundsIcon },
  { name: 'Enchantment Icon', src: '/img/frames/ixalan/ixalanIconEnchantment.png', bounds: boundsIcon },
  { name: 'Artifact Icon', src: '/img/frames/ixalan/ixalanIconArtifact.png', bounds: boundsIcon },
  { name: 'Multitype Icon', src: '/img/frames/ixalan/ixalanIconMulti.png', bounds: boundsIcon },
  { name: 'White Power/Toughness', src: '/img/frames/ixalan/pt/w.png', bounds: boundsPT },
  { name: 'Blue Power/Toughness', src: '/img/frames/ixalan/pt/u.png', bounds: boundsPT },
  { name: 'Black Power/Toughness', src: '/img/frames/ixalan/pt/b.png', bounds: boundsPT },
  { name: 'Red Power/Toughness', src: '/img/frames/ixalan/pt/r.png', bounds: boundsPT },
  { name: 'Green Power/Toughness', src: '/img/frames/ixalan/pt/g.png', bounds: boundsPT },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/ixalan/pt/m.png', bounds: boundsPT },
  { name: 'Colorless Power/Toughness', src: '/img/frames/ixalan/pt/l.png', bounds: boundsPT }
];

// Template
const template: FramePackTemplate = {
  id: 'Ixalan',
  label: 'Ixalan Maps',
  version: 'ixalan',
  artBounds: { x: 0.04, y: 0.1091, width: 0.92, height: 0.4543 },
  setSymbolBounds: { x: 0.5, y: 0.1162, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0553, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.14, y: 0.0458, width: 0.72, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 0.0386, align: 'center' },
    type: { name: 'Type', text: '', x: 0.23, y: 0.5662, width: 0.54, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, align: 'center' },
    rules: { name: 'Rules Text', text: '', x: 0.1167, y: 0.6381, width: 0.7667, height: 0.27, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
