import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/saga/dfc/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/transform/regular/maskTitle.png', name: 'Title' },
  { src: '/img/frames/saga/sagaMaskType.png', name: 'Type' },
  { src: '/img/frames/saga/dfc/frame.svg', name: 'Frame' },
  { src: '/img/frames/saga/dfc/banner.svg', name: 'Banner' },
  { src: '/img/frames/saga/dfc/bannerRight.svg', name: 'Banner (Right)' },
  { src: '/img/frames/saga/dfc/rules.svg', name: 'Rules' },
  { src: '/img/frames/saga/sagaMaskTextRight.png', name: 'Rules (Right)' },
  { src: '/img/frames/saga/sagaMaskBorder.png', name: 'Border' },
];

const stampBounds = { x: 0.438, y: 0.912, width: 0.124, height: 0.0372 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/saga/dfc/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/saga/dfc/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/saga/dfc/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/saga/dfc/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/saga/dfc/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/saga/dfc/m.png', masks },
  { name: 'Land Frame', src: '/img/frames/saga/dfc/l.png', masks },
  { name: 'Holo Stamp', src: '/img/frames/saga/stamp.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'SagaDFC',
  label: 'Sagas (Front)',
  version: 'sagaDFC',
  artBounds: { x: 0.5, y: 0.1124, width: 0.4247, height: 0.7253 },
  setSymbolBounds: { x: 0.9227, y: 0.8739, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.3027, y: 0.4748, width: 0.3547, height: 0.6767 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.16, y: 0.0522, width: 0.7547, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8481, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    ability0: { name: 'Ability 1', text: '', x: 0.1334, y: 0.2896, width: 0.35, height: 0.1786, size: 0.0305 },
    ability1: { name: 'Ability 2', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
    ability2: { name: 'Ability 3', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
    ability3: { name: 'Ability 4', text: '', x: 0.1334, y: 0, width: 0.35, height: 0, size: 0.0305 },
    backPT: { name: 'Reverse PT', text: '', x: 0.08, y: 0.7929, width: 0.35, height: 0.0362, size: 0.0291, oneLine: true, color: '#666', font: 'belerenbsc' },
    reminder: { name: 'Reminder Text', text: '{i}(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III.)', x: 0.0867, y: 0.1129, width: 0.404, height: 0.1772, size: 0.03, shadowColor: 'white' },
  },
};

export default template;
