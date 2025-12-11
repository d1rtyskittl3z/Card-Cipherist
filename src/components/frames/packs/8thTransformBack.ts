import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for frames
const masks: Mask[] = [
  { src: '/img/frames/8th/dfc/back/pinline.png', name: 'Pinline' },
  { src: '/img/frames/8th/dfc/front/title.png', name: 'Title' },
  { src: '/img/frames/8th/type.png', name: 'Type' },
  { src: '/img/frames/8th/rules.png', name: 'Rules' },
  { src: '/img/frames/8th/dfc/back/frame.png', name: 'Frame' },
  { src: '/img/frames/8th/border.png', name: 'Border' },
];

// Masks for border-only frames
const masks2: Mask[] = [
  { src: '/img/frames/8th/border.png', name: 'Border' },
];

// Masks for color indicator pips
const pipMasks: Mask[] = [
  { src: '/img/frames/8th/dfc/ciPips/firstHalf.png', name: 'First Half' },
  { src: '/img/frames/8th/dfc/ciPips/secondHalf.png', name: 'Second Half' },
  { src: '/img/frames/8th/dfc/ciPips/firstThird.png', name: 'First Third' },
  { src: '/img/frames/8th/dfc/ciPips/secondThird.png', name: 'Second Third' },
  { src: '/img/frames/8th/dfc/ciPips/thirdThird.png', name: 'Third Third' },
];

// Shared bounds for P/T boxes
const bounds: Bounds = { x: 1461 / 2010, y: 2481 / 2814, width: 414 / 2010, height: 218 / 2814 };

// Shared bounds for transform icons
const iconBounds: Bounds = { x: 147 / 2010, y: 171 / 2814, width: 139 / 2010, height: 139 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/8th/dfc/back/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/8th/dfc/back/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/8th/dfc/back/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/8th/dfc/back/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/8th/dfc/back/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/8th/dfc/back/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/8th/dfc/back/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/8th/dfc/back/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/8th/dfc/back/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/8th/dfc/back/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/8th/dfc/back/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/8th/dfc/back/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/8th/dfc/back/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/8th/dfc/back/pt/a.png', bounds },
//   { name: 'Colorless Power/Toughness', src: '/img/frames/8th/dfc/back/pt/l.png', bounds },
  { name: 'White Color Indicator', src: '/img/frames/8th/dfc/ciPips/w.png', masks: pipMasks, complementary: 'Color Indicator Base' },
  { name: 'Blue Color Indicator', src: '/img/frames/8th/dfc/ciPips/u.png', masks: pipMasks, complementary: 'Color Indicator Base' },
  { name: 'Black Color Indicator', src: '/img/frames/8th/dfc/ciPips/b.png', masks: pipMasks, complementary: 'Color Indicator Base' },
  { name: 'Red Color Indicator', src: '/img/frames/8th/dfc/ciPips/r.png', masks: pipMasks, complementary: 'Color Indicator Base' },
  { name: 'Green Color Indicator', src: '/img/frames/8th/dfc/ciPips/g.png', masks: pipMasks, complementary: 'Color Indicator Base' },
  { name: 'Color Indicator Base', src: '/img/frames/m15/ciPips/base.png', bounds: { x: 179 / 2010, y: 1610 / 2814, width: 94 / 2010, height: 94 / 2814 } },
  { name: 'Up Arrow', src: '/img/frames/m15/transform/icons/default.png', bounds: iconBounds },
  { name: 'Down Arrow', src: '/img/frames/m15/transform/icons/downArrow.png', bounds: iconBounds },
  { name: 'Sun', src: '/img/frames/m15/transform/icons/sun.svg', bounds: iconBounds },
  { name: 'Crescent Moon', src: '/img/frames/m15/transform/icons/moon.svg', bounds: iconBounds },
  { name: 'Full Moon', src: '/img/frames/m15/transform/icons/fullmoon.svg', bounds: iconBounds },
  { name: 'Emrakul', src: '/img/frames/m15/transform/icons/emrakul.svg', bounds: iconBounds },
  { name: 'Compass', src: '/img/frames/m15/transform/icons/compass.svg', bounds: iconBounds },
  { name: 'Land', src: '/img/frames/m15/transform/icons/land.svg', bounds: iconBounds },
  { name: 'Planeswalker Ember', src: '/img/frames/m15/transform/icons/spark.svg', bounds: iconBounds },
  { name: 'Planeswalker Spark', src: '/img/frames/m15/transform/icons/planeswalker.svg', bounds: iconBounds },
  { name: 'Lesson', src: '/img/frames/m15/transform/icons/lesson.svg', bounds: iconBounds },
  { name: 'Closed Fan', src: '/img/frames/m15/transform/icons/fanClosed.svg', bounds: iconBounds },
  { name: 'Open Fan', src: '/img/frames/m15/transform/icons/fanOpen.svg', bounds: iconBounds },
  { name: 'Meld', src: '/img/frames/m15/transform/icons/hammer.png', bounds: iconBounds },
  { name: 'White Border', src: '/img/frames/white.png', masks: masks2, noDefaultMask: true },
  { name: 'Silver Border', src: '/img/frames/silver.png', masks: masks2, noDefaultMask: true },
  { name: 'Gold Border', src: '/img/frames/gold.png', masks: masks2, noDefaultMask: true },
];

const template: FramePackTemplate = {
  id: '8thTransformBack',
  label: 'Eighth Edition (Transform Back)',
  version: '8thTransformBack',
  notice: 'If you intend to add the color identity pips, we recommend that you shift your Type text to the right with "{right83}".',
  artBounds: { x: 180 / 2010, y: 341 / 2814, width: 1656 / 2010, height: 1216 / 2814 },
  setSymbolBounds: { x: 0.9079, y: 0.5886, width: 0.12, height: 0.0391, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7605, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 202 / 2814, width: 0.9147, height: 65 / 2100, oneLine: true, size: 65 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 338 / 2010, y: 0.0629, width: 1499 / 2010, height: 0.0429, oneLine: true, font: 'matrixb', size: 0.0429, color: 'white' },
    type: { name: 'Type', text: '', x: 205 / 2010, y: 1611 / 2814, width: 1601 / 2010, height: 0.0358, oneLine: true, font: 'matrixb', size: 0.0358, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 205 / 2010, y: 1779 / 2814, width: 1596 / 2010, height: 729 / 2814, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7667, y: 2514 / 2814, width: 0.1367, height: 0.0443, size: 0.0443, font: 'matrixbsc', oneLine: true, align: 'center', color: 'white' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 150 / 2010, y: 1938 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'matrixb', size: 0.0248, color: 'black', conditionalColor: 'Black Frame*Frame*!Right Half,Land Frame*Frame*!Right Half,Black Nyx Frame*Frame*!Right Half,Colorless Frame:white' },
  },
};

export default template;
