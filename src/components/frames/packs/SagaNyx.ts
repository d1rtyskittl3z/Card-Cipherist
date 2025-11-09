import type { FramePackTemplate, FrameItem, Mask } from './types';

const masks: Mask[] = [
  { src: '/img/frames/saga/sagaMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/saga/sagaMaskType.png', name: 'Type' },
  { src: '/img/frames/saga/sagaMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/saga/sagaMaskBanner.png', name: 'Banner' },
  { src: '/img/frames/saga/sagaMaskBannerRight.png', name: 'Banner (Right)' },
  { src: '/img/frames/saga/sagaMaskText.png', name: 'Text' },
  { src: '/img/frames/saga/sagaMaskTextRight.png', name: 'Text (Right)' },
  { src: '/img/frames/saga/sagaMaskBorder.png', name: 'Border' },
];

const powerToughnessBounds = {
  x: 1179 / 1500,
  y: 1766 / 2100,
  width: 237 / 1500,
  height: 154 / 2100,
};

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/saga/nyx/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/saga/nyx/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/saga/nyx/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/saga/nyx/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/saga/nyx/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/saga/nyx/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/saga/nyx/a.png', masks },
  {
    name: 'Banner Pinstripe (Multicolored)',
    src: '/img/frames/saga/sagaMidStripe.png',
    bounds: { x: 0.0727, y: 0.3058, width: 0.0087, height: 0.4762 },
  },

  { name: 'White Power/Toughness', src: '/img/frames/saga/pt/w.png', bounds: powerToughnessBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/saga/pt/u.png', bounds: powerToughnessBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/saga/pt/b.png', bounds: powerToughnessBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/saga/pt/r.png', bounds: powerToughnessBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/saga/pt/g.png', bounds: powerToughnessBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/saga/pt/m.png', bounds: powerToughnessBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/saga/pt/a.png', bounds: powerToughnessBounds },

  { name: 'Holo Stamp', src: '/img/frames/saga/stamp.png', bounds: { x: 0.438, y: 0.912, width: 0.124, height: 0.0372 } },
];

const template: FramePackTemplate = {
  id: 'SagaNyx',
  label: 'Nyx Frames',
  version: 'sagaNyx',
  artBounds: { x: 0.5, y: 0.1124, width: 0.4247, height: 0.7253 },
  setSymbolBounds: { x: 0.9227, y: 0.8739, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.3027, y: 0.4748, width: 0.3547, height: 0.6767 },
  saga: {
    x: 0.1,
    width: 0.3947,
    defaultAbilities: [1, 1, 1, 0],
    defaultCount: 3,
  },
  frames,
  text: {
    mana: {
      name: 'Mana Cost',
      text: '',
      y: 0.0613,
      width: 0.9292,
      height: 71 / 2100,
      oneLine: true,
      size: 71 / 1638,
      align: 'right',
      shadowX: -0.001,
      shadowY: 0.0029,
      manaCost: true,
      manaSpacing: 0,
    },
    title: {
      name: 'Title',
      text: '',
      x: 0.0854,
      y: 0.0522,
      width: 0.8292,
      height: 0.0543,
      oneLine: true,
      font: 'belerenb',
      size: 0.0381,
    },
    type: {
      name: 'Type',
      text: '',
      x: 0.0854,
      y: 0.8481,
      width: 0.8292,
      height: 0.0543,
      oneLine: true,
      font: 'belerenb',
      size: 0.0324,
    },
    ability0: { name: 'Ability 1', text: '', x: 0.1334, y: 0.2896, width: 0.35, height: 0.1786, size: 0.0305 },
    ability1: { name: 'Ability 2', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
    ability2: { name: 'Ability 3', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
    ability3: { name: 'Ability 4', text: '', x: 0.1334, y: 0, width: 0.35, height: 0, size: 0.0305 },
    reminder: {
      name: 'Reminder Text',
      text: '{i}(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III.)',
      x: 0.0867,
      y: 0.1129,
      width: 0.404,
      height: 0.1772,
      size: 0.03,
      shadowColor: 'white',
    },
    pt: {
      name: 'Power/Toughness',
      text: '',
      x: 0.8267,
      y: 1803 / 2100,
      width: 0.0967,
      height: 0.0372,
      size: 0.0372,
      font: 'belerenbsc',
      oneLine: true,
      align: 'center',
    },
  },
};

export default template;
