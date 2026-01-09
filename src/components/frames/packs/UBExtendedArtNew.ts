import type { FramePackTemplate, FrameItem, Mask } from './types';

// Masks for Universes Beyond extended art frames
const masks: Mask[] = [
  { src: '/img/frames/m15/new/extended/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/new/title.png', name: 'Title' },
  { src: '/img/frames/m15/new/type.png', name: 'Type' },
  { src: '/img/frames/m15/new/rules.png', name: 'Rules' },
  { src: '/img/frames/m15/new/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/new/border.png', name: 'Border' },
];

// Power/Toughness box bounds
const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/new/ub/extended/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/new/ub/extended/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/new/ub/extended/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/new/ub/extended/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/new/ub/extended/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/new/ub/extended/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/new/ub/extended/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/new/ub/extended/l.png', masks },
//   { name: 'Eldrazi Frame', src: '/img/frames/m15/new/ub/extended/c.png', masks }, MISSING
  { name: 'Vehicle Frame', src: '/img/frames/m15/new/ub/extended/v.png', masks },
  { name: 'White Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/w.png', masks },
  { name: 'Blue Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/u.png', masks },
  { name: 'Black Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/b.png', masks },
  { name: 'Red Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/r.png', masks },
  { name: 'Green Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/g.png', masks },
  { name: 'Multicolored Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/m.png', masks },
  { name: 'Colorless Enchantment Frame', src: '/img/frames/m15/new/ub/extended/nyx/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/ub/pt/v.png', bounds: ptBounds },
  { name: 'White Land Frame', src: '/img/frames/m15/new/ub/extended/lw.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/new/ub/extended/lu.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/new/ub/extended/lb.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/new/ub/extended/lr.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/new/ub/extended/lg.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/new/ub/extended/lm.png', masks },
];

const template: FramePackTemplate = {
  id: 'UBExtendedArtNew',
  label: 'Universes Beyond (Extended Art)',
  version: 'm15Extended',
  artBounds: { x: 0, y: 236 / 2814, width: 1, height: 1530 / 2814 },
  setSymbolBounds: { x: 1862 / 2010, y: 1673 / 2814, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 176 / 2814, width: 1864 / 2010, height: 71 / 2100, oneLine: true, size: 70.5 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 168 / 2010, y: 145 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 168 / 2010, y: 1603 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1780 / 2814, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
