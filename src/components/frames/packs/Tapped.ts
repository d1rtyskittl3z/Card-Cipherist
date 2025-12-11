import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/custom/tapped/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/custom/tapped/title.svg', name: 'Title' },
  { src: '/img/frames/custom/tapped/type.svg', name: 'Type' },
  { src: '/img/frames/custom/tapped/text.svg', name: 'Textbox' },
  { src: '/img/frames/custom/tapped/border.svg', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/tapped/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/custom/tapped/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/custom/tapped/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/custom/tapped/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/custom/tapped/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/custom/tapped/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/custom/tapped/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/custom/tapped/l.png', masks },
];

const template: FramePackTemplate = {
  id: 'Tapped',
  label: 'Tapped (Horizontal M15)',
  notice: 'This is a landscape/horizontal frame pack. The card canvas is rotated 90 degrees. Use the "Additional" text field for custom life adjustment indicators.',
  version: 'tapped',
  canvasDimensions: [2100, 1500, 0, 0],
  landscape: true,
  artBounds: { x: 0.0281, y: 0.0394, width: 0.9439, height: 0.8614 },
  setSymbolBounds: { x: 0.9439, y: 0.8927, width: 0.0858, height: 0.0467, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.7253, y: 0.5, width: 0.381, height: 0.5667 },
  replacementMasks: { 'Right Half': '/img/frames/custom/tapped/rightHalf.png' },
  collectorInfoScale: 1.5,
  collectorInfoOffsets: {
    topLeft: { x: -0.021, y: -0.024 }, // Number
    rarity: { x: -0.054, y: -0.024 },
    note: { x: -0.062, y: -0.024 },
    midLeft: { x: -0.022, y: -0.014 }, // Set/Language/Artist
  },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.5153, y: 0.0814, width: 0.4181, height: 0.0607, oneLine: true, font: 'belerenb', size: 0.0607 },
    type: { name: 'Type', text: '', x: 0.5153, y: 0.8707, width: 0.4181, height: 0.0474, oneLine: true, font: 'belerenb', size: 0.0474 },
    rules: { name: 'Rules Text', text: '', x: 0.5191, y: 0.1634, width: 0.4096, height: 0.6734, size: 0.0507 },
    additional: { name: 'Extra Textbox', text: 'Adjust Life{i}{lns}{up0.01}{bar}{lns}{right}{fontsize-0.0067}Revived — 20{lns}Survived — +10', x: 0.1286, width: 0.2739, y: 0.64, height: 0.2534, size: 0.0607, color: 'white', align: 'center' },
  },
  // loadBottomInfo: {
  //   midLeft: { name: 'Artist & Set Info', text: '{elemidinfo-set}*{elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize0.001}{upinline0.0005}\uFFEE{elemidinfo-artist}', x: 0.0462, y: 0.9367, width: 0.9077, height: 0.024, oneLine: true, font: 'gothammedium', size: 0.024, color: 'white', outlineWidth: 0.003 },
  //   topLeft: { name: 'Number & Rarity', text: '{elemidinfo-number} {elemidinfo-rarity}', x: 0.0462, y: 0.9127, width: 0.9077, height: 0.024, oneLine: true, font: 'gothammedium', size: 0.024, color: 'white', outlineWidth: 0.003 },
  // },
  brush: '/img/manaSymbols/artistbrush.svg',
};

export default template;
