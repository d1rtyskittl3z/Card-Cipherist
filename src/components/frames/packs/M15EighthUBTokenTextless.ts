import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for M15 Eighth Edition UB Token Textless style frames
const masks: Mask[] = [
  { src: '/img/frames/custom/m15-eighth/token/regular-textless/pinline.png', name: 'Pinline' },
  { src: '/img/frames/custom/m15-eighth/token/regular-textless/frame.png', name: 'Frame' },
  { src: '/img/frames/custom/m15-eighth/token/regular-textless/title.png', name: 'Title' },
  { src: '/img/frames/custom/m15-eighth/token/regular-textless/type.png', name: 'Type' },
  { src: '/img/frames/custom/m15-eighth/regular/Border.png', name: 'Border' },
];

// Power/Toughness bounds
const ptBounds: Bounds = { x: 0.7573, y: 2538 / 2814, width: 0.188, height: 0.0733 };

// Available frames
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/custom/m15-eighth/token/ub-textless/l.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/ub/pt/v.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds: ptBounds },
];

const template: FramePackTemplate = {
  id: 'M15EighthUBTokenTextless',
  label: 'Universes Beyond (Textless)',
  version: 'm15EighthUBTokenTextless',
  artBounds: { x: 153 / 2010, y: 352 / 2814, width: 1704 / 2010, height: 1974 / 2814 },
  setSymbolBounds: { x: 0.9213, y: 2425 / 2814, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 120 / 2814, color: '#fde367', align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 2356 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 2587 / 2814, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 0.0647, y: 1973 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'belerenbsc', size: 0.02095, color: 'black', conditionalColor: 'M15 Border,Vehicle Frame:white' },
  },
  brush: '/img/manaSymbols/artistbrush.svg',
};

export default template;
