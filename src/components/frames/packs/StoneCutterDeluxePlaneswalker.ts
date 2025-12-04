import type { FramePackTemplate, FrameItem, Mask, Bounds } from './types';

// Shared masks for main planeswalker frames
const masks: Mask[] = [
  { src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/masks/maskPinlines.png', name: 'Pinlines' },
  { src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/masks/maskBorderless.png', name: 'Borderless' },
  { src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/masks/maskBorder.png', name: 'Border' },
];

// Shared masks for crowns
const masks2: Mask[] = [
  { src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/maskPinlines.png', name: 'Pinlines' },
];

// Shared bounds
const bounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/m.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/c.png', masks },
  { name: 'Gold Inlay', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/gold.png' },
  { name: 'Gold Nyx', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/nyx.png' },

  { name: 'White Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/w.png', bounds },
  { name: 'Blue Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/u.png', bounds },
  { name: 'Black Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/b.png', bounds },
  { name: 'Red Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/r.png', bounds },
  { name: 'Green Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/g.png', bounds },
  { name: 'Multicolored Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/m.png', bounds },
  { name: 'Colorless Loyalty Badge', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/planeswalker/loyalty/c.png', bounds },

  { name: 'White Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/w.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Blue Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/u.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Black Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/b.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Red Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/r.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Green Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/g.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Multicolored Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/m.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Colorless Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/c.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Land Crown', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/L.png', bounds, masks: masks2, complementary: 26 },
  { name: 'Legend Crown Gold Inlay', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/gold.png', bounds },
  { name: 'Legend Crown Nyx Inlay', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/nyx.png', bounds },

  { name: 'Legend Crown Border Cover', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/blackBar.png', bounds },
];

const DEFAULT_ABILITIES: [string, string, string, string] = ['+1', '0', '-1', ''];
const DEFAULT_ADJUST: [number, number, number, number] = [0, 0, 0, 0];
const DEFAULT_HEIGHTS: [number, number, number, number] = [0.0972, 0.0972, 0.0972, 0];

const template: FramePackTemplate = {
  id: 'StoneCutterDeluxePlaneswalker',
  label: 'StoneCutter Planeswalker',
  version: 'planeswalkerRegular',
  artBounds: { x: 0.068, y: 0.101, width: 0.864, height: 0.8143 },
  setSymbolBounds: { x: 0.9227, y: 0.5891, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right', },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  planeswalker: { x: 0.1167, width: 0.8094, defaultAbilities: DEFAULT_ABILITIES, defaultAbilityAdjust: DEFAULT_ADJUST, defaultHeights: DEFAULT_HEIGHTS, },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0497, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, },
    title: { name: 'Title', text: '', x: 0.0867, y: 0.0372, width: 0.8267, height: 0.0548, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015, },
    type: { name: 'Type', text: '', x: 0.0867, y: 0.5625, width: 0.8267, height: 0.0548, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015, },
    ability0: { name: 'Ability 1', text: '', x: 0.18, y: 0.6239, width: 0.7467, height: 0.0972, size: 0.0353, },
    ability1: { name: 'Ability 2', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0972, size: 0.0353, },
    ability2: { name: 'Ability 3', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0972, size: 0.0353, },
    ability3: { name: 'Ability 4', text: '', x: 0.18, y: 0, width: 0.7467, height: 0, size: 0.0353, },
    loyalty: { name: 'Loyalty', text: '', x: 0.806, y: 0.902, width: 0.14, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', },
  },
};

export default template;
