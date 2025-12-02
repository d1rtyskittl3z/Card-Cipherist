import type { FramePackTemplate, Mask, FrameItem, Bounds, StretchConfig } from './types';

// Shared masks for main frames
const masks: Mask[] = [
  { src: '/img/frames/mysticalArchive/jp/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/mysticalArchive/jp/rightHalf.svg', name: 'Right Half' },
];

// Shared masks for crowns (right half only)
const masks2: Mask[] = [
  { src: '/img/frames/mysticalArchive/jp/rightHalf.svg', name: 'Right Half' },
];

// Stretch configuration for adjustable title bar and type bar
const stretch: StretchConfig[] = [
  { name: 'adjustable', targets: [0, 1, 6, 7, 8, 10, 11, 16, 17, 18, 20, 21, 22, 27, 28], change: [0, 0] },
  { name: 'typePinline', targets: [0, 1, 2, 3, 4, 5, 6, 12, 14, 18, 19, 20, 21, 22, 23], change: [0, 0] },
  { name: 'type', targets: [0, 1, 2], change: [0, 0] },
];

// Shared bounds for set symbol
const bounds: Bounds = { x: 0.8027, y: 0.5381, width: 0.116, height: 0.0829 };

// Shared bounds for power/toughness boxes
const bounds2: Bounds = { x: 0.7767, y: 0.8881, width: 0.1687, height: 0.0591 };

const frames: FrameItem[] = [
  // Main frames with stretch
  { name: 'White Frame', src: '/img/frames/mysticalArchive/jp/w.svg', stretch, masks },
  { name: 'Blue Frame', src: '/img/frames/mysticalArchive/jp/u.svg', stretch, masks },
  { name: 'Black Frame', src: '/img/frames/mysticalArchive/jp/b.svg', stretch, masks },
  { name: 'Red Frame', src: '/img/frames/mysticalArchive/jp/r.svg', stretch, masks },
  { name: 'Green Frame', src: '/img/frames/mysticalArchive/jp/g.svg', stretch, masks },
  { name: 'Multicolored Frame', src: '/img/frames/mysticalArchive/jp/m.svg', stretch, masks },
  { name: 'Artifact Frame', src: '/img/frames/mysticalArchive/jp/a.svg', stretch, masks },
  { name: 'Land Frame', src: '/img/frames/mysticalArchive/jp/l.svg', stretch, masks },

  // Set symbol rarity frames
  { name: 'Uncommon', src: '/img/frames/mysticalArchive/jp/uncommon.png', bounds },
  { name: 'Rare', src: '/img/frames/mysticalArchive/jp/rare.png', bounds },
  { name: 'Mythic', src: '/img/frames/mysticalArchive/jp/mythic.png', bounds },

  // Power/Toughness frames with complementary cutout
  { name: 'White Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/w.svg', bounds: bounds2, complementary: 19 },
  { name: 'Blue Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/u.svg', bounds: bounds2, complementary: 19 },
  { name: 'Black Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/b.svg', bounds: bounds2, complementary: 19 },
  { name: 'Red Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/r.svg', bounds: bounds2, complementary: 19 },
  { name: 'Green Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/g.svg', bounds: bounds2, complementary: 19 },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/m.svg', bounds: bounds2, complementary: 19 },
  { name: 'Artifact Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/a.svg', bounds: bounds2, complementary: 19 },
  { name: 'Land Power/Toughness', src: '/img/frames/mysticalArchive/jp/pt/l.svg', bounds: bounds2, complementary: 19 },

  // Power/Toughness cutout (erase mode)
  { name: 'Power/Toughness Cutout', src: '/img/frames/mysticalArchive/jp/pt/cutout.svg', bounds: bounds2, erase: true },

  // Crown frames
  { name: 'White Crown', src: '/img/frames/mysticalArchive/jp/crowns/w.svg', masks: masks2 },
  { name: 'Blue Crown', src: '/img/frames/mysticalArchive/jp/crowns/u.svg', masks: masks2 },
  { name: 'Black Crown', src: '/img/frames/mysticalArchive/jp/crowns/b.svg', masks: masks2 },
  { name: 'Red Crown', src: '/img/frames/mysticalArchive/jp/crowns/r.svg', masks: masks2 },
  { name: 'Green Crown', src: '/img/frames/mysticalArchive/jp/crowns/g.svg', masks: masks2 },
  { name: 'Multicolored Crown', src: '/img/frames/mysticalArchive/jp/crowns/m.svg', masks: masks2 },
  { name: 'Artifact Crown', src: '/img/frames/mysticalArchive/jp/crowns/a.svg', masks: masks2 },
  { name: 'Land Crown', src: '/img/frames/mysticalArchive/jp/crowns/l.svg', masks: masks2 },
];

const template: FramePackTemplate = {
  id: 'MysticalArchiveJP',
  label: 'Japanese Mystical Archive (STA)',
  version: 'mysticalArchiveJP',
  // notice: 'When you load the Japanese Mystical Archive frame version, a "Japanese Mystical Archive" tab will appear. This tab allows you to control the height of the title bar and width of the type bar. For a better Japanese font, use {fontjapanese-title} or {fontjapanese}.',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9286 },
  setSymbolBounds: { x: 0.8607, y: 0.5796, width: 0.116, height: 0.0829, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7705, width: 0.75, height: 0.2362 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0505, width: 0.9414, height: 100 / 2100, oneLine: true, size: 100 / 1638, align: 'right', manaCost: true, manaSpacing: -0.0015, manaPrefix: 'majp' },
    title: { name: 'Title', text: '', x: 0.09, y: 0.0715, width: 0.1194, height: 0.1286, font: 'belerenb', size: 0.0305, align: 'center', vertical: true, color: 'white' },
    type: { name: 'Type', text: '', x: 0.08, y: 0.5548, width: 0.2867, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, align: 'center' },
    rules: { name: 'Rules Text', text: '', x: 0.0934, y: 0.6248, width: 0.8134, height: 0.2934, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
