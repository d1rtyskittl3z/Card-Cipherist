import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 157 / 2010, y: 362 / 2814, width: 1697 / 2010, height: 1152 / 2814 };
const crownBounds: Bounds = { x: 41 / 2010, y: 39 / 2814, width: 1794 / 2010, height: 143 / 2814 };
const stampBounds: Bounds = { x: 849 / 2010, y: 2513 / 2814, width: 312 / 2010, height: 188 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/pipboy/w.png' },
  { name: 'Blue Frame', src: '/img/frames/pipboy/u.png' },
  { name: 'Black Frame', src: '/img/frames/pipboy/b.png' },
  { name: 'Red Frame', src: '/img/frames/pipboy/r.png' },
  { name: 'Green Frame', src: '/img/frames/pipboy/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/pipboy/m.png' },
  { name: 'Artifact Frame', src: '/img/frames/pipboy/a.png' },
  { name: 'Power/Toughness Box', src: '/img/frames/pipboy/pt.png', bounds: { x: 1515 / 2010, y: 2034 / 2814, width: 461 / 2010, height: 639 / 2814 } },
  { name: 'White Legend Crown', src: '/img/frames/pipboy/crown/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/pipboy/crown/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/pipboy/crown/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/pipboy/crown/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/pipboy/crown/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/pipboy/crown/m.png', bounds: crownBounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/pipboy/crown/a.png', bounds: crownBounds },
  { name: 'Gold Holo Stamp', src: '/img/frames/pipboy/stamp.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/pipboy/stampGray.png', bounds: stampBounds },
  { name: 'Nickname Overlay', src: '/img/frames/pipboy/nickname.png', complementary: 18 },
  { name: 'Screen Cover', src: '/img/frames/pipboy/cover.png', erase: true },
];

const template: FramePackTemplate = {
  id: 'Pipboy',
  label: 'Pip-Boy (PIP)',
  version: 'pipboy',
  artBounds: bounds,
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  replacementMasks: { 'Right Half': '/img/frames/pipboy/maskRight.png' },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'ocra', size: 89 / 2814, color: 'white' },
    nickname: { name: 'Nickname', text: '', x: 0.14, y: 335 / 2814, width: 0.72, height: 50 / 2814, oneLine: true, font: 'neosansitalic', size: 61 / 2814, color: 'white', align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'neosans', size: 82 / 2814, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 207 / 2010, y: 1815 / 2814, width: 1596 / 2010, height: 729 / 2814, size: 76 / 2814, font: 'neosans', color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'ocra', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
