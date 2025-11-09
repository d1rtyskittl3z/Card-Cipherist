import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/transform/regular/maskPinlineFront.png', name: 'Pinline' },
  { src: '/img/frames/m15/transform/regular/maskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/transform/regular/maskRulesFront.png', name: 'Rules' },
  { src: '/img/frames/m15/transform/regular/maskFrameFront.png', name: 'Frame' },
  { src: '/img/frames/m15/transform/regular/maskBorderFront.png', name: 'Border' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/transform/regular/frontW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/transform/regular/frontU.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/transform/regular/frontB.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/transform/regular/frontR.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/transform/regular/frontG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/transform/regular/frontM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/transform/regular/frontA.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/m15/transform/regular/frontV.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/transform/regular/frontL.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/regular/m15PTV.png', bounds },
  { name: 'White Land Frame', src: '/img/frames/m15/transform/regular/frontWL.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/transform/regular/frontUL.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/transform/regular/frontBL.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/transform/regular/frontRL.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/transform/regular/frontGL.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/transform/regular/frontML.png', masks },
];

const template: FramePackTemplate = {
  id: 'M15TransformFront-1',
  label: 'Regular (Front)',
  version: 'm15TransformFront',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.16, y: 0.0522, width: 0.7547, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    reminder: { name: 'Reverse PT', text: '', x: 0.086, y: 0.842, width: 0.838, height: 0.0362, size: 0.0291, oneLine: true, color: '#666', align: 'right', font: 'belerenbsc' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
