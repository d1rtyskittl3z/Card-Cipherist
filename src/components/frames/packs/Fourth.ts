import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/old/fourth/w.png' },
  { name: 'Blue Frame', src: '/img/frames/old/fourth/u.png' },
  { name: 'Black Frame', src: '/img/frames/old/fourth/b.png' },
  { name: 'Red Frame', src: '/img/frames/old/fourth/r.png' },
  { name: 'Green Frame', src: '/img/frames/old/fourth/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/old/fourth/m.png' },
  { name: 'Artifact Frame', src: '/img/frames/old/fourth/a.png' },
  { name: 'Land Frame', src: '/img/frames/old/fourth/l.png' },
  { name: 'Black Border', src: '/img/frames/old/fourth/borderBlack.png' },
  { name: 'White Border', src: '/img/frames/old/fourth/borderWhite.png' },
];

const template: FramePackTemplate = {
  id: 'Fourth',
  label: 'Fourth Edition',
  version: 'fourth',
  artBounds: { x: 0.1034, y: 0.0886, width: 0.794, height: 0.4543 },
  setSymbolBounds: { x: 0.9, y: 0.5758, width: 0.12, height: 0.0362, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.18, y: 0.64, width: 0.64, height: 0.24 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 0.1067, y: 0.0362, width: 0.8174, height: 72 / 2100, oneLine: true, size: 72 / 1638, align: 'right', manaCost: true },
    title: { name: 'Title', text: '', x: 0.0827, y: 0.031, width: 0.8347, height: 0.041, oneLine: true, font: 'goudymedieval', size: 0.041, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0827, y: 0.5486, width: 0.8347, height: 0.0543, oneLine: true, size: 0.032, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.128, y: 0.6067, width: 0.744, height: 0.2724, size: 0.0358, horizontal: 'center' },
    pt: { name: 'Power/Toughness', text: '', x: 0.82, y: 0.9058, width: 0.1367, height: 0.0429, size: 0.0429, oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus. {elemidinfo-artist}', x: 0.1, y: 1894 / 2100, width: 0.8, height: 0.0267, oneLine: true, font: 'mplantin', size: 0.0267, shadowX: 0.0021, shadowY: 0.0015, color: 'white', shadowColor: 'black' },
  },
};

export default template;
