import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/new/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/new/title.png', name: 'Title' },
  { src: '/img/frames/m15/new/type.png', name: 'Type' },
  { src: '/img/frames/m15/new/rules.png', name: 'Rules' },
  { src: '/img/frames/m15/new/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/new/border.png', name: 'Border' },
];

const watermarkBounds = { x: 0.3267, y: 0.6491, width: 0.3474, height: 0.2496 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/new/snow/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/new/snow/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/new/snow/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/new/snow/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/new/snow/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/new/snow/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/new/snow/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/new/snow/l.png', masks },
  { name: 'White Land Frame', src: '/img/frames/m15/new/snow/lw.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/new/snow/lu.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/new/snow/lb.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/new/snow/lr.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/new/snow/lg.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/new/snow/lm.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/snow/gl.png', masks },
  { name: 'Plains Watermark', src: '/img/frames/snow/watermarks/w.png', bounds: watermarkBounds },
  { name: 'Island Watermark', src: '/img/frames/snow/watermarks/u.png', bounds: watermarkBounds },
  { name: 'Swamp Watermark', src: '/img/frames/snow/watermarks/b.png', bounds: watermarkBounds },
  { name: 'Mountain Watermark', src: '/img/frames/snow/watermarks/r.png', bounds: watermarkBounds },
  { name: 'Forest Watermark', src: '/img/frames/snow/watermarks/g.png', bounds: watermarkBounds },
];

const template: FramePackTemplate = {
  id: 'SnowNew',
  label: 'Snow (Kaldheim)',
  version: 'snowRegular',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 1862 / 2010, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 176 / 2814, width: 1864 / 2010, height: 71 / 2100, oneLine: true, size: 70.5 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 168 / 2010, y: 145 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 168 / 2010, y: 1588 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 1780 / 2814, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
