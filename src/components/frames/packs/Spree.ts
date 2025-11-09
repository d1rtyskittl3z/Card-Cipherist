import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/spree/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/spree/title.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/spree/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/spree/border.png', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/spree/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/spree/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/spree/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/spree/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/spree/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/spree/m.png', masks },
  { name: 'White Snow Frame', src: '/img/frames/m15/spree/snow/w.png', masks },
  { name: 'Blue Snow Frame', src: '/img/frames/m15/spree/snow/u.png', masks },
  { name: 'Black Snow Frame', src: '/img/frames/m15/spree/snow/b.png', masks },
  { name: 'Red Snow Frame', src: '/img/frames/m15/spree/snow/r.png', masks },
  { name: 'Green Snow Frame', src: '/img/frames/m15/spree/snow/g.png', masks },
  { name: 'Multicolored Snow Frame', src: '/img/frames/m15/spree/snow/m.png', masks },
];

const template: FramePackTemplate = {
  id: 'Spree',
  label: 'Spree (Outlaws of Thunder Junction)',
  version: 'm15Spree',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
