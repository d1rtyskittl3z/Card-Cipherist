import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Frames array
const frames: FrameItem[] = [
  { name: 'Aria', src: '/img/frames/fab/heroes/aria.png' },
  { name: 'Demonastery', src: '/img/frames/fab/heroes/demonastery.png' },
  { name: 'Metrix', src: '/img/frames/fab/heroes/metrix.png' },
  { name: 'Misteria', src: '/img/frames/fab/heroes/misteria.png' },
  { name: 'Savage Lands', src: '/img/frames/fab/heroes/savageLands.png' },
  { name: 'Solana', src: '/img/frames/fab/heroes/solana.png' },
  { name: 'Solana (Special)', src: '/img/frames/fab/heroes/solana2.png' },
  { name: 'The Pits', src: '/img/frames/fab/heroes/thePits.png' },
  { name: 'Volcor', src: '/img/frames/fab/heroes/volcor.png' },
];

// Shared bounds
const artBounds: Bounds = { x: 0.0867, y: 0.1258, width: 0.8267, height: 0.4796 };
const setSymbolBounds: Bounds & { vertical: 'center'; horizontal: 'right' } = { x: -1, y: -1, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' };
const watermarkBounds: Bounds = { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 };

// Template
const template: FramePackTemplate = {
  id: 'FABHeroes',
  label: 'Hero Frames',
  version: 'FABHeroes',
  notice: 'To use Flesh and Blood icons in card text, use {w}, {u}, {b}, {r}, or {g}. This may change in the future.',
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
