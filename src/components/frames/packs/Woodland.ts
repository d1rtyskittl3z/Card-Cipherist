import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [{ name: 'Bottom Border', src: '/img/frames/woodland/maskBottom.png' }];
const stampMasks: Mask[] = [{ name: 'Pinline', src: '/img/frames/woodland/stamp/maskPinline.png' }, { name: 'Bottom Border', src: '/img/frames/woodland/stamp/maskBottomBorder.png' }];
const ptBounds: Bounds = { x: 1390 / 2010, y: 2489 / 2814, width: 597 / 2010, height: 177 / 2814 };
const crownBounds: Bounds = { x: 0 / 2010, y: 0 / 2814, width: 2010 / 2010, height: 699 / 2814 };
const stampBounds: Bounds = { x: 866 / 2010, y: 2528 / 2814, width: 284 / 2010, height: 149 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/woodland/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/woodland/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/woodland/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/woodland/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/woodland/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/woodland/m.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/woodland/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/woodland/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/woodland/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/woodland/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/woodland/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/woodland/pt/m.png', bounds: ptBounds },
  { name: 'White Legendary Crown', src: '/img/frames/woodland/crown/w.png', bounds: crownBounds },
  { name: 'Blue Legendary Crown', src: '/img/frames/woodland/crown/u.png', bounds: crownBounds },
  { name: 'Black Legendary Crown', src: '/img/frames/woodland/crown/b.png', bounds: crownBounds },
  { name: 'Red Legendary Crown', src: '/img/frames/woodland/crown/r.png', bounds: crownBounds },
  { name: 'Green Legendary Crown', src: '/img/frames/woodland/crown/g.png', bounds: crownBounds },
  { name: 'Multicolored Legendary Crown', src: '/img/frames/woodland/crown/m.png', bounds: crownBounds },
  { name: 'White Holo Stamp', src: '/img/frames/woodland/stamp/w.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Blue Holo Stamp', src: '/img/frames/woodland/stamp/u.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Black Holo Stamp', src: '/img/frames/woodland/stamp/b.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Red Holo Stamp', src: '/img/frames/woodland/stamp/r.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Green Holo Stamp', src: '/img/frames/woodland/stamp/g.png', bounds: stampBounds, masks: stampMasks },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/woodland/stamp/m.png', bounds: stampBounds, masks: stampMasks }
];

const template: FramePackTemplate = {
  id: 'Woodland',
  label: 'Woodland (BLB)',
  version: 'woodland',
  artBounds: { x: 0 / 2010, y: 235 / 2814, width: 2010 / 2010, height: 1510 / 2814 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
