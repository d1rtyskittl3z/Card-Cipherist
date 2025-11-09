import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/stellarSights/borderlessStellarSights/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/stellarSights/borderlessStellarSights/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/stellarSights/borderlessStellarSights/masks/maskTextBoxes.png', name: 'Text Boxes' },
  { src: '/img/frames/stellarSights/borderlessStellarSights/masks/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/stellarSights/borderlessStellarSights/masks/maskNoBorder.png', name: 'No Border' },
  { src: '/img/frames/stellarSights/borderlessStellarSights/masks/maskBorder.png', name: 'Border' },
];

const masks2: Mask[] = [
  { src: '/img/frames/stellarSights/borderlessStellarSights/pt/masks/maskOuterFrame.png', name: 'Outer Frame' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/stellarSights/borderlessStellarSights/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/stellarSights/borderlessStellarSights/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/stellarSights/borderlessStellarSights/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/stellarSights/borderlessStellarSights/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/stellarSights/borderlessStellarSights/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/stellarSights/borderlessStellarSights/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/stellarSights/borderlessStellarSights/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/stellarSights/borderlessStellarSights/L.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/w.png', masks: masks2 },
  { name: 'Blue Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/u.png', masks: masks2 },
  { name: 'Black Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/b.png', masks: masks2 },
  { name: 'Red Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/r.png', masks: masks2 },
  { name: 'Green Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/g.png', masks: masks2 },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/m.png', masks: masks2 },
  { name: 'Artifact Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/a.png', masks: masks2 },
  { name: 'Land Power/Toughness', src: '/img/frames/stellarSights/borderlessStellarSights/pt/L.png', masks: masks2 },
];

const template: FramePackTemplate = {
  id: 'BorderlessStellarSights',
  label: 'Borderless Stellar Sights (EOS)',
  version: 'borderless',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.6288, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7912, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 20 / 2010, y: 0.0693, width: 0.919, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', outlineWidth: 0.01, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 145 / 2010, y: 1701 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'Magic-Fomalhaut', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 185 / 2010, y: 1862 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 185 / 2010, y: 1985 / 2814, width: 0.813, height: 0.21, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
