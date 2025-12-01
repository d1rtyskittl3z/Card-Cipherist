import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/neonInk/Transform/front/masks/maskCrown.png', name: 'Crown' },
  { src: '/img/frames/neonInk/masks/maskTypePinlines.png', name: 'Type Pinlines' },
  { src: '/img/frames/neonInk/Transform/front/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/neonInk/masks/maskType.png', name: 'Type' },
];

const masks2: Mask[] = [
  { src: '/img/frames/neonInk/pt/masks/maskPinlines.png', name: 'PT Pinlines' },
];

const bounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/neonInk/Transform/front/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/neonInk/Transform/front/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/neonInk/Transform/front/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/neonInk/Transform/front/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/neonInk/Transform/front/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/neonInk/Transform/front/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/neonInk/Transform/front/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/neonInk/Transform/front/c.png', masks },
  { name: 'Land Frame', src: '/img/frames/neonInk/Transform/front/L.png', masks },
  { name: 'Black Frame (Alt)', src: '/img/frames/neonInk/Transform/front/b(Alt).png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/neonInk/pt/w.png', bounds, masks: masks2 },
  { name: 'Blue Power/Toughness', src: '/img/frames/neonInk/pt/u.png', bounds, masks: masks2 },
  { name: 'Black Power/Toughness', src: '/img/frames/neonInk/pt/b.png', bounds, masks: masks2 },
  { name: 'Red Power/Toughness', src: '/img/frames/neonInk/pt/r.png', bounds, masks: masks2 },
  { name: 'Green Power/Toughness', src: '/img/frames/neonInk/pt/g.png', bounds, masks: masks2 },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/neonInk/pt/m.png', bounds, masks: masks2 },
  { name: 'Artifact Power/Toughness', src: '/img/frames/neonInk/pt/a.png', bounds, masks: masks2 },
  { name: 'Colorless Power/Toughness', src: '/img/frames/neonInk/pt/c.png', bounds, masks: masks2 },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/neonInk/pt/v.png', bounds, masks: masks2 },
  { name: 'Land Power/Toughness', src: '/img/frames/neonInk/pt/L.png', bounds, masks: masks2 },
  { name: 'Black Power/Toughness (Alt)', src: '/img/frames/neonInk/pt/b(Alt).png', bounds, masks: masks2 },
];

const template: FramePackTemplate = {
  id: 'NeonInkTransformFront',
  label: 'Neon Ink Transform (Front) (TLA)',
  version: 'neonInk',
  artBounds: { x: 0, y: 0, width: 1, height: 1 },
  setSymbolBounds: { x: 0.9213, y: 0.8570, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.6922, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: -15 / 2010, y: 197 / 2814, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 330 / 2010, y: 163 / 2814, width: 0.8292, height: 0.0543, shadowX: -0.0015, shadowY: 0.001, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type (Left)', text: '', x: 0.0854, y: 2342 / 2814, width: 0.8292, height: 0.0543, shadowX: -0.0015, shadowY: 0.001, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1600 / 2814, width: 0.828, height: 0.2455, shadowX: -0.0015, shadowY: 0.001, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 2526 / 2814, width: 0.1367, height: 0.0372, size: 0.0372, shadowX: -0.0015, shadowY: 0.001, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
