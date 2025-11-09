import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/modal/regular/reminder.svg', name: 'Flipside' },
  { src: '/img/frames/modal/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/modal/regular/title.svg', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/modal/regular/textbox.svg', name: 'Rules' },
  { src: '/img/frames/modal/titleMDFCArrow.svg', name: 'MDFC Arrow' },
  { src: '/img/frames/modal/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/modal/regular/border.svg', name: 'Border' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame (Front)', src: '/img/frames/modal/regular/w.png', masks },
  { name: 'Blue Frame (Front)', src: '/img/frames/modal/regular/u.png', masks },
  { name: 'Black Frame (Front)', src: '/img/frames/modal/regular/b.png', masks },
  { name: 'Red Frame (Front)', src: '/img/frames/modal/regular/r.png', masks },
  { name: 'Green Frame (Front)', src: '/img/frames/modal/regular/g.png', masks },
  { name: 'Multicolored Frame (Front)', src: '/img/frames/modal/regular/m.png', masks },
  { name: 'Artifact Frame (Front)', src: '/img/frames/modal/regular/a.png', masks },
  { name: 'Land Frame (Front)', src: '/img/frames/modal/regular/l.png', masks },
  { name: 'Vehicle Frame (Front)', src: '/img/frames/modal/regular/v.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/regular/m15PTV.png', bounds },

  { name: 'White Frame (Back)', src: '/img/frames/modal/regular/back/w.png', masks },
  { name: 'Blue Frame (Back)', src: '/img/frames/modal/regular/back/u.png', masks },
  { name: 'Black Frame (Back)', src: '/img/frames/modal/regular/back/b.png', masks },
  { name: 'Red Frame (Back)', src: '/img/frames/modal/regular/back/r.png', masks },
  { name: 'Green Frame (Back)', src: '/img/frames/modal/regular/back/g.png', masks },
  { name: 'Multicolored Frame (Back)', src: '/img/frames/modal/regular/back/m.png', masks },
  { name: 'Artifact Frame (Back)', src: '/img/frames/modal/regular/back/a.png', masks },
  { name: 'Land Frame (Back)', src: '/img/frames/modal/regular/back/l.png', masks },
  { name: 'Vehicle Frame (Back)', src: '/img/frames/modal/regular/back/v.png', masks },

  { name: 'White Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptW.png', bounds },
  { name: 'Blue Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptU.png', bounds },
  { name: 'Black Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptB.png', bounds },
  { name: 'Red Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptR.png', bounds },
  { name: 'Green Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptG.png', bounds },
  { name: 'Multicolored Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptM.png', bounds },
  { name: 'Artifact Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptA.png', bounds },
  { name: 'Vehicle Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptV.png', bounds },

  { name: 'White Land Frame (Front)', src: '/img/frames/modal/regular/wl.png', masks },
  { name: 'Blue Land Frame (Front)', src: '/img/frames/modal/regular/ul.png', masks },
  { name: 'Black Land Frame (Front)', src: '/img/frames/modal/regular/bl.png', masks },
  { name: 'Red Land Frame (Front)', src: '/img/frames/modal/regular/rl.png', masks },
  { name: 'Green Land Frame (Front)', src: '/img/frames/modal/regular/gl.png', masks },
  { name: 'Multicolored Land Frame (Front)', src: '/img/frames/modal/regular/ml.png', masks },

  { name: 'White Land Frame (Back)', src: '/img/frames/modal/regular/back/wl.png', masks },
  { name: 'Blue Land Frame (Back)', src: '/img/frames/modal/regular/back/ul.png', masks },
  { name: 'Black Land Frame (Back)', src: '/img/frames/modal/regular/back/bl.png', masks },
  { name: 'Red Land Frame (Back)', src: '/img/frames/modal/regular/back/rl.png', masks },
  { name: 'Green Land Frame (Back)', src: '/img/frames/modal/regular/back/gl.png', masks },
  { name: 'Multicolored Land Frame (Back)', src: '/img/frames/modal/regular/back/ml.png', masks },
];

const template: FramePackTemplate = {
  id: 'ModalRegular',
  label: 'Regular',
  version: 'modalRegular',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.1614, y: 0.0522, width: 0.7534, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, conditionalColor: '(Back):white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, conditionalColor: '(Back):white' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    flipsideType: { name: 'Flipside Type', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0234, color: 'white', oneLine: true, font: 'belerenb', conditionalColor: '(Back):black' },
    flipSideReminder: { name: 'Flipside Text', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0258, color: 'white', oneLine: true, align: 'right', conditionalColor: '(Back):black' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', conditionalColor: '(Back),Vehicle Power/Toughness:white' },
  },
};

export default template;
