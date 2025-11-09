import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  // { src: '/img/black.png', name: 'No Mask' },  
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/regular/m15FrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/regular/m15FrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/regular/m15FrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/regular/m15FrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/regular/m15FrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/regular/m15FrameM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/regular/m15FrameA.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/regular/m15FrameL.png', masks },
  { name: 'Eldrazi Frame', src: '/img/frames/m15/regular/eldrazi.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/m15/regular/m15FrameV.png', masks },
  { name: 'Midnight Frame', src: '/img/frames/m15/custom/m15Midnight.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/regular/m15PTV.png', bounds: ptBounds },
  { name: 'PT Inner Fill', src: '/img/frames/m15/custom/m15CustomPTInnerFill.png', bounds: { x: 0.79, y: 0.8977, width: 0.1414, height: 0.04 } },
];

const template: FramePackTemplate = {
  id: 'M15Regular-1',
  label: 'Regular Frames',
  version: 'm15Regular',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
