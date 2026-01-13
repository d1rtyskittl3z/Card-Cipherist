import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/storybook/pinline.png', name: 'Pinline' }
];

// Shared bounds
const bounds: Bounds = { x: 0.7414, y: 0.8839, width: 0.2134, height: 0.0681 };
const holoBounds: Bounds = { x: 0.4507, y: 0.9129, width: 0.0987, height: 0.0386 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/storybook/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/storybook/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/storybook/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/storybook/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/storybook/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/storybook/m.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/storybook/c.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/storybook/wpt.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/storybook/upt.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/storybook/bpt.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/storybook/rpt.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/storybook/gpt.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/storybook/mpt.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/storybook/cpt.png', bounds },
  { name: 'Holo Stamp', src: '/img/frames/storybook/holo.png', bounds: holoBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'Storybook',
  label: 'Eldraine Storybooks: Adventures (ELD)',
  version: 'storyBookAdventure',
  artBounds: { x: 0.0334, y: 0.0258, width: 0.9367, height: 0.5596 },
  setSymbolBounds: { x: 0.8854, y: 0.5929, width: 0.0494, height: 0.0353, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.72, y: 0.7681, width: 0.3867, height: 0.2358 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.1454, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.2134, y: 0.5667, width: 0.5732, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, align: 'center' },
    rules: { name: 'Rules Text (Right)', text: '', x: 0.5267, y: 0.65, width: 0.3867, height: 0.2358, size: 0.0353 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7934, y: 0.9029, width: 0.14, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    mana2: { name: 'Adventure Mana Cost', text: '', x: 0.0814, y: 0.6391, width: 0.4, height: 60/2100, oneLine: true, size: 60/1638, color: 'white', shadowX: -0.001, shadowY: 0.0029, align: 'right', manaCost: true },
    title2: { name: 'Adventure Title', text: '', x: 0.0814, y: 0.6391, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', shadowX: 0.0014, shadowY: 0.001, oneLine: true, font: 'belerenb' },
    type2: { name: 'Adventure Type', text: '', x: 0.0814, y: 0.6839, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', shadowX: 0.0014, shadowY: 0.001, oneLine: true, font: 'belerenb' },
    rules2: { name: 'Rules Text', text: '', x: 0.0854, y: 0.7358, width: 0.3947, height: 0.15, size: 0.0353 }
  }
};

export default template;
