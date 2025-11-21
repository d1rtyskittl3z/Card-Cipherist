import type { FramePackTemplate, FrameItem, Mask, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/modal/regular/reminder.svg', name: 'Flipside' },
  { src: '/img/frames/modal/nickname/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/modal/modalMaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/modal/regular/textbox.svg', name: 'Rules' },
  { src: '/img/frames/modal/titleMDFCArrow.svg', name: 'MDFC Arrow' },
  { src: '/img/frames/modal/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/modal/short/shortModalMaskBorder.png', name: 'Border' }
];

const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame (Front)', src: '/img/frames/modal/nickname/wf.png', masks },
  { name: 'Blue Frame (Front)', src: '/img/frames/modal/nickname/uf.png', masks },
  { name: 'Black Frame (Front)', src: '/img/frames/modal/nickname/bf.png', masks },
  { name: 'Red Frame (Front)', src: '/img/frames/modal/nickname/rf.png', masks },
  { name: 'Green Frame (Front)', src: '/img/frames/modal/nickname/gf.png', masks },
  { name: 'Multicolored Frame (Front)', src: '/img/frames/modal/nickname/mf.png', masks },
  { name: 'Artifact Frame (Front)', src: '/img/frames/modal/nickname/af.png', masks },
  { name: 'White Frame (Back)', src: '/img/frames/modal/nickname/wb.png', masks },
  { name: 'Blue Frame (Back)', src: '/img/frames/modal/nickname/ub.png', masks },
  { name: 'Black Frame (Back)', src: '/img/frames/modal/nickname/bb.png', masks },
  { name: 'Red Frame (Back)', src: '/img/frames/modal/nickname/rb.png', masks },
  { name: 'Green Frame (Back)', src: '/img/frames/modal/nickname/gb.png', masks },
  { name: 'Multicolored Frame (Back)', src: '/img/frames/modal/nickname/mb.png', masks },
  { name: 'Artifact Frame (Back)', src: '/img/frames/modal/nickname/ab.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds }
];

const template: FramePackTemplate = {
  id: 'ModalNickname',
  label: 'Nickname',
  version: 'modalNickname',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    nickname: { name: 'Nickname', text: '', x: 0.1614, y: 0.0522, width: 0.7534, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    title: { name: 'Title', text: '', x: 0.14, y: 0.1129, width: 0.72, height: 0.0243, oneLine: true, font: 'mplantini', size: 0.0229, color: 'white', shadowX: 0.0014, shadowY: 0.001, align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2572, size: 0.0362 },
    flipsideType: { name: 'Flipside Type', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0234, color: 'white', oneLine: true, font: 'belerenb' },
    flipSideReminder: { name: 'Flipside Text', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0258, color: 'white', oneLine: true, align: 'right' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;