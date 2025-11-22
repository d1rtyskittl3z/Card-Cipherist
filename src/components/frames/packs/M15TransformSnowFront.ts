import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/transform/regular/maskPinlineFront.png', name: 'Pinline' },
  { src: '/img/frames/m15/transform/regular/maskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/transform/regular/maskRulesFront.png', name: 'Rules' },
  { src: '/img/frames/m15/transform/regular/maskFrameFront.png', name: 'Frame' },
  { src: '/img/frames/m15/transform/regular/maskBorderFront.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/transform/snow/frontW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/transform/snow/frontU.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/transform/snow/frontB.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/transform/snow/frontR.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/transform/snow/frontG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/transform/snow/frontM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/transform/snow/frontA.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/transform/snow/frontL.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },
  { name: 'White Land Frame', src: '/img/frames/m15/transform/snow/frontWL.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/transform/snow/frontUL.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/transform/snow/frontBL.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/transform/snow/frontRL.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/transform/snow/frontGL.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/transform/snow/frontML.png', masks },
];

const template: FramePackTemplate = {
  id: 'M15TransformSnowFront',
  label: 'Snow (Front)',
  version: 'm15TransformSnowFront',
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
