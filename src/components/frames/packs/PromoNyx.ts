import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/promo/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/promo/m15PromoMaskType.png', name: 'Type' },
  { src: '/img/frames/promo/frame.svg', name: 'Frame' },
  { src: '/img/frames/promo/m15PromoMaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/promo/nyx/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/promo/nyx/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/promo/nyx/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/promo/nyx/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/promo/nyx/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/promo/nyx/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/promo/nyx/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/promo/nyx/l.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/promo/nyx/v.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/promo/nyx/c.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds },
];

const template: FramePackTemplate = {
  id: 'PromoNyx',
  label: 'Nyx Frames',
  version: 'promoNyx',
  artBounds: { x: 0.0614, y: 0.1124, width: 0.8774, height: 0.8086 },
  setSymbolBounds: { x: 0.9213, y: 0.6743, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.8177, width: 0.75, height: 0.1472 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.65, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7143, width: 0.828, height: 0.2048, size: 0.0362, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
