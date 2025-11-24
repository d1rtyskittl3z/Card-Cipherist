import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const masks2: Mask[] = [
  { src: '/img/frames/m15/prototype/regular/maskPinline.png', name: 'Pinline' },
];

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'Artifact Frame', src: '/img/frames/m15/regular/m15FrameA.png', masks },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'White Prototype Rules', src: '/img/frames/m15/prototype/regular/rulesW.png', masks: masks2 },
  { name: 'Blue Prototype Rules', src: '/img/frames/m15/prototype/regular/rulesU.png', masks: masks2 },
  { name: 'Black Prototype Rules', src: '/img/frames/m15/prototype/regular/rulesB.png', masks: masks2 },
  { name: 'Red Prototype Rules', src: '/img/frames/m15/prototype/regular/rulesR.png', masks: masks2 },
  { name: 'Green Prototype Rules', src: '/img/frames/m15/prototype/regular/rulesG.png', masks: masks2 },
  { name: 'Multicolor Prototype Rules', src: '/img/frames/m15/prototype/regular/rulesM.png', masks: masks2 },
  { name: 'White Prototype Mana Cost (Short)', src: '/img/frames/m15/prototype/regular/manaCostW.png' },
  { name: 'White Prototype Mana Cost (Long)', src: '/img/frames/m15/prototype/regular/manaCostLongW.png' },
  { name: 'Blue Prototype Mana Cost (Short)', src: '/img/frames/m15/prototype/regular/manaCostU.png' },
  { name: 'Blue Prototype Mana Cost (Long)', src: '/img/frames/m15/prototype/regular/manaCostLongU.png' },
  { name: 'Black Prototype Mana Cost (Short)', src: '/img/frames/m15/prototype/regular/manaCostB.png' },
  { name: 'Black Prototype Mana Cost (Long)', src: '/img/frames/m15/prototype/regular/manaCostLongB.png' },
  { name: 'Red Prototype Mana Cost (Short)', src: '/img/frames/m15/prototype/regular/manaCostR.png' },
  { name: 'Red Prototype Mana Cost (Long)', src: '/img/frames/m15/prototype/regular/manaCostLongR.png' },
  { name: 'Green Prototype Mana Cost (Short)', src: '/img/frames/m15/prototype/regular/manaCostG.png' },
  { name: 'Green Prototype Mana Cost (Long)', src: '/img/frames/m15/prototype/regular/manaCostLongG.png' },
  { name: 'Multicolor Prototype Mana Cost (Short)', src: '/img/frames/m15/prototype/regular/manaCostM.png' },
  { name: 'Multicolor Prototype Mana Cost (Long)', src: '/img/frames/m15/prototype/regular/manaCostLongM.png' },
  { name: 'White Prototype P/T', src: '/img/frames/m15/prototype/regular/ptW.png' },
  { name: 'Blue Prototype P/T', src: '/img/frames/m15/prototype/regular/ptU.png' },
  { name: 'Black Prototype P/T', src: '/img/frames/m15/prototype/regular/ptB.png' },
  { name: 'Red Prototype P/T', src: '/img/frames/m15/prototype/regular/ptR.png' },
  { name: 'Green Prototype P/T', src: '/img/frames/m15/prototype/regular/ptG.png' },
  { name: 'Multicolor Prototype P/T', src: '/img/frames/m15/prototype/regular/ptM.png' },
];

const template: FramePackTemplate = {
  id: 'Prototype',
  label: 'Prototype (Brothers\' War)',
  version: 'prototype',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.72, y: 0.7681, width: 0.3867, height: 0.2358 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    prototype: { name: 'Prototype Rules', text: 'Prototype {i}(You may cast this spell with different mana cost, color, and size. It keeps its abilities and types.){/i}', x: 129 / 1500, y: 1335 / 2100, width: 1041 / 1500, height: 193 / 2100, size: 0.0295 },
    rules2: { name: 'Rules Text', text: '', x: 129 / 1500, y: 1565 / 2100, width: 1242 / 1500, height: 359 / 2100, size: 0.0295 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    mana2: { name: 'Prototype Mana Cost', text: '', x: -24 / 1500, y: 1340 / 2100, width: 0.9292, height: 71 / 2100, oneLine: true, size: 72 / 2100, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    pt2: { name: 'Prototype P/T', text: '', x: 0.7928, y: 0.6935, width: 0.1367, height: 0.0372, size: 0.0372, color: 'white', font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
