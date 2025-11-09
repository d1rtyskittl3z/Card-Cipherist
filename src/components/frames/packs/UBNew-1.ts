import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/new/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/new/title.png', name: 'Title' },
  { src: '/img/frames/m15/new/type.png', name: 'Type' },
  { src: '/img/frames/m15/new/rules.png', name: 'Rules' },
  { src: '/img/frames/m15/new/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/new/border.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const stampBounds = { x: 857 / 2015, y: 2534 / 2814, width: 299 / 2015, height: 137 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/new/ub/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/new/ub/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/new/ub/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/new/ub/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/new/ub/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/new/ub/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/new/ub/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/new/ub/l.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/m15/new/ub/v.png', masks },
  //MISSING { name: 'Colorless Frame', src: '/img/frames/m15/new/ub/c.png', masks },
  { name: 'White Enchantment Frame', src: '/img/frames/m15/new/ub/ew.png', masks },
  { name: 'Blue Enchantment Frame', src: '/img/frames/m15/new/ub/eu.png', masks },
  { name: 'Black Enchantment Frame', src: '/img/frames/m15/new/ub/eb.png', masks },
  { name: 'Red Enchantment Frame', src: '/img/frames/m15/new/ub/er.png', masks },
  { name: 'Green Enchantment Frame', src: '/img/frames/m15/new/ub/eg.png', masks },
  { name: 'Multicolored Enchantment Frame', src: '/img/frames/m15/new/ub/em.png', masks },
  { name: 'Artifact Enchantment Frame', src: '/img/frames/m15/new/ub/ea.png', masks },
  { name: 'White Land Frame', src: '/img/frames/m15/new/ub/lw.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/new/ub/lu.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/new/ub/lb.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/new/ub/lr.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/new/ub/lg.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/new/ub/lm.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/ub/pt/v.png', bounds: ptBounds },
  { name: 'White Holo Stamp', src: '/img/frames/m15/new/ub/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/m15/new/ub/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/m15/new/ub/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/m15/new/ub/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/m15/new/ub/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/m15/new/ub/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/m15/new/ub/stamp/a.png', bounds: stampBounds },
  { name: 'Land Holo Stamp', src: '/img/frames/m15/new/ub/stamp/l.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/new/ub/stamp/gray.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'UBNew',
  label: 'Universes Beyond',
  version: 'ubRegular',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 1862 / 2010, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 176 / 2814, width: 1864 / 2010, height: 71 / 2100, oneLine: true, size: 70.5 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 168 / 2010, y: 145 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 168 / 2010, y: 1588 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1780 / 2814, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
