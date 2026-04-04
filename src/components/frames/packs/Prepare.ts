import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks for all main frames
const masks: Mask[] = [
  { src: '/img/frames/prepare/regular/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/prepare/regular/rules.png', name: 'Rules' },
  { src: '/img/frames/prepare/regular/rulesRight.png', name: 'Rules (Right Half)' },
  { src: '/img/frames/prepare/regular/prepare.png', name: 'Prepare Spell' },
  { src: '/img/frames/prepare/regular/prepareRight.png', name: 'Prepare Spell (Right Half)' },
  { src: '/img/frames/prepare/regular/preparePinline.png', name: 'Prepare Spell Pinline' },
  { src: '/img/frames/prepare/regular/prepareTypeTitle.png', name: 'Prepare Spell Type/Title' },
  { src: '/img/frames/prepare/regular/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/prepare/regular/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/prepare/regular/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/prepare/regular/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/prepare/regular/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/prepare/regular/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/prepare/regular/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/prepare/regular/a.png', masks },
//   { name: 'Colorless Frame', src: '/img/frames/prepare/regular/c.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/prepare/regular/v.png', masks },
  { name: 'Land Frame', src: '/img/frames/prepare/regular/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds },
  { name: 'White Enchantment Frame', src: '/img/frames/prepare/nyx/w.png', masks },
  { name: 'Blue Enchantment Frame', src: '/img/frames/prepare/nyx/u.png', masks },
  { name: 'Black Enchantment Frame', src: '/img/frames/prepare/nyx/b.png', masks },
  { name: 'Red Enchantment Frame', src: '/img/frames/prepare/nyx/r.png', masks },
  { name: 'Green Enchantment Frame', src: '/img/frames/prepare/nyx/g.png', masks },
  { name: 'Multicolored Enchantment Frame', src: '/img/frames/prepare/nyx/m.png', masks },
  { name: 'Artifact Enchantment Frame', src: '/img/frames/prepare/nyx/a.png', masks },
];

const template: FramePackTemplate = {
  id: 'Prepare',
  label: 'Prepare (Secrets of Strixhaven)',
  version: 'prepare',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.72, y: 0.7681, width: 0.3867, height: 0.2358 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.808 / 2010, height: 0.2875, size: 0.0353 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    mana2: { name: 'Mana Cost (Prepare Spell)', text: '', x: 1319 / 2010, y: 1798 / 2814, width: 550 / 2010, height: 60 / 2100, oneLine: true, size: 60 / 1638, color: 'white', shadowX: -0.001, shadowY: 0.0029, align: 'right', manaCost: true },
    title2: { name: 'Title (Prepare Spell)', text: '', x: 1042 / 2010, y: 0.6391, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', oneLine: true, font: 'belerenb' },
    type2: { name: 'Type (Prepare Spell)', text: '', x: 1042 / 2010, y: 1932 / 2814, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', oneLine: true, font: 'belerenb' },
    rules2: { name: 'Rules Text (Prepare Spell)', text: '', x: 1035 / 2010, y: 2059 / 2814, width: 0.3947, height: 438 / 2814, size: 0.0353 },
  },
};

export default template;
