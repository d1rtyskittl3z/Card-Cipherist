import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/token/tokenMaskTextlessPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/token/tokenMaskTextlessType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
  { src: '/img/frames/token/textless/maskBevel.png', name: 'Bevel' },
];

const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/token/textless/tokenFrameWTextless.png', masks },
  { name: 'Blue Frame', src: '/img/frames/token/textless/tokenFrameUTextless.png', masks },
  { name: 'Black Frame', src: '/img/frames/token/textless/tokenFrameBTextless.png', masks },
  { name: 'Red Frame', src: '/img/frames/token/textless/tokenFrameRTextless.png', masks },
  { name: 'Green Frame', src: '/img/frames/token/textless/tokenFrameGTextless.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/token/textless/tokenFrameMTextless.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/token/textless/tokenFrameATextless.png', masks },
  { name: 'Land Frame', src: '/img/frames/token/textless/tokenFrameLTextless.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/token/textless/frameC.png', masks },
  { name: 'Snow Frame', src: '/img/frames/token/textless/snow.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds: ptBounds },
];

const template: FramePackTemplate = {
  id: 'TokenTextless-1',
  label: 'Textless',
  version: 'tokenTextless',
  artBounds: { x: 0.04, y: 0.0286, width: 0.92, height: 0.8953 },
  setSymbolBounds: { x: 0.9213, y: 0.8439, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 0.0381, color: 'white', align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8196, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
