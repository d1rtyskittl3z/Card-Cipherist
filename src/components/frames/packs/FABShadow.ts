import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Frames array
const frames: FrameItem[] = [
  { name: 'Shadow Frame', src: '/img/frames/fab/talents/shadow/shadow.png', complementary: [3, 6] },
  { name: 'Shadow Brute Frame', src: '/img/frames/fab/talents/shadow/brute.png', complementary: [3, 6] },
  { name: 'Shadow Runeblade Frame', src: '/img/frames/fab/talents/shadow/runeblade.png', complementary: [3, 6] },
  { name: 'Pitch (1)', src: '/img/frames/fab/talents/1.svg' },
  { name: 'Pitch (2)', src: '/img/frames/fab/talents/2.svg' },
  { name: 'Pitch (3)', src: '/img/frames/fab/talents/3.svg' },
  { name: 'Blanks', src: '/img/frames/fab/addons/blank.svg' },
  { name: 'Spear', src: '/img/frames/fab/addons/spear.svg' },
  { name: 'Shield', src: '/img/frames/fab/addons/shield.svg' },
];

// Shared bounds
const artBounds: Bounds = { x: 0.0867, y: 0.1258, width: 0.8267, height: 0.4796 };
const setSymbolBounds: Bounds & { vertical: 'center'; horizontal: 'right' } = { x: -1, y: -1, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' };
const watermarkBounds: Bounds = { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 };

// Template
const template: FramePackTemplate = {
  id: 'FABShadow',
  label: 'Shadow Frames',
  version: 'FABShadow',
  notice: 'For Talent frames, pitch values and other icons must be placed behind card frames. To use Flesh and Blood icons in card text, use {w}, {u}, {b}, {r}, or {g}.',
  artBounds,
  setSymbolBounds,
  watermarkBounds,
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.19, y: 0.0705, width: 0.62, height: 0.0405, oneLine: true, font: 'amanda', size: 0.0405, align: 'center', manaPrefix: 'fab' },
    type: { name: 'Type', text: '', x: 0.24, y: 0.8977, width: 0.52, height: 0.0281, oneLine: true, font: 'amanda', size: 0.0281, align: 'center', manaPrefix: 'fab' },
    rules: { name: 'Rules Text', text: '', x: 0.12, y: 0.6153, width: 0.76, height: 0.28, size: 0.0281, font: 'palatino', manaPrefix: 'fab', lineSpacing: 0.2 },
    cost: { name: 'Cost', text: '', x: 0.854, y: 0.0753, width: 0.0534, height: 0.031, size: 0.031, font: 'palatino', oneLine: true, align: 'center', manaPrefix: 'fab' },
    left: { name: 'Left Stat', text: '', x: 0.162, y: 0.9124, width: 0.0534, height: 0.0358, size: 0.0358, font: 'palatino', oneLine: true, align: 'center', manaPrefix: 'fab' },
    right: { name: 'Right Stat', text: '', x: 0.7847, y: 0.9124, width: 0.0534, height: 0.0358, size: 0.0358, font: 'palatino', oneLine: true, align: 'center', manaPrefix: 'fab' },
  },
};

export default template;
