import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/custom/classicshifted/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/custom/classicshifted/maskText.png', name: 'Textbox' },
  { src: '/img/frames/custom/classicshifted/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/custom/classicshifted/dual.svg', name: 'Dual Land Pinline' },
];

const basicsBounds: Bounds = { x: 0.3267, y: 0.6491, width: 0.3474, height: 0.2496 };
const crownBounds: Bounds = { x: 0.0267, y: 0.0134, width: 0.9467, height: 0.1005 };

const frames: FrameItem[] = [
  { name: 'Land Frame', src: '/img/frames/custom/classicshifted/l.png', masks },
  { name: 'White Land Frame', src: '/img/frames/custom/classicshifted/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/custom/classicshifted/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/custom/classicshifted/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/custom/classicshifted/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/custom/classicshifted/gl.png', masks },
  { name: 'The Dark Land Frame', src: '/img/frames/custom/classicshifted/lands/theDark.png', masks },
  { name: 'Alliances Land Frame', src: '/img/frames/custom/classicshifted/lands/alliances.png', masks },
  { name: 'Mirage Land Frame', src: '/img/frames/custom/classicshifted/lands/mirage.png', masks },
  { name: 'Ice Age Land Frame', src: '/img/frames/custom/classicshifted/lands/iceAge.png', masks },
  { name: 'Homelands Land Frame', src: '/img/frames/custom/classicshifted/lands/homelands.png', masks },
  { name: 'Fallen Empires Land Frame', src: '/img/frames/custom/classicshifted/lands/fallenEmpires.png', masks },
  { name: 'Arabian Nights Land Frame', src: '/img/frames/custom/classicshifted/lands/arabianNights.png', masks },
  { name: 'Antiquities Land Frame', src: '/img/frames/custom/classicshifted/lands/antiquities.png', masks },
  { name: 'Plains Watermark', src: '/img/frames/m15/basics/w.png', bounds: basicsBounds },
  { name: 'Island Watermark', src: '/img/frames/m15/basics/u.png', bounds: basicsBounds },
  { name: 'Swamp Watermark', src: '/img/frames/m15/basics/b.png', bounds: basicsBounds },
  { name: 'Mountain Watermark', src: '/img/frames/m15/basics/r.png', bounds: basicsBounds },
  { name: 'Forest Watermark', src: '/img/frames/m15/basics/g.png', bounds: basicsBounds },
  { name: 'Wastes Watermark', src: '/img/frames/m15/basics/c.png', bounds: basicsBounds },
  { name: 'Snow Overlay', src: '/img/frames/custom/classicshifted/snow.png' },
  { name: 'The Dark Legend Crown', src: '/img/frames/custom/classicshifted/crowns/theDark.png', bounds: crownBounds, complementary: 29 },
  { name: 'Alliances Legend Crown', src: '/img/frames/custom/classicshifted/crowns/alliances.png', bounds: crownBounds, complementary: 29 },
  { name: 'Mirage Legend Crown', src: '/img/frames/custom/classicshifted/crowns/mirage.png', bounds: crownBounds, complementary: 29 },
  { name: 'Ice Age Legend Crown', src: '/img/frames/custom/classicshifted/crowns/iceAge.png', bounds: crownBounds, complementary: 29 },
  { name: 'Homelands Legend Crown', src: '/img/frames/custom/classicshifted/crowns/homelands.png', bounds: crownBounds, complementary: 29 },
  { name: 'Fallen Empires Legend Crown', src: '/img/frames/custom/classicshifted/crowns/fallenEmpires.png', bounds: crownBounds, complementary: 29 },
  { name: 'Arabian Nights Legend Crown', src: '/img/frames/custom/classicshifted/crowns/arabianNights.png', bounds: crownBounds, complementary: 29 },
  { name: 'Antiquities Legend Crown', src: '/img/frames/custom/classicshifted/crowns/antiquities.png', bounds: crownBounds, complementary: 29 },
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.021 } },
];

const template: FramePackTemplate = {
  id: 'ClassicshiftedLands',
  label: 'Classicshifted Lands',
  version: 'classicshiftedLands',
  artBounds: { x: 0.08, y: 0.0954, width: 0.84, height: 0.4653 },
  setSymbolBounds: { x: 0.9213, y: 0.5958, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0462, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0372, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.571, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6329, width: 0.828, height: 0.2905, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
};

export default template;
