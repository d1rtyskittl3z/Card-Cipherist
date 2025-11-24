import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/class/masks/maskPinlines.png', name: 'Pinline' },
  { src: '/img/frames/class/masks/maskBorderlessPinlines.png', name: 'Borderless Pinlines' },
  { src: '/img/frames/class/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/class/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/class/masks/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/class/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/class/masks/maskTextBoxes.png', name: 'Text Boxes' },
  { src: '/img/frames/class/textRight.png', name: 'Text, Right Half' },
  { src: '/img/frames/class/masks/maskBorderless.png', name: 'Borderless' },
  { src: '/img/frames/class/masks/maskBorder.png', name: 'Border' },
  { src: '/img/frames/class/masks/maskBorderlessBorder.png', name: 'Borderless Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/class/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/class/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/class/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/class/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/class/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/class/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/class/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/class/l.png', masks },
];

const template: FramePackTemplate = {
  id: 'Case',
  label: 'Cases (Murders at Karlov Manor)',
  version: 'case',
  artBounds: { x: 0.0753, y: 0.1124, width: 0.4247, height: 0.7253 },
  setSymbolBounds: { x: 0.9227, y: 0.8739, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5214, y: 0.4748, width: 0.38, height: 0.6767 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8481, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    case: { name: 'Rules Text', text: '//{bar}//To solve — {i}(If unsolved, solve at the beginning of your end step.){/i}//{bar}//Solved — ', x: 0.5093, y: 356 / 2814, width: 0.404, height: 1974 / 2814, size: 0.03445 },
  },
};

export default template;
