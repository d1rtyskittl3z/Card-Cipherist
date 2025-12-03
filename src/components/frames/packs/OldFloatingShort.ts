import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/old/floating/title.svg', name: 'Title' },
  { src: '/img/frames/old/floating/short/frame.svg', name: 'Frame' },
  { src: '/img/frames/old/floating/short/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/old/floating/short/rules.svg', name: 'Rules' },
];

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/old/floating/short/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/old/floating/short/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/old/floating/short/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/old/floating/short/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/old/floating/short/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/old/floating/short/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/old/floating/short/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/old/floating/short/l.png', masks },
  { name: 'White Land Frame', src: '/img/frames/old/floating/short/land/w.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/old/floating/short/land/u.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/old/floating/short/land/b.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/old/floating/short/land/r.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/old/floating/short/land/g.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/old/floating/short/c.png', masks },
  { name: 'Tombstone Icon', src: '/img/frames/old/icons/tombstone.svg', bounds: { x: 0.0687, y: 0.0491, width: 0.0338, height: 0.0329 } },
  { name: 'DCI Star', src: '/img/frames/seventh/foilStar.svg' },
  { name: 'Foil Layer', src: '/img/frames/effects/foil.png', opacity: 20, masks: [{ src: '/img/frames/seventh/foil.svg', name: 'With Star' }, { src: '/img/frames/seventh/foil2.svg', name: 'Without Star' }] },
];

// Template
const template: FramePackTemplate = {
  id: 'OldFloatingShort',
  label: 'Floating Old Border (Short)',
  version: 'oldFloatingShort',
  artBounds: { x: 0, y: 0, width: 1, height: 1 },
  setSymbolBounds: { x: 0.9, y: 0.7039, width: 0.12, height: 0.0372, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.8081, width: 0.6, height: 0.12 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 0.1067, y: 0.0539, width: 0.8174, height: 72 / 2100, oneLine: true, size: 72 / 1638, align: 'right', manaCost: true },
    title: { name: 'Title', text: '', x: 0.1134, y: 0.0481, width: 0.7734, height: 0.041, oneLine: true, font: 'goudymedieval', size: 0.041, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.1074, y: 0.6786, width: 0.7852, height: 0.0543, oneLine: true, size: 0.032, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.128, y: 0.7367, width: 0.744, height: 0.1424, size: 0.0358 },
    pt: { name: 'Power/Toughness', text: '', x: 0.8074, y: 0.9043, width: 0.1367, height: 0.0429, size: 0.0429, oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus: {elemidinfo-artist}', x: 0.1, y: 1872 / 2100, width: 0.8, height: 0.0267, oneLine: true, font: 'mplantin', size: 0.0267, align: 'center', shadowX: 0.0021, shadowY: 0.0015, color: 'white' },
  },
};

export default template;
