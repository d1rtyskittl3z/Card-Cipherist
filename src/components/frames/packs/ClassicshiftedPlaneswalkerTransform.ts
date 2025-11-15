import type { FramePackTemplate, FrameItem, Bounds } from './types';

const indicatorBounds: Bounds = { x: 0.9227, y: 0.8396, width: 0.036, height: 0.0505 };
const iconBounds: Bounds = { x: 0.0654, y: 0.0467, width: 0.052, height: 0.0372 };

const frames: FrameItem[] = [
  { name: 'Transform Icon', src: '/img/frames/custom/classicshifted/planeswalker/transform/transformIcon.png', bounds: { x: 0.0574, y: 0.041, width: 0.068, height: 0.0486 } },
  { name: 'White Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/w.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Blue Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/u.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Black Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/b.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Red Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/r.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Green Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/g.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Multicolored Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/m.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Artifact Transform Indicator', src: '/img/frames/custom/classicshifted/planeswalker/transform/a.png', bounds: indicatorBounds, complementary: 8 },
  { name: 'Frame Cutout', src: '/img/frames/custom/classicshifted/planeswalker/transform/cutout.svg', erase: true },
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
];

const template: FramePackTemplate = {
  id: 'ClassicshiftedPlaneswalkerTransform',
  label: 'Classicshifted Planeswalker Transform Addons',
  version: 'planeswalkerTransformFront',
  notice: 'Loads special planeswalker rendering script (versionPlaneswalker.js) for transform support',
  artBounds: { x: 0.068, y: 0.101, width: 0.864, height: 0.8143 },
  setSymbolBounds: { x: 0.9227, y: 0.5891, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0481, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.1334, y: 0.0372, width: 0.7332, height: 0.0548, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0867, y: 0.5625, width: 0.8267, height: 0.0548, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    ability0: { name: 'Ability 1', text: '', x: 0.18, y: 0.6239, width: 0.7467, height: 0.0972, size: 0.0353 },
    ability1: { name: 'Ability 2', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0972, size: 0.0353 },
    ability2: { name: 'Ability 3', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0972, size: 0.0353 },
    ability3: { name: 'Ability 4', text: '', x: 0.18, y: 0, width: 0.7467, height: 0, size: 0.0353 },
    loyalty: { name: 'Loyalty', text: '', x: 0.806, y: 0.902, width: 0.14, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
    reminder: { name: 'Reverse PT', text: '', x: 0.086, y: 0.842, width: 0.838, height: 0.0362, size: 0.0291, oneLine: true, color: '#666', align: 'right', font: 'belerenbsc' },
  },
};

export default template;
