import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/custom/classicshifted/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/custom/classicshifted/maskText.png', name: 'Textbox' },
  { src: '/img/frames/custom/classicshifted/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/custom/classicshifted/dual.svg', name: 'Dual Land Pinline' },
];

const masks2: Mask[] = [
  { src: '/img/frames/m15/m15MaskBorderSliver.png', name: 'Border' },
  { src: '/img/frames/custom/classicshifted/crowns/borderMask.svg', name: 'Legend Crown Cover' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Full Border' },
];

const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const crownBounds: Bounds = { x: 0.0267, y: 0.0134, width: 0.9467, height: 0.1005 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/classicshifted/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/classicshifted/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/classicshifted/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/classicshifted/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/classicshifted/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/classicshifted/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/custom/classicshifted/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/custom/classicshifted/c.png', masks },
  { name: 'Land Frame', src: '/img/frames/custom/classicshifted/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/custom/classicshifted/ptW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/custom/classicshifted/ptU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/custom/classicshifted/ptB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/custom/classicshifted/ptR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/custom/classicshifted/ptG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/custom/classicshifted/ptM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/custom/classicshifted/ptA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/custom/classicshifted/ptC.png', bounds: ptBounds },
  { name: 'Land Power/Toughness', src: '/img/frames/custom/classicshifted/ptL.png', bounds: ptBounds },
  { name: 'White Crown', src: '/img/frames/custom/classicshifted/crowns/w.png', bounds: crownBounds, complementary: 24 },
  { name: 'Blue Crown', src: '/img/frames/custom/classicshifted/crowns/u.png', bounds: crownBounds, complementary: 24 },
  { name: 'Black Crown', src: '/img/frames/custom/classicshifted/crowns/b.png', bounds: crownBounds, complementary: 24 },
  { name: 'Red Crown', src: '/img/frames/custom/classicshifted/crowns/r.png', bounds: crownBounds, complementary: 24 },
  { name: 'Green Crown', src: '/img/frames/custom/classicshifted/crowns/g.png', bounds: crownBounds, complementary: 24 },
  { name: 'Multicolored Crown', src: '/img/frames/custom/classicshifted/crowns/m.png', bounds: crownBounds, complementary: 24 },
  { name: 'Artifact Crown', src: '/img/frames/custom/classicshifted/crowns/a.png', bounds: crownBounds, complementary: 24 },
  { name: 'Colorless Crown', src: '/img/frames/custom/classicshifted/crowns/c.png', bounds: crownBounds, complementary: 24 },
  { name: 'Land Crown', src: '/img/frames/custom/classicshifted/crowns/l.png', bounds: crownBounds, complementary: 24 },
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.021 } },
  { name: 'Snow Overlay', src: '/img/frames/custom/classicshifted/snow.png' },
  { name: 'White Border', src: '/img/frames/white.png', masks: masks2, noDefaultMask: true },
  { name: 'Black Border', src: '/img/black.png', masks: masks2, noDefaultMask: true },
  { name: 'Silver Border', src: '/img/frames/silver.png', masks: masks2, noDefaultMask: true },
  { name: 'Gold Border', src: '/img/frames/gold.png', masks: masks2, noDefaultMask: true },
  { name: 'Black Frame (Alt)', src: '/img/frames/custom/classicshifted/b2.png', masks },
];

const template: FramePackTemplate = {
  id: 'Classicshifted',
  label: 'Classicshifted',
  version: 'classicshifted',
  artBounds: { x: 0.08, y: 0.0954, width: 0.84, height: 0.4653 },
  setSymbolBounds: { x: 0.9213, y: 0.5958, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0462, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0372, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.571, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6329, width: 0.828, height: 0.2905, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
};

export default template;
