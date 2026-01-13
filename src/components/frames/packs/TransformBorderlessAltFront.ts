import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskPinlineFront.png', name: 'Pinline' },
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskTitleFront.png', name: 'Title' },
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskRulesFront.png', name: 'Rules' },
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskTextBoxesFront.png', name: 'Text Boxes' },
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskNoBorderFront.png', name: 'No Border' },
  { src: '/img/frames/m15/transform/borderlessAlt/masks/maskBorderFront.png', name: 'Border' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/transform/borderlessAlt/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/transform/borderlessAlt/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/transform/borderlessAlt/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/transform/borderlessAlt/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/transform/borderlessAlt/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/transform/borderlessAlt/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/transform/borderlessAlt/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/m15/transform/borderlessAlt/c.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/transform/borderlessAlt/L.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/borderless/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/borderless/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/borderless/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/borderless/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/borderless/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/borderless/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/borderless/pt/a.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/borderless/pt/l.png', bounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/borderless/pt/v.png', bounds },
];

const template: FramePackTemplate = {
  id: 'TransformBorderlessAltFront',
  label: 'Borderless Alt (Front)',
  version: 'transformBorderlessAltFront',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.16, y: 0.0522, width: 0.7547, height: 0.0543, oneLine: true, color: 'white', font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, color: 'white', font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
    pt2: { name: 'Reverse PT', text: '', x: 0.086, y: 0.842, width: 0.838, height: 0.0362, size: 0.0291, oneLine: true, color: '#666', align: 'right', font: 'belerenbsc' },
  },
};

export default template;
