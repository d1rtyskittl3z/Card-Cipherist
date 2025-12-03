import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for M15 Eighth Transform UB Front frames
const masks: Mask[] = [
  { src: '/img/frames/m15/transform/regular/maskPinlineFront.png', name: 'Pinline' },
  { src: '/img/frames/m15/transform/regular/maskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/transform/regular/maskRulesFront.png', name: 'Rules' },
  { src: '/img/frames/custom/m15-eighth/transform/front/regular/maskFrameFront.png', name: 'Frame' },
  { src: '/img/frames/custom/m15-eighth/transform/front/regular/maskBorderFront.png', name: 'Border' },
];

// Power/Toughness bounds
const ptBounds: Bounds = { x: 0.7573, y: 1901 / 2100, width: 0.188, height: 0.0733 };

// Available frames
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/a.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/v.png', masks },
  { name: 'Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/l.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/ub/pt/v.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness Alt', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },

  { name: 'White Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/gl.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/custom/m15-eighth/transform/front/ub/ml.png', masks },

  { name: 'M15 Border', src: '/img/frames/m15/transform/regular/maskBorderFront.png' },
];

const template: FramePackTemplate = {
  id: 'M15EighthTransformUBFront',
  label: 'Universes Beyond (Front)',
  version: 'm15EighthTransformUBFront',
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
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 1937 / 2100, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 0.0647, y: 1973 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'belerenbsc', size: 0.02095, color: 'black', conditionalColor: 'M15 Border,Vehicle Frame:white' },
  },
  brush: '/img/manaSymbols/artistbrush.svg',
};

export default template;
