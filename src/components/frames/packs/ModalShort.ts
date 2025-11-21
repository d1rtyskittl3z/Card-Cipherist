import type { FramePackTemplate, FrameItem, Mask, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/modal/short/shortModalMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/modal/modalMaskTitle.png', name: 'Title' },
  { src: '/img/frames/modal/short/shortMaskType.png', name: 'Type' },
  { src: '/img/frames/modal/short/shortModalMaskText.png', name: 'Rules' },
  { src: '/img/frames/modal/titleMDFCArrow.svg', name: 'MDFC Arrow' },
  { src: '/img/frames/modal/modalMaskReminder.png', name: 'Flipside' },
  { src: '/img/frames/modal/short/shortModalMaskBorder.png', name: 'Border' }
];

const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame (Front)', src: '/img/frames/modal/short/shortModalFrameWF.png', masks },
  { name: 'Blue Frame (Front)', src: '/img/frames/modal/short/shortModalFrameUF.png', masks },
  { name: 'Black Frame (Front)', src: '/img/frames/modal/short/shortModalFrameBF.png', masks },
  { name: 'Red Frame (Front)', src: '/img/frames/modal/short/shortModalFrameRF.png', masks },
  { name: 'Green Frame (Front)', src: '/img/frames/modal/short/shortModalFrameGF.png', masks },
  { name: 'White Frame (Back)', src: '/img/frames/modal/short/shortModalFrameWB.png', masks },
  { name: 'Blue Frame (Back)', src: '/img/frames/modal/short/shortModalFrameUB.png', masks },
  { name: 'Black Frame (Back)', src: '/img/frames/modal/short/shortModalFrameBB.png', masks },
  { name: 'Red Frame (Back)', src: '/img/frames/modal/short/shortModalFrameRB.png', masks },
  { name: 'Green Frame (Back)', src: '/img/frames/modal/short/shortModalFrameGB.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds }
];

const template: FramePackTemplate = {
  id: 'ModalShort',
  label: 'Short',
  version: 'modalShort',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.7272, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.1614, y: 0.0522, width: 0.7534, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.7024, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7647, width: 0.828, height: 0.1239, size: 0.0362 },
    flipsideType: { name: 'Flipside Type', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0234, color: 'white', oneLine: true, font: 'belerenb' },
    flipSideReminder: { name: 'Flipside Text', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0258, color: 'white', oneLine: true, align: 'right' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;