import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/token/m15/textless/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/token/m15/textless/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/token/tokenMaskTextlessType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/token/m15/textless/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/token/m15/textless/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/token/m15/textless/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/token/m15/textless/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/token/m15/textless/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/token/m15/textless/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/token/m15/textless/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/token/m15/textless/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds },
  { name: 'White Nyx Frame', src: '/img/frames/token/m15/textless/nyx/w.png', masks },
  { name: 'Blue Nyx Frame', src: '/img/frames/token/m15/textless/nyx/u.png', masks },
  { name: 'Black Nyx Frame', src: '/img/frames/token/m15/textless/nyx/b.png', masks },
  { name: 'Red Nyx Frame', src: '/img/frames/token/m15/textless/nyx/r.png', masks },
  { name: 'Green Nyx Frame', src: '/img/frames/token/m15/textless/nyx/g.png', masks },
  { name: 'Multicolored Nyx Frame', src: '/img/frames/token/m15/textless/nyx/m.png', masks },
  { name: 'Artifact Nyx Frame', src: '/img/frames/token/m15/textless/nyx/a.png', masks },
];

const template: FramePackTemplate = {
  id: 'TokenTextlessM15',
  label: 'Textless (Bordered M15)',
  version: 'tokenTextlessM15',
  artBounds: { x: 0.0767, y: 0.1248, width: 0.8476, height: 0.6843 },
  setSymbolBounds: { x: 0.9213, y: 0.8439, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 0.0381, color: '#fde367', align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8196, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
