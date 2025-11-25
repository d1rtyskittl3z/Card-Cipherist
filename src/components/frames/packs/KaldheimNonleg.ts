import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/kaldheim/nonleg/details.png', name: 'Details' },
  { src: '/img/frames/kaldheim/nonleg/pinline.png', name: 'Pinline' },
  { src: '/img/frames/kaldheim/nonleg/title.png', name: 'Title' },
  { src: '/img/frames/kaldheim/maskType.png', name: 'Type' },
  { src: '/img/frames/kaldheim/maskTextbox.png', name: 'Rules' },
  { src: '/img/frames/kaldheim/nonleg/border.png', name: 'Border' },
  { src: '/img/frames/kaldheim/nonleg/frame.png', name: 'Frame' }
];

const ptMasks: Mask[] = [
  { src: '/img/frames/kaldheim/maskPTCorners.png', name: 'Corners' },
  { src: '/img/frames/kaldheim/maskPTCornersRight.png', name: 'Corners (right)' }
];

// Shared bounds
const bounds: Bounds = { x: 0.7627, y: 0.8853, width: 0.188, height: 0.0724 };
const iconBounds: Bounds = { x: 0.02, y: 0.03, width: 0.098, height: 0.0591 };
const reminderBounds: Bounds = { x: 0.03, y: 0.8886, width: 0.438, height: 0.0429 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/kaldheim/nonleg/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/kaldheim/nonleg/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/kaldheim/nonleg/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/kaldheim/nonleg/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/kaldheim/nonleg/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/kaldheim/nonleg/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/kaldheim/nonleg/a.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/kaldheim/ptW.png', bounds, masks: ptMasks },
  { name: 'Blue Power/Toughness', src: '/img/frames/kaldheim/ptU.png', bounds, masks: ptMasks },
  { name: 'Black Power/Toughness', src: '/img/frames/kaldheim/ptB.png', bounds, masks: ptMasks },
  { name: 'Red Power/Toughness', src: '/img/frames/kaldheim/ptR.png', bounds, masks: ptMasks },
  { name: 'Green Power/Toughness', src: '/img/frames/kaldheim/ptG.png', bounds, masks: ptMasks },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/kaldheim/ptM.png', bounds, masks: ptMasks },
  { name: 'Artifact Power/Toughness', src: '/img/frames/kaldheim/ptA.png', bounds, masks: ptMasks },
  { name: 'White Icon (Front)', src: '/img/frames/kaldheim/modal/wft.png', bounds: iconBounds },
  { name: 'Blue Icon (Front)', src: '/img/frames/kaldheim/modal/uft.png', bounds: iconBounds },
  { name: 'Black Icon (Front)', src: '/img/frames/kaldheim/modal/bft.png', bounds: iconBounds },
  { name: 'Red Icon (Front)', src: '/img/frames/kaldheim/modal/rft.png', bounds: iconBounds },
  { name: 'Green Icon (Front)', src: '/img/frames/kaldheim/modal/gft.png', bounds: iconBounds },
  { name: 'Multicolored Icon (Front)', src: '/img/frames/kaldheim/modal/mft.png', bounds: iconBounds },
  { name: 'Artifact Icon (Front)', src: '/img/frames/kaldheim/modal/aft.png', bounds: reminderBounds },
  { name: 'White Reminder (Front)', src: '/img/frames/kaldheim/modal/wfb.png', bounds: reminderBounds },
  { name: 'Blue Reminder (Front)', src: '/img/frames/kaldheim/modal/ufb.png', bounds: reminderBounds },
  { name: 'Black Reminder (Front)', src: '/img/frames/kaldheim/modal/bfb.png', bounds: reminderBounds },
  { name: 'Red Reminder (Front)', src: '/img/frames/kaldheim/modal/rfb.png', bounds: reminderBounds },
  { name: 'Green Reminder (Front)', src: '/img/frames/kaldheim/modal/gfb.png', bounds: reminderBounds },
  { name: 'Multicolored Reminder (Front)', src: '/img/frames/kaldheim/modal/mfb.png', bounds: reminderBounds },
  { name: 'Artifact Reminder (Front)', src: '/img/frames/kaldheim/modal/afb.png', bounds: reminderBounds },
  { name: 'White Icon (Back)', src: '/img/frames/kaldheim/modal/wbt.png', bounds: iconBounds },
  { name: 'Blue Icon (Back)', src: '/img/frames/kaldheim/modal/ubt.png', bounds: iconBounds },
  { name: 'Black Icon (Back)', src: '/img/frames/kaldheim/modal/bbt.png', bounds: iconBounds },
  { name: 'Red Icon (Back)', src: '/img/frames/kaldheim/modal/rbt.png', bounds: iconBounds },
  { name: 'Green Icon (Back)', src: '/img/frames/kaldheim/modal/gbt.png', bounds: iconBounds },
  { name: 'Multicolored Icon (Back)', src: '/img/frames/kaldheim/modal/mbt.png', bounds: iconBounds },
  { name: 'Artifact Icon (Back)', src: '/img/frames/kaldheim/modal/abt.png', bounds: reminderBounds },
  { name: 'White Reminder (Back)', src: '/img/frames/kaldheim/modal/wbb.png', bounds: reminderBounds },
  { name: 'Blue Reminder (Back)', src: '/img/frames/kaldheim/modal/ubb.png', bounds: reminderBounds },
  { name: 'Black Reminder (Back)', src: '/img/frames/kaldheim/modal/bbb.png', bounds: reminderBounds },
  { name: 'Red Reminder (Back)', src: '/img/frames/kaldheim/modal/rbb.png', bounds: reminderBounds },
  { name: 'Green Reminder (Back)', src: '/img/frames/kaldheim/modal/gbb.png', bounds: reminderBounds },
  { name: 'Multicolored Reminder (Back)', src: '/img/frames/kaldheim/modal/mbb.png', bounds: reminderBounds },
  { name: 'Artifact Reminder (Back)', src: '/img/frames/kaldheim/modal/abb.png', bounds: reminderBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'KaldheimNonleg',
  label: 'Nonlegendary Kaldheim (KHM)',
  version: 'm15Regular',
  notice: 'If you make MDFC cards with this frame, we recommend adding "{right90}" before your card title.',
  artBounds: { x: 0.1047, y: 0.0929, width: 0.7907, height: 0.4848 },
  setSymbolBounds: { x: 0.9213, y: 0.6081, width: 0.12, height: 0.04, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0462, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0667, y: 0.0362, width: 0.8667, height: 0.0543, oneLine: true, font: 'belerenb', color: 'white', size: 0.0381, shadowX: 0.0027, shadowY: 0.002 },
    type: { name: 'Type', text: '', x: 0.0734, y: 0.5829, width: 0.8534, height: 0.0543, oneLine: true, font: 'belerenb', color: 'white', size: 0.0324, shadowX: 0.0027, shadowY: 0.002 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6405, width: 0.828, height: 0.2739, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7954, y: 0.9029, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    flipsideType: { name: 'Flipside Type', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0234, color: 'white', oneLine: true, font: 'belerenb', shadowX: 0.0014, shadowY: 0.001 },
    flipSideReminder: { name: 'Flipside Text', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0258, color: 'white', oneLine: true, align: 'right', shadowX: 0.0014, shadowY: 0.001 }
  }
};

export default template;
