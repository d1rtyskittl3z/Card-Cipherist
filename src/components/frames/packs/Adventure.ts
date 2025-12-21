import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/adventure/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/adventure/regular/maskFrame.png', name:'Frame' },
  { src: '/img/frames/adventure/regular/book.svg', name: 'Rules' },
  { src: '/img/frames/adventure/regular/bookLeft.png', name: 'Rules (Left)' },
  { src: '/img/frames/adventure/regular/bookLeftMulticolor.png', name: 'Rules (Left, Multicolor)' },
  { src: '/img/frames/adventure/regular/bookRight.png', name: 'Rules (Right)' },
  { src: '/img/frames/adventure/regular/bookRightMulticolor.png', name: 'Rules (Right, Multicolor)' },
   {src: '/img/frames/m15/regular/m15MaskBorder.png', name:'Border' },
];

const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/adventure/regular/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/adventure/regular/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/adventure/regular/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/adventure/regular/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/adventure/regular/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/adventure/regular/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/adventure/regular/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/adventure/regular/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds },
  { name: 'White Enchantment Frame', src: '/img/frames/adventure/nyx/w.png', masks },
  { name: 'Blue Enchantment Frame', src: '/img/frames/adventure/nyx/u.png', masks },
  { name: 'Black Enchantment Frame', src: '/img/frames/adventure/nyx/b.png', masks },
  { name: 'Red Enchantment Frame', src: '/img/frames/adventure/nyx/r.png', masks },
  { name: 'Green Enchantment Frame', src: '/img/frames/adventure/nyx/g.png', masks },
  { name: 'Multicolored Enchantment Frame', src: '/img/frames/adventure/nyx/m.png', masks },
  { name: 'Artifact Enchantment Frame', src: '/img/frames/adventure/nyx/a.png', masks },
];

const template: FramePackTemplate = {
  id: 'Adventure',
  label: 'Adventures (Eldraine)',
  version: 'adventure',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.72, y: 0.7681, width: 0.3867, height: 0.2358 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text (Right)', text: '', x: 0.5267, y: 0.65, width: 0.3867, height: 0.2358, size: 0.0353 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    mana2: { name: 'Adventure Mana Cost', text: '', x: 0.0814, y: 0.6391, width: 0.4, height: 60 / 2100, oneLine: true, size: 60 / 1638, color: 'white', shadowX: -0.001, shadowY: 0.0029, align: 'right', manaCost: true },
    title2: { name: 'Adventure Title', text: '', x: 0.0814, y: 0.6391, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', oneLine: true, font: 'belerenb' },
    type2: { name: 'Adventure Type', text: '', x: 0.0814, y: 0.6839, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', oneLine: true, font: 'belerenb' },
    rules2: { name: 'Rules Text', text: '', x: 0.0854, y: 0.7358, width: 0.3947, height: 0.15, size: 0.0353 },
  },
};

export default template;
