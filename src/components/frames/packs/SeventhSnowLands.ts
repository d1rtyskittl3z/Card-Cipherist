import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/seventh/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/seventh/regular/rules.svg', name: 'Rules' },
  { src: '/img/frames/seventh/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/seventh/regular/trim.svg', name: 'Textbox Pinline' },
  { src: '/img/frames/seventh/regular/dual.svg', name: 'Dual Land' },
  { src: '/img/frames/seventh/regular/border.svg', name: 'Border' },
];

const borderMask: Mask[] = [
  { src: '/img/frames/seventh/regular/border.svg', name: 'Border' },
];

const bounds: Bounds = { x: 0.3354, y: 0.6239, width: 0.33, height: 0.2386 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/seventh/snowlands/wl.png', masks },
  { name: 'Blue Frame', src: '/img/frames/seventh/snowlands/ul.png', masks },
  { name: 'Black Frame', src: '/img/frames/seventh/snowlands/bl.png', masks },
  { name: 'Red Frame', src: '/img/frames/seventh/snowlands/rl.png', masks },
  { name: 'Green Frame', src: '/img/frames/seventh/snowlands/gl.png', masks },
  { name: 'Land Frame', src: '/img/frames/seventh/snowlands/l.png', masks },
  { name: 'Tombstone Icon', src: '/img/frames/old/icons/tombstone.svg', bounds: { x: 0.0687, y: 0.0491, width: 0.0338, height: 0.0329 } },
  { name: 'Plains Watermark', src: '/img/frames/m15/basics/w.png', bounds },
  { name: 'Island Watermark', src: '/img/frames/m15/basics/u.png', bounds },
  { name: 'Swamp Watermark', src: '/img/frames/m15/basics/b.png', bounds },
  { name: 'Mountain Watermark', src: '/img/frames/m15/basics/r.png', bounds },
  { name: 'Forest Watermark', src: '/img/frames/m15/basics/g.png', bounds },
  { name: 'Wastes Watermark', src: '/img/frames/m15/basics/c.png', bounds },
  { name: 'DCI Star', src: '/img/frames/seventh/foilStar.svg' },
  { name: 'Foil Layer', src: '/img/frames/effects/foil.png', opacity: 20, masks: [{ src: '/img/frames/seventh/foil.svg', name: 'With Star' }, { src: '/img/frames/seventh/foil2.svg', name: 'Without Star' }] },
  { name: 'White Border', src: '/img/frames/white.png', masks: borderMask, noDefaultMask: true },
  { name: 'Silver Border', src: '/img/frames/silver.png', masks: borderMask, noDefaultMask: true },
  { name: 'Gold Border', src: '/img/frames/gold.png', masks: borderMask, noDefaultMask: true },
];

const template: FramePackTemplate = {
  id: 'SeventhSnowLands',
  label: 'Seventh Edition Snow Lands',
  version: 'seventhSnowLands',
  artBounds: { x: 0.12, y: 0.0991, width: 0.7667, height: 0.4429 },
  setSymbolBounds: { x: 0.9, y: 0.5739, width: 0.12, height: 0.0372, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.18, y: 0.64, width: 0.64, height: 0.24 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 0.1067, y: 0.0539, width: 0.8174, height: 72 / 2100, oneLine: true, size: 72 / 1638, align: 'right', manaCost: true },
    title: { name: 'Title', text: '', x: 0.1134, y: 0.0481, width: 0.7734, height: 0.041, oneLine: true, font: 'goudymedieval', size: 0.041, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.1074, y: 0.5486, width: 0.7852, height: 0.0543, oneLine: true, size: 0.032, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.128, y: 0.6067, width: 0.744, height: 0.2724, size: 0.0358 },
    pt: { name: 'Power/Toughness', text: '', x: 0.8074, y: 0.9043, width: 0.1367, height: 0.0429, size: 0.0429, oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus. {elemidinfo-artist}', x: 0.1, y: 1908 / 2100, width: 0.8, height: 0.0267, oneLine: true, font: 'mplantin', size: 0.0267, align: 'center', shadowX: 0.0021, shadowY: 0.0015, color: 'white' },
  },
};

export default template;
