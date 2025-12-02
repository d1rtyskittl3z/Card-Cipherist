import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/token/old/frame2.svg', name: 'Colored Frame' },
  { src: '/img/frames/token/old/text.svg', name: 'Rules' },
  { src: '/img/frames/token/old/frame.svg', name: 'Generic Frame' },
  { src: '/img/frames/token/old/border.svg', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/token/old/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/token/old/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/token/old/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/token/old/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/token/old/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/token/old/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/token/old/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/token/old/l.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/token/old/c.png', masks },
];

const template: FramePackTemplate = {
  id: 'TokenOld',
  label: 'Original (Old Bordered)',
  version: 'tokenOld',
  artBounds: { x: 0.1154, y: 0.1105, width: 0.7694, height: 0.51 },
  setSymbolBounds: { x: 0.8494, y: 0.6781, width: 0.12, height: 0.0372, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.18, y: 0.64, width: 0.64, height: 0.24 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.1134, y: 0.0505, width: 0.7734, height: 0.0477, oneLine: true, font: 'mplantin', size: 0.0477, color: 'white', shadowX: 0.002, shadowY: 0.0015, kerning: 0.0134, align: 'center' },
    type: { name: 'Type', text: '', x: 0.156, y: 0.6539, width: 0.688, height: 0.0543, oneLine: true, size: 0.032, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.18, y: 0.7124, width: 0.64, height: 0.14, size: 0.0358 },
    pt: { name: 'Power/Toughness', text: '', x: 0.75, y: 0.8753, width: 0.1367, height: 0.0429, size: 0.0429, oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus: {elemidinfo-artist}', x: 0.1, y: 0.8648, width: 0.8, height: 0.0267, oneLine: true, font: 'mplantin', size: 0.0267, align: 'center', shadowX: 0.0021, shadowY: 0.0015, color: 'white' },
  },
};

export default template;
