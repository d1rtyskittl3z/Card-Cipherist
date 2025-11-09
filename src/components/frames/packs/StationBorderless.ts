import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/genericShowcase/m15GenericShowcaseMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameA.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameC.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/borderless/m15GenericShowcaseFrameL.png', masks },
];

const template: FramePackTemplate = {
  id: 'StationBorderless',
  label: 'Borderless Stations',
  version: 'stationBorderless',
  notice: 'Borderless station frames with dynamic square sizing. Preserves station colors and badge values across reloads.',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    ability0: { name: 'Ability 1', text: '', x: 175 / 2010, y: 1775 / 2814, width: 1660 / 2010, height: 280 / 2814, size: 0.0295, color: 'white' },
    ability1: { name: 'Ability 2', text: '', x: 0.18, y: 0.7, width: 0.7467, height: 0.0972, size: 0.0295, color: 'white' },
    ability2: { name: 'Ability 3', text: '', x: 0.18, y: 0.83, width: 0.7467, height: 0.0972, size: 0.0295, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 2, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
