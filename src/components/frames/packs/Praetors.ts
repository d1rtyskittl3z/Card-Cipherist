import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/praetors/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/praetors/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/praetors/text.svg', name: 'Rules Text' },
  { src: '/img/frames/m15/praetors/border.png', name: 'Border' }
];

// Shared bounds
const boundsPT: Bounds = { x: 0.746, y: 0.8858, width: 0.212, height: 0.0772 };
const boundsHolo: Bounds = { x: 0.418, y: 0.9, width: 0.164, height: 0.0491 };
const boundsCrown: Bounds = { x: 0, y: 0, width: 1, height: 100 / 2100 };
const boundsTextNoWm: Bounds = { x: 125 / 1500, y: 1325 / 2100, width: 1250 / 1500, height: 602 / 2100 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/praetors/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/praetors/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/praetors/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/praetors/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/praetors/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/praetors/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/praetors/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/praetors/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/praetors/wpt.png', bounds: boundsPT },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/praetors/upt.png', bounds: boundsPT },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/praetors/bpt.png', bounds: boundsPT },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/praetors/rpt.png', bounds: boundsPT },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/praetors/gpt.png', bounds: boundsPT },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/praetors/mpt.png', bounds: boundsPT },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/praetors/apt.png', bounds: boundsPT },
  { name: 'Land Power/Toughness', src: '/img/frames/m15/praetors/lpt.png', bounds: boundsPT },
  { name: 'White Legendary Crown', src: '/img/frames/m15/praetors/wCrown.png', bounds: boundsCrown },
  { name: 'Blue Legendary Crown', src: '/img/frames/m15/praetors/uCrown.png', bounds: boundsCrown },
  { name: 'Black Legendary Crown', src: '/img/frames/m15/praetors/bCrown.png', bounds: boundsCrown },
  { name: 'Red Legendary Crown', src: '/img/frames/m15/praetors/rCrown.png', bounds: boundsCrown },
  { name: 'Green Legendary Crown', src: '/img/frames/m15/praetors/gCrown.png', bounds: boundsCrown },
  { name: 'Multicolored Legendary Crown', src: '/img/frames/m15/praetors/mCrown.png', bounds: boundsCrown },
  { name: 'Artifact Legendary Crown', src: '/img/frames/m15/praetors/aCrown.png', bounds: boundsCrown },
  { name: 'Land Legendary Crown', src: '/img/frames/m15/praetors/lCrown.png', bounds: boundsCrown },
  { name: 'White Holo Stamp', src: '/img/frames/m15/praetors/holo/w.png', bounds: boundsHolo },
  { name: 'Blue Holo Stamp', src: '/img/frames/m15/praetors/holo/u.png', bounds: boundsHolo },
  { name: 'Black Holo Stamp', src: '/img/frames/m15/praetors/holo/b.png', bounds: boundsHolo },
  { name: 'Red Holo Stamp', src: '/img/frames/m15/praetors/holo/r.png', bounds: boundsHolo },
  { name: 'Green Holo Stamp', src: '/img/frames/m15/praetors/holo/g.png', bounds: boundsHolo },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/m15/praetors/holo/m.png', bounds: boundsHolo },
  { name: 'Artifact Holo Stamp', src: '/img/frames/m15/praetors/holo/a.png', bounds: boundsHolo },
  { name: 'Land Holo Stamp', src: '/img/frames/m15/praetors/holo/l.png', bounds: boundsHolo },
  { name: 'White Rules (No Watermark)', src: '/img/frames/m15/praetors/wTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Blue Rules (No Watermark)', src: '/img/frames/m15/praetors/uTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Black Rules (No Watermark)', src: '/img/frames/m15/praetors/bTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Red Rules (No Watermark)', src: '/img/frames/m15/praetors/rTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Green Rules (No Watermark)', src: '/img/frames/m15/praetors/gTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Multicolored Rules (No Watermark)', src: '/img/frames/m15/praetors/mTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Artifact Rules (No Watermark)', src: '/img/frames/m15/praetors/aTextNoWatermark.png', bounds: boundsTextNoWm },
  { name: 'Land Rules (No Watermark)', src: '/img/frames/m15/praetors/lTextNoWatermark.png', bounds: boundsTextNoWm }
];

// Template
const template: FramePackTemplate = {
  id: 'Praetors',
  label: 'Phyrexian',
  version: 'm15Praetors',
  artBounds: { x: 0.0767, y: 0.1105, width: 0.8476, height: 0.4486 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.1047, y: 0.6303, width: 0.7907, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
