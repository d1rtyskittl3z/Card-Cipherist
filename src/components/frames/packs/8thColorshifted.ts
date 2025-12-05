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

// Shared bounds for P/T boxes
const bounds: Bounds = { x: 0.7234, y: 0.881, width: 0.204, height: 0.0772 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/8th/colorshifted/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/8th/colorshifted/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/8th/colorshifted/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/8th/colorshifted/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/8th/colorshifted/g.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/8th/colorshifted/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/colorshifted/wpt.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/colorshifted/upt.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/colorshifted/bpt.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/colorshifted/rpt.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/colorshifted/gpt.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/colorshifted/apt.png', bounds },
];

const template: FramePackTemplate = {
  id: '8thColorshifted',
  label: 'Colorshifted',
  version: '8thColorshifted',
  artBounds: { x: 180 / 2010, y: 341 / 2814, width: 1656 / 2010, height: 1216 / 2814 },
  setSymbolBounds: { x: 0.9079, y: 0.5886, width: 0.12, height: 0.0391, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7605, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 202 / 2814, width: 0.9147, height: 65 / 2100, oneLine: true, size: 65 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.09, y: 0.0629, width: 0.824, height: 0.0429, oneLine: true, font: 'matrixb', size: 0.0429, color: 'white', shadowX: -0.0021, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 205 / 2010, y: 1611 / 2814, width: 1601 / 2010, height: 0.0358, oneLine: true, font: 'matrixb', size: 0.0358, color: 'white', shadowX: -0.0021, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 205 / 2010, y: 1779 / 2814, width: 1596 / 2010, height: 729 / 2814, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7667, y: 0.8953, width: 0.1367, height: 0.0443, size: 0.0443, font: 'matrixbsc', oneLine: true, align: 'center', color: 'white', shadowX: -0.0021, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 150 / 2010, y: 1938 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'matrixb', size: 0.0248, color: 'black', conditionalColor: 'Black Frame*Frame*!Right Half,Land Frame*Frame*!Right Half,Black Nyx Frame*Frame*!Right Half,Colorless Frame:white' },
  },
};

export default template;
