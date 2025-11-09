import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const ptBounds = { x: 0.74, y: 0.85, width: 0.26, height: 0.15 };
const crownBounds = { x: 0, y: 0, width: 1, height: 0.19 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/neon/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/neon/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/neon/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/neon/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/neon/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/neon/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/custom/neon/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/custom/neon/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/custom/neon/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/custom/neon/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/custom/neon/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/custom/neon/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/custom/neon/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/custom/neon/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/custom/neon/pt/a.png', bounds: ptBounds },
  { name: 'Land Power/Toughness', src: '/img/frames/custom/neon/pt/l.png', bounds: ptBounds },
  { name: 'White Legend Crown', src: '/img/frames/custom/neon/crowns/w.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Blue Legend Crown', src: '/img/frames/custom/neon/crowns/u.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Black Legend Crown', src: '/img/frames/custom/neon/crowns/b.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Red Legend Crown', src: '/img/frames/custom/neon/crowns/r.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Green Legend Crown', src: '/img/frames/custom/neon/crowns/g.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Multicolored Legend Crown', src: '/img/frames/custom/neon/crowns/m.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Artifact Legend Crown', src: '/img/frames/custom/neon/crowns/a.png', bounds: crownBounds, preserveAlpha: true },
  { name: 'Land Legend Crown', src: '/img/frames/custom/neon/crowns/l.png', bounds: crownBounds, preserveAlpha: true },
];

const template: FramePackTemplate = {
  id: 'CustomNeon',
  label: 'Neon - Elry',
  version: 'customNeon',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9334, height: 84 / 2100, oneLine: true, size: 84 / 1638, align: 'right', manaCost: true, manaSpacing: 0, manaPrefix: 'neon' },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
