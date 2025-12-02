import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/textless/unhinged/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/textless/unhinged/title.svg', name: 'Title' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/textless/unhinged/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/textless/unhinged/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/textless/unhinged/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/textless/unhinged/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/textless/unhinged/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/textless/unhinged/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/textless/unhinged/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/textless/unhinged/c.png', masks },
];

const template: FramePackTemplate = {
  id: 'Unhinged',
  label: 'Unhinged Basics (UNH)',
  version: 'unhinged',
  artBounds: { x: 0.0734, y: 0.0524, width: 0.8534, height: 0.8405 },
  setSymbolBounds: { x: 0.9287, y: 0.9339, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.38, y: 0.0248, width: 0.24, height: 0.0453, oneLine: true, size: 0.0453, align: 'center', font: 'matrixb' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '{ptshift-0.1667,0}\uFFEE {elemidinfo-artist}', x: 0.08, y: 1898 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'matrixb', size: 0.0248, color: 'white', shadowX: 0.0007, shadowY: 0.0005 },
  },
};

export default template;
