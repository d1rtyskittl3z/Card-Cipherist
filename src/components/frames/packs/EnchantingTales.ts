import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [];

// Power/Toughness bounds
const bounds: Bounds = { x: 1535/2010, y: 2458/2814, width: 373/2010, height: 206/2814 };

// Holo stamp bounds
const stampBounds: Bounds = { x: 890/2010, y: 2548/2814, width: 229/2010, height: 132/2814 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/enchantingTales/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/enchantingTales/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/enchantingTales/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/enchantingTales/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/enchantingTales/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/enchantingTales/m.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/enchantingTales/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/enchantingTales/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/enchantingTales/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/enchantingTales/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/enchantingTales/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/enchantingTales/pt/m.png', bounds },

  { name: 'White Holo Stamp', src: '/img/frames/enchantingTales/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/enchantingTales/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/enchantingTales/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/enchantingTales/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/enchantingTales/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/enchantingTales/stamp/m.png', bounds: stampBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'EnchantingTales',
  label: 'Enchanting Tales (WOT)',
  version: 'enchantingTales',
  artBounds: { x: 0, y: 111/2100, width: 1, height: 1821/2100 },
  setSymbolBounds: { x: 0.9213, y: 1246/2100, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 126/2100, width: 1390/1500, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 104/2100, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 1193/2100, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1316/2100, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 1605/2010, y: 2538/2814, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
