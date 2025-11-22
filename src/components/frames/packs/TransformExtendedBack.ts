import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/transform/extended/pinlineBack.svg', name: 'Pinline' },
  { src: '/img/frames/m15/transform/regular/maskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/transform/regular/maskFrameBack.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/transform/extended/wb.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/transform/extended/ub.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/transform/extended/bb.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/transform/extended/rb.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/transform/extended/gb.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/transform/extended/mb.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/transform/extended/ab.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/transform/extended/lb.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/transform/regular/ptW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/transform/regular/ptU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/transform/regular/ptB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/transform/regular/ptR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/transform/regular/ptG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/transform/regular/ptM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/transform/regular/ptA.png', bounds: ptBounds },
];

const template: FramePackTemplate = {
  id: 'TransformExtendedBack',
  label: 'Extended Art (Back)',
  version: 'transformExtendedBack',
  artBounds: { x: 0, y: 0.081, width: 1, height: 0.531 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.16, y: 0.0522, width: 0.7547, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.1294, y: 0.5664, width: 0.7854, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
