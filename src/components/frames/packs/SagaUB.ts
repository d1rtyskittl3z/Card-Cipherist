import type { FramePackTemplate, FrameItem, Mask, TextConfig } from './types';

const masks: Mask[] = [
  { src: '/img/frames/saga/ub/sagaMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/saga/ub/sagaMaskTitle.png', name: 'Title' },
  { src: '/img/frames/saga/ub/sagaMaskType.png', name: 'Type' },
  { src: '/img/frames/saga/ub/sagaMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/saga/ub/sagaMaskBanner.png', name: 'Banner' },
  { src: '/img/frames/saga/ub/sagaMaskBannerRight.png', name: 'Banner (Right)' },
  { src: '/img/frames/saga/ub/sagaMaskText.png', name: 'Text' },
  { src: '/img/frames/saga/ub/sagaMaskTextRight.png', name: 'Text (Right)' },
  { src: '/img/frames/saga/ub/sagaMaskBorder.png', name: 'Border' },
];

const stampBounds = { x: 666 / 1500, y: 1905 / 2100, width: 171 / 1500, height: 95 / 2100 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/saga/ub/sagaFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/saga/ub/sagaFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/saga/ub/sagaFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/saga/ub/sagaFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/saga/ub/sagaFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/saga/ub/sagaFrameM.png', masks },
  { name: 'Land Frame', src: '/img/frames/saga/ub/l.png', masks },
  { name: 'Banner Pinstripe (Multicolored)', src: '/img/frames/saga/ub/sagaMidStripe.png', bounds: { x: 112 / 1500, y: 630 / 2100, width: 15 / 1500, height: 985 / 2100 }, },
  { name: 'Holo Stamp', src: '/img/frames/saga/ub/stamp.png', bounds: stampBounds },
  { name: 'Gray Stamp', src: '/img/frames/saga/ub/stampGray.png', bounds: stampBounds },
];

const text: Record<string, TextConfig> = {
  mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, },
  title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, },
  type: { name: 'Type', text: '', x: 0.0854, y: 1775 / 2100, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, },
  ability0: { name: 'Ability 1', text: '', x: 0.1334, y: 0.2896, width: 0.35, height: 0.1786, size: 0.0305, },
  ability1: { name: 'Ability 2', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305, },
  ability2: { name: 'Ability 3', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305, },
  ability3: { name: 'Ability 4', text: '', x: 0.1334, y: 0, width: 0.35, height: 0, size: 0.0305, },
  reminder: { name: 'Reminder Text', text: '{i}(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III.)', x: 0.0867, y: 0.1129, width: 0.404, height: 0.1772, size: 0.03, shadowColor: 'white', },
};

const template: FramePackTemplate = {
  id: 'SagaUB',
  label: 'Universes Beyond Frames',
  version: 'sagaUB',
  artBounds: { x: 753 / 1500, y: 240 / 2100, width: 630 / 1500, height: 1517 / 2100 },
  setSymbolBounds: { x: 0.9227, y: 1829 / 2100, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right', },
  watermarkBounds: { x: 0.3027, y: 0.4748, width: 0.3547, height: 0.6767 },
  saga: { x: 0.1, width: 0.3947, defaultAbilities: [1, 1, 1, 1], defaultCount: 3, },
  frames,
  text,
};

export default template;
