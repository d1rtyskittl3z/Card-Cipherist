import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/vault/masks/maskPinlines.png', name: 'Pinlines' },
  { src: '/img/frames/vault/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/vault/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/vault/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/vault/masks/maskTextBoxes.png', name: 'Text Boxes' },
  { src: '/img/frames/vault/masks/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/vault/masks/maskBorderless.png', name: 'Borderless' },
  { src: '/img/frames/vault/masks/maskBottomFrame.png', name: 'Bottom Frame' },
  { src: '/img/frames/vault/masks/maskBottomFrameNoBorer.png', name: 'Bottom Frame No Borer' },
  { src: '/img/frames/vault/masks/maskNoBorder.png', name: 'No Border' },
  { src: '/img/frames/vault/masks/maskBorder.png', name: 'Border' }
];
const crownBounds: Bounds = { x: -88 / 2010, y: -80 / 2814, width: 2187 / 2010, height: 2975 / 2814 };
const stampBounds: Bounds = { x: 835 / 2010, y: 2507 / 2814, width: 341 / 2010, height: 151 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/vault/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/vault/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/vault/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/vault/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/vault/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/vault/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/vault/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/vault/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/vault/pt/w.png' },
  { name: 'Blue Power/Toughness', src: '/img/frames/vault/pt/u.png' },
  { name: 'Black Power/Toughness', src: '/img/frames/vault/pt/b.png' },
  { name: 'Red Power/Toughness', src: '/img/frames/vault/pt/r.png' },
  { name: 'Green Power/Toughness', src: '/img/frames/vault/pt/g.png' },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/vault/pt/m.png' },
  { name: 'Artifact Power/Toughness', src: '/img/frames/vault/pt/a.png' },
  { name: 'Land Power/Toughness', src: '/img/frames/vault/pt/l.png' },
  { name: 'White Legendary Crown', src: '/img/frames/vault/crown/w.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Blue Legendary Crown', src: '/img/frames/vault/crown/u.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Black Legendary Crown', src: '/img/frames/vault/crown/b.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Red Legendary Crown', src: '/img/frames/vault/crown/r.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Green Legendary Crown', src: '/img/frames/vault/crown/g.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Multicolored Legendary Crown', src: '/img/frames/vault/crown/m.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Artifact Legendary Crown', src: '/img/frames/vault/crown/a.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Land Legendary Crown', src: '/img/frames/vault/crown/l.png', bounds: crownBounds, ogBounds: { x: 0, y: 0, width: 1, height: 1 } },
  { name: 'Plain Holo Stamp', src: '/img/frames/m15/holoStamps/stamp.png', bounds: { x: 917 / 2010, y: 2563 / 2814, width: 0.0894, height: 0.0320 } },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/holoStamps/gray.png', bounds: { x: 917 / 2010, y: 2563 / 2814, width: 0.0894, height: 0.0320 } },
  { name: 'White Holo Stamp', src: '/img/frames/vault/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/vault/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/vault/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/vault/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/vault/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/vault/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/vault/stamp/a.png', bounds: stampBounds },
  { name: 'Land Holo Stamp', src: '/img/frames/vault/stamp/l.png', bounds: stampBounds }
];

const template: FramePackTemplate = {
  id: 'Vault',
  label: 'Vault (BIG)',
  version: 'vault',
  artBounds: { x: 0, y: 334 / 2814, width: 1, height: 1194 / 2814 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: -15 / 2010, y: 190 / 2814, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 159 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 1592 / 2010, y: 2529 / 2814, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
