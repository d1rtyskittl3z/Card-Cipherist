import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/storybook/mul/adventure/pinline.png', name: 'Pinline' },
  { src: '/img/frames/storybook/mul/adventure/rules-left.png', name: 'Rules (Left)' }
];

// Power/Toughness bounds
const bounds: Bounds = { x: 1165/1500, y: 1860/2100, width: 266/1500, height: 134/2100 };

// Legend crown bounds
const crownBounds: Bounds = { x: 80/1500, y: 41/2100, width: 1341/1500, height: 73/2100 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/storybook/mul/adventure/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/storybook/mul/adventure/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/storybook/mul/adventure/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/storybook/mul/adventure/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/storybook/mul/adventure/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/storybook/mul/adventure/m.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/storybook/mul/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/storybook/mul/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/storybook/mul/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/storybook/mul/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/storybook/mul/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/storybook/mul/pt/m.png', bounds },

  { name: 'White Legend Crown', src: '/img/frames/storybook/mul/crowns/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/storybook/mul/crowns/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/storybook/mul/crowns/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/storybook/mul/crowns/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/storybook/mul/crowns/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/storybook/mul/crowns/m.png', bounds: crownBounds },

  { name: 'Holo Stamp', src: '/img/frames/storybook/holo.png', bounds: { x: 679/1500, y: 0.9129, width: 0.0987, height: 0.0386 } }
];

// Template
const template: FramePackTemplate = {
  id: 'StorybookWOE',
  label: 'Eldraine Storybooks: Adventures (WOE)',
  version: 'adventure',
  artBounds: { x: 54/1500, y: 62/2100, width: 1398/1500, height: 1157/2100 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.72, y: 0.7681, width: 0.3867, height: 0.2358 },
  replacementMasks: { 'Right Half': 'img/frames/storybook/mul/rightHalf.png' },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5667, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text (Right)', text: '', x: 1069/2010, y: 1829/2814, width: 767/2010, height: 724/2814, size: 0.0353 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7934, y: 0.9029, width: 0.14, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    mana2: { name: 'Adventure Mana Cost', text: '', x: 0.0814, y: 0.6391, width: 0.4, height: 60/2100, oneLine: true, size: 60/1638, color: 'white', shadowX: -0.001, shadowY: 0.0029, align: 'right', manaCost: true },
    title2: { name: 'Adventure Title', text: '', x: 0.0814, y: 0.6391, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', oneLine: true, font: 'belerenb' },
    type2: { name: 'Adventure Type', text: '', x: 0.0814, y: 0.6839, width: 0.4, height: 0.0296, size: 0.0296, color: 'white', oneLine: true, font: 'belerenb' },
    rules2: { name: 'Rules Text', text: '', x: 172/2010, y: 2088/2814, width: 813/2010, height: 447/2814, size: 0.0353 }
  }
};

export default template;
