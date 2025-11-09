import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/textless/magicFest/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/textless/magicFest/frame.png', name: 'Frame' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/textless/magicFest/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/textless/magicFest/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/textless/magicFest/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/textless/magicFest/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/textless/magicFest/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/textless/magicFest/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/textless/magicFest/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/textless/magicFest/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTC.png', bounds },
];

const template: FramePackTemplate = {
  id: 'MagicFest',
  label: 'Magic Fest Promos',
  version: 'magicFest',
  artBounds: { x: 0.062, y: 0.0496, width: 0.876, height: 0.8639 },
  setSymbolBounds: { x: 0.5, y: 0.9524, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'black' },
  },
};

export default template;
