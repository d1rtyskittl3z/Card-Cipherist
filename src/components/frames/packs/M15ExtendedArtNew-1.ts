import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/new/extended/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/new/title.png', name: 'Title' },
  { src: '/img/frames/m15/new/type.png', name: 'Type' },
  { src: '/img/frames/m15/new/rules.png', name: 'Rules' },
  { src: '/img/frames/m15/new/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/new/border.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/new/extended/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/new/extended/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/new/extended/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/new/extended/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/new/extended/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/new/extended/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/new/extended/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/new/extended/l.png', masks },
  { name: 'Eldrazi Frame', src: '/img/frames/m15/new/extended/c.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/m15/new/extended/v.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/regular/m15PTV.png', bounds: ptBounds },
  { name: 'White Land Frame', src: '/img/frames/m15/new/extended/lw.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/new/extended/lu.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/new/extended/lb.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/new/extended/lr.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/new/extended/lg.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/new/extended/lm.png', masks },
];

const template: FramePackTemplate = {
  id: 'M15ExtendedArtNew',
  label: 'Extended Art Frames',
  version: 'm15Extended',
  artBounds: { x: 0, y: 236 / 2814, width: 1, height: 1530 / 2814 },
  setSymbolBounds: { x: 1862 / 2010, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 176 / 2814, width: 1864 / 2010, height: 71 / 2100, oneLine: true, size: 70.5 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 168 / 2010, y: 145 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 168 / 2010, y: 1588 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1780 / 2814, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
