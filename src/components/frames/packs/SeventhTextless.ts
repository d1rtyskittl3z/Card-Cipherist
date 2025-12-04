import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/seventh/textless/seventhTextlessMaskPinline.png', name: 'Pinline' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameA.png', masks },
  { name: 'Land Frame', src: '/img/frames/seventh/textless/seventhTextlessFrameL.png', masks },
  { name: 'Tombstone Icon', src: '/img/frames/old/icons/tombstone.svg', bounds: { x: 0.0687, y: 0.0491, width: 0.0338, height: 0.0329 } },
  { name: 'Textbox', src: '/img/frames/seventh/textless/textbox.svg', bounds: { x: 0.116, y: 0.5896, width: 0.768, height: 0.2858 } },
];

const template: FramePackTemplate = {
  id: 'SeventhTextless',
  label: 'Textless Seventh',
  version: 'seventhTextless',
  artBounds: { x: 0.116, y: 0.0977, width: 0.768, height: 0.7772 },
  setSymbolBounds: { x: 0.8914, y: 0.9224, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 0.108, y: 0.0486, width: 0.8147, height: 72 / 2100, oneLine: true, size: 72 / 1638, align: 'right', manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.108, y: 0.0448, width: 0.784, height: 0.0405, oneLine: true, font: 'goudymedieval', size: 0.0405, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.128, y: 0.6429, width: 0.744, height: 0.2381, size: 0.0358, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.8, y: 0.8981, width: 0.1367, height: 0.0453, size: 0.0453, oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus: {elemidinfo-artist}', x: 0.0614, y: 0.8915, width: 0.8774, height: 0.0281, oneLine: true, font: 'mplantin', size: 0.0281, align: 'center', shadowX: 0.0014, shadowY: 0.001, color: 'white' },
  },
};

export default template;
