import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const bounds = { x: 1555 / 2010, y: 2492 / 2814, width: 353 / 2010, height: 179 / 2814 };
const crownBounds = { x: 0, y: 0, width: 1, height: 341 / 2814 };
const stampBounds = { x: 873 / 2010, y: 2539 / 2814, width: 264 / 2010, height: 131 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/doubleFeature/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/doubleFeature/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/doubleFeature/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/doubleFeature/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/doubleFeature/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/doubleFeature/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/doubleFeature/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/doubleFeature/l.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/doubleFeature/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/doubleFeature/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/doubleFeature/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/doubleFeature/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/doubleFeature/pt/g.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/doubleFeature/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/doubleFeature/pt/a.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/doubleFeature/pt/l.png', bounds },

  { name: 'White Land Frame', src: '/img/frames/doubleFeature/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/doubleFeature/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/doubleFeature/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/doubleFeature/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/doubleFeature/gl.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/doubleFeature/ml.png', masks },

  { name: 'White Legend Crown', src: '/img/frames/doubleFeature/crowns/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/doubleFeature/crowns/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/doubleFeature/crowns/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/doubleFeature/crowns/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/doubleFeature/crowns/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/doubleFeature/crowns/m.png', bounds: crownBounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/doubleFeature/crowns/a.png', bounds: crownBounds },
  { name: 'Land Legend Crown', src: '/img/frames/doubleFeature/crowns/l.png', bounds: crownBounds },

  { name: 'Holo Stamp', src: '/img/frames/doubleFeature/stamps/stamp.png', bounds: stampBounds },
  { name: 'White Land Holo Stamp', src: '/img/frames/doubleFeature/stamps/w.png', bounds: stampBounds },
  { name: 'Blue Land Holo Stamp', src: '/img/frames/doubleFeature/stamps/u.png', bounds: stampBounds },
  { name: 'Black Land Holo Stamp', src: '/img/frames/doubleFeature/stamps/b.png', bounds: stampBounds },
  { name: 'Red Land Holo Stamp', src: '/img/frames/doubleFeature/stamps/r.png', bounds: stampBounds },
  { name: 'Green Land Holo Stamp', src: '/img/frames/doubleFeature/stamps/g.png', bounds: stampBounds },
  { name: 'Multicolored Land Holo Stamp', src: '/img/frames/doubleFeature/stamps/m.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'DoubleFeature',
  label: 'Double Feature (DBL)',
  version: 'm15DBL',
  artBounds: { x: 155 / 2010, y: 319 / 2814, width: 1700 / 2010, height: 1242 / 2814 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
