import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/split/fuse/top.png', name: 'Top Half' },
  { src: '/img/frames/m15/split/fuse/bottom.png', name: 'Bottom Half' },
  { src:'/img/frames/m15/split/maskTopRight.png', name:'Top Right'}, 
  { src:'/img/frames/m15/split/maskBottomLeft.png', name:'Bottom Left'},
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/split/fuse/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/split/fuse/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/split/fuse/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/split/fuse/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/split/fuse/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/split/fuse/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/split/fuse/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/split/fuse/l.png', masks },
];

const template: FramePackTemplate = {
  id: 'Fuse',
  label: 'Fuse Cards',
  version: 'fuse',
  artBounds: { x: 0.0558, y: 0.1034, width: 0.5700, height: 0.2886, rotation: -90 },
  artBounds2: { x: 0.0558, y: 0.5599, width: 0.5700, height: 0.2886, rotation: -90 },
  setSymbolBounds: { x: 1855 / 2010, y: 2707 / 2814, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost (Left)', text: '', x: 0.0847, y: 0.8943, width: 0.5367, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, rotation: -90 },
    title: { name: 'Title (Left)', text: '', x: 0.072, y: 0.8943, width: 0.5367, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: -90 },
    type: { name: 'Type (Left)', text: '', x: 0.55, y: 0.8943, width: 0.5367, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, rotation: -90 },
    rules: { name: 'Rules Text (Left)', text: '', x: 0.6087, y: 0.8896, width: 0.5174, height: 0.1986, size: 0.0362, rotation: -90 },
    pt: { name: 'PT Text (Left)', text: '', x: 0.8440, y: 0.8296, width: 0.828, height: 0.12, size: 0.0286, font: 'belerenbsc', oneLine: true, align: 'center', rotation: -90 },
    mana2: { name: 'Mana Cost (Right)', text: '', x: 0.0847, y: 0.4381, width: 0.5367, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, rotation: -90 },
    title2: { name: 'Title (Right)', text: '', x: 0.072, y: 0.4381, width: 0.5367, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: -90 },
    type2: { name: 'Type (Right)', text: '', x: 0.55, y: 0.4381, width: 0.5367, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, rotation: -90 },
    rules2: { name: 'Rules Text (Right)', text: '', x: 0.6087, y: 0.4334, width: 0.5174, height: 0.1986, size: 0.0362, rotation: -90 },
    pt2: { name: 'PT Text (Right)', text: '', x: 0.8440, y: 0.3734, width: 0.828, height: 0.12, size: 0.0286, font: 'belerenbsc', oneLine: true, align: 'center', rotation: -90 },
    reminder: { name: 'Reminder', text: 'Fuse {i}(You may cast one or both halves of this card from your hand.){/i}', x: 0.9067, y: 0.8943, width: 1.1754, height: 0.0286, oneLine: true, size: 0.0286, rotation: -90, align: 'center' },
  },
};

export default template;
