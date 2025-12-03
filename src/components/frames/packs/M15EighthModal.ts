import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for M15 Eighth Modal frames
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

// Power/Toughness bounds
const ptBounds: Bounds = { x: 0.7573, y: 1901 / 2100, width: 0.188, height: 0.0733 };

// Available frames
const frames: FrameItem[] = [
  { name: 'White Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/w.png', masks },
  { name: 'Blue Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/u.png', masks },
  { name: 'Black Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/b.png', masks },
  { name: 'Red Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/r.png', masks },
  { name: 'Green Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/g.png', masks },
  { name: 'Multicolored Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/m.png', masks },
  { name: 'Artifact Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/a.png', masks },
  { name: 'Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/l.png', masks },
  { name: 'Vehicle Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/v.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/regular/m15PTC.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/regular/m15PTV.png', bounds: ptBounds },

  { name: 'White Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/w.png', masks },
  { name: 'Blue Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/u.png', masks },
  { name: 'Black Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/b.png', masks },
  { name: 'Red Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/r.png', masks },
  { name: 'Green Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/g.png', masks },
  { name: 'Multicolored Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/m.png', masks },
  { name: 'Artifact Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/a.png', masks },
  { name: 'Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/l.png', masks },
  { name: 'Vehicle Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/v.png', masks },

  { name: 'White Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptA.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness (Back)', src: '/img/frames/m15/transform/regular/ptV.png', bounds: ptBounds },

  { name: 'White Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/wl.png', masks },
  { name: 'Blue Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/ul.png', masks },
  { name: 'Black Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/bl.png', masks },
  { name: 'Red Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/rl.png', masks },
  { name: 'Green Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/gl.png', masks },
  { name: 'Multicolored Land Frame (Front)', src: '/img/frames/custom/m15-eighth/mdfc/front/regular/ml.png', masks },

  { name: 'White Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/wl.png', masks },
  { name: 'Blue Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/ul.png', masks },
  { name: 'Black Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/bl.png', masks },
  { name: 'Red Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/rl.png', masks },
  { name: 'Green Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/gl.png', masks },
  { name: 'Multicolored Land Frame (Back)', src: '/img/frames/custom/m15-eighth/mdfc/back/regular/ml.png', masks },
];

const template: FramePackTemplate = {
  id: 'M15EighthModal',
  label: 'Regular (MDFC)',
  version: 'M15EighthModal',
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
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 1937 / 2100, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', conditionalColor: '(Back),Vehicle Power/Toughness:white' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE {elemidinfo-artist}', x: 0.0647, y: 1973 / 2100, width: 0.8107, height: 0.0248, oneLine: true, font: 'belerenbsc', size: 0.02095, color: 'black', conditionalColor: 'M15 Border,Nyx White Frame,Nyx Blue Frame,Nyx Black Frame,Nyx Red Frame,Nyx Green Frame,Nyx Multicolored Frame,Nyx Artifact Frame,Black Frame,Land Frame,Colorless Frame,Vehicle Frame,White Land Frame,Blue Land Frame,Black Land Frame,Red Land Frame,Green Land Frame,Multicolored Land Frame:white' },
  },
  brush: '/img/manaSymbols/artistbrush.svg',
};

export default template;
