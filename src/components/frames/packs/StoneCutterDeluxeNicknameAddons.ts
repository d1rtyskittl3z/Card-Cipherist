import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/w.png', bounds },
  { name: 'Blue Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/u.png', bounds },
  { name: 'Black Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/b.png', bounds },
  { name: 'Red Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/r.png', bounds },
  { name: 'Green Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/g.png', bounds },
  { name: 'Multicolored Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/m.png', bounds },
  { name: 'Colorless Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/c.png', bounds },
  { name: 'Land Nickname', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/nickname/L.png', bounds },
];

const template: FramePackTemplate = {
  id: 'StoneCutterDeluxeNicknameAddons',
  label: 'StoneCutter Nickname Addons',
  version: 'stoneCutterDeluxe',
  artBounds: { x: 0.08, y: 0.0954, width: 0.84, height: 0.4653 },
  setSymbolBounds: { x: 0.9213, y: 0.5958, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0497, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    nickname: { name: 'Nickname', text: '', x: 0.0854, y: 0.0372, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    title: { name: 'Title', text: '', x: 0.14, y: 0.1035, width: 0.72, height: 0.0243, oneLine: true, font: 'mplantini', size: 0.0229, color: 'white', shadowX: 0.0014, shadowY: 0.001, align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.571, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6329, width: 0.828, height: 0.2905, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
};

export default template;
