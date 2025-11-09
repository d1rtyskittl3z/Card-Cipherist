import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/promo/m15PromoMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/promo/m15PromoMaskType.png', name: 'Type' },
  { src: '/img/frames/promo/m15PromoMaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/promo/regular/m15PromoFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/promo/regular/m15PromoFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/promo/regular/m15PromoFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/promo/regular/m15PromoFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/promo/regular/m15PromoFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/promo/regular/m15PromoFrameM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/promo/regular/m15PromoFrameA.png', masks },
  { name: 'Land Frame', src: '/img/frames/promo/regular/m15PromoFrameL.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds },
  { name: 'Outline Cutout', src: '/img/frames/promo/outlineCutout.svg', erase: true },
  { name: 'Outline (Solid)', src: '/img/frames/promo/outline.svg' },
  { name: 'Outline (Bevel)', src: '/img/frames/promo/bevel.png' },
];

const template: FramePackTemplate = {
  id: 'PromoRegular-1',
  label: 'Borderless Frames',
  version: 'promoRegular',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.6743, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.8177, width: 0.75, height: 0.1472 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.65, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7143, width: 0.828, height: 0.2048, size: 0.0362, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
