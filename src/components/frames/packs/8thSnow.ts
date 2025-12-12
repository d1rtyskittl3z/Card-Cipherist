import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for frames
const masks: Mask[] = [
  { src: '/img/frames/8th/pinline.png', name: 'Pinline' },
  { src: '/img/frames/8th/title.png', name: 'Title' },
  { src: '/img/frames/8th/type.png', name: 'Type' },
  { src: '/img/frames/8th/rules.png', name: 'Rules' },
  { src: '/img/frames/8th/frame.png', name: 'Frame' },
  { src: '/img/frames/8th/border.png', name: 'Border' },
];

// Masks for border-only frames
const masks2: Mask[] = [
  { src: '/img/frames/8th/border.png', name: 'Border' },
];

// Shared bounds for P/T boxes
const bounds: Bounds = { x: 1461 / 2010, y: 2481 / 2814, width: 414 / 2010, height: 218 / 2814 };

// Shared bounds for most snow watermarks
const wmBounds: Bounds = { x: 710 / 2010, y: 1830 / 2814, width: 634 / 2010, height: 638 / 2814 };

// Bounds for colorless watermark (slightly different x position)
const wmBoundsColorless: Bounds = { x: 687 / 2010, y: 1830 / 2814, width: 634 / 2010, height: 638 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/8th/snow/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/8th/snow/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/8th/snow/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/8th/snow/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/8th/snow/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/8th/snow/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/8th/snow/a.png', masks },
//   { name: 'Colorless Frame', src: '/img/frames/8th/snow/c.png', masks },
  { name: 'Land Frame', src: '/img/frames/8th/snow/l.png', masks },
  { name: 'White Land Frame', src: '/img/frames/8th/snow/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/8th/snow/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/8th/snow/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/8th/snow/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/8th/snow/gl.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/8th/snow/ml.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/8th/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/8th/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/8th/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/8th/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/8th/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/8th/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/8th/pt/a.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/8th/pt/l.png', bounds },
  { name: 'White Watermark', src: '/img/frames/snow/watermarks/w.png', bounds: wmBounds },
  { name: 'Blue Watermark', src: '/img/frames/snow/watermarks/u.png', bounds: wmBounds },
  { name: 'Black Watermark', src: '/img/frames/snow/watermarks/b.png', bounds: wmBounds },
  { name: 'Red Watermark', src: '/img/frames/snow/watermarks/r.png', bounds: wmBounds },
  { name: 'Green Watermark', src: '/img/frames/snow/watermarks/g.png', bounds: wmBounds },
  { name: 'Colorless Watermark', src: '/img/frames/snow/watermarks/c.png', bounds: wmBoundsColorless },
  { name: 'White Border', src: '/img/frames/white.png', masks: masks2, noDefaultMask: true },
  { name: 'Silver Border', src: '/img/frames/silver.png', masks: masks2, noDefaultMask: true },
  { name: 'Gold Border', src: '/img/frames/gold.png', masks: masks2, noDefaultMask: true },
];

const template: FramePackTemplate = {
  id: '8thSnow',
  label: 'Eighth Edition Snow',
  version: '8thSnow',
  artBounds: { x: 180 / 2010, y: 341 / 2814, width: 1656 / 2010, height: 1216 / 2814 },
  setSymbolBounds: { x: 0.9079, y: 0.5886, width: 0.12, height: 0.0391, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7605, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 202 / 2814, width: 0.9147, height: 65 / 2100, oneLine: true, size: 65 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.09, y: 0.0629, width: 0.824, height: 0.0429, oneLine: true, font: 'matrixb', size: 0.0429 },
    type: { name: 'Type', text: '', x: 205 / 2010, y: 1611 / 2814, width: 1601 / 2010, height: 0.0358, oneLine: true, font: 'matrixb', size: 0.0358 },
    rules: { name: 'Rules Text', text: '', x: 205 / 2010, y: 1779 / 2814, width: 1596 / 2010, height: 729 / 2814, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7667, y: 2514 / 2814, width: 0.1367, height: 0.0443, size: 0.0443, font: 'matrixbsc', oneLine: true, align: 'center' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 150 / 2010, y: 1938 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'matrixb', size: 0.0248, color: 'black', conditionalColor: 'Black Frame*!Right Half,Land Frame*!Right Half,Black Nyx Frame*!Right Half,Colorless Frame:white' },
  },
};

export default template;
