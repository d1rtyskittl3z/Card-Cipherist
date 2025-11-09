import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/colorshifted/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/colorshifted/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/colorshifted/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/colorshifted/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/colorshifted/g.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/colorshifted/wpt.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/colorshifted/upt.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/colorshifted/bpt.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/colorshifted/rpt.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/colorshifted/gpt.png', bounds: ptBounds },
];

const template: FramePackTemplate = {
  id: 'Colorshifted',
  label: 'Colorshifted (Planar Chaos)',
  version: 'colorshifted',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.0021, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0021, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX: 0.0021, shadowY: 0.0015 },
  },
};

export default template;
