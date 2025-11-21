import type { FramePackTemplate, FrameItem, Mask, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/modal/shortNickname/maskTitle.png', name: 'Title' }
];

const bounds: Bounds = { x: 0.0247, y: 0.0405, width: 0.926, height: 0.1053 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/modal/shortNickname/titleW.png', masks, bounds },
  { name: 'Blue Frame', src: '/img/frames/modal/shortNickname/titleU.png', masks, bounds },
  { name: 'Black Frame', src: '/img/frames/modal/shortNickname/titleB.png', masks, bounds },
  { name: 'Red Frame', src: '/img/frames/modal/shortNickname/titleR.png', masks, bounds },
  { name: 'Green Frame', src: '/img/frames/modal/shortNickname/titleG.png', masks, bounds }
];

const template: FramePackTemplate = {
  id: 'ModalShortNickname',
  label: 'Short-Nickname',
  version: 'modalShortNickname',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.7272, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    nickname: { name: 'Nickname', text: '', x: 0.1614, y: 0.0522, width: 0.7534, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    title: { name: 'Title', text: '', x: 0.14, y: 0.1129, width: 0.72, height: 0.0243, oneLine: true, font: 'mplantini', size: 0.0229, color: 'white', shadowX: 0.0014, shadowY: 0.001, align: 'center' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.7024, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7647, width: 0.828, height: 0.1239, size: 0.0362 },
    flipsideType: { name: 'Flipside Type', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0234, color: 'white', oneLine: true, font: 'belerenb' },
    flipSideReminder: { name: 'Flipside Text', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0258, color: 'white', oneLine: true, align: 'right' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;