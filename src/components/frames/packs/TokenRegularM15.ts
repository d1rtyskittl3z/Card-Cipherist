import { FramePackTemplate, Mask, TextConfig } from './types';

const masks: Mask[] = [
  { src: '/img/frames/token/m15/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/token/m15/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/token/tokenMaskRegularType.png', name: 'Type' },
  { src: '/img/frames/token/tokenMaskRegularRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const ptBounds = {
  x: 0.7573,
  y: 0.8848,
  width: 0.188,
  height: 0.0733,
};

const mana: TextConfig = {
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
};

const title: TextConfig = {
  name: 'Title',
  text: '',
  x: 0.0854,
  y: 0.0522,
  width: 0.8292,
  height: 0.0543,
  oneLine: true,
  font: 'belerenbsc',
  size: 0.0381,
  color: '#fde367',
  align: 'center',
};

const type: TextConfig = {
  name: 'Type',
  text: '',
  x: 0.0854,
  y: 0.65,
  width: 0.8292,
  height: 0.0543,
  oneLine: true,
  font: 'belerenb',
  size: 0.0324,
};

const rules: TextConfig = {
  name: 'Rules Text',
  text: '',
  x: 0.086,
  y: 0.7143,
  width: 0.828,
  height: 0.2048,
  size: 0.0362,
};

const pt: TextConfig = {
  name: 'Power/Toughness',
  text: '',
  x: 0.7928,
  y: 0.902,
  width: 0.1367,
  height: 0.0372,
  size: 0.0372,
  font: 'belerenbsc',
  oneLine: true,
  align: 'center',
};

const template: FramePackTemplate = {
  id: 'TokenRegularM15',
  label: 'Regular (Bordered M15)',
  version: 'tokenRegularM15',
  artBounds: { x: 0.0767, y: 0.1248, width: 0.8476, height: 0.5143 },
  setSymbolBounds: {
    x: 0.9213,
    y: 0.6743,
    width: 0.12,
    height: 0.041,
    vertical: 'center',
    horizontal: 'right',
  },
  watermarkBounds: { x: 0.5, y: 0.8177, width: 0.75, height: 0.1472 },
  frames: [
    { name: 'White Frame', src: '/img/frames/token/m15/regular/w.png', masks },
    { name: 'Blue Frame', src: '/img/frames/token/m15/regular/u.png', masks },
    { name: 'Black Frame', src: '/img/frames/token/m15/regular/b.png', masks },
    { name: 'Red Frame', src: '/img/frames/token/m15/regular/r.png', masks },
    { name: 'Green Frame', src: '/img/frames/token/m15/regular/g.png', masks },
    { name: 'Multicolored Frame', src: '/img/frames/token/m15/regular/m.png', masks },
    { name: 'Artifact Frame', src: '/img/frames/token/m15/regular/a.png', masks },
    { name: 'Land Frame', src: '/img/frames/token/m15/regular/l.png', masks },
    {
      name: 'White Power/Toughness',
      src: '/img/frames/m15/regular/m15PTW.png',
      bounds: ptBounds,
    },
    {
      name: 'Blue Power/Toughness',
      src: '/img/frames/m15/regular/m15PTU.png',
      bounds: ptBounds,
    },
    {
      name: 'Black Power/Toughness',
      src: '/img/frames/m15/regular/m15PTB.png',
      bounds: ptBounds,
    },
    {
      name: 'Red Power/Toughness',
      src: '/img/frames/m15/regular/m15PTR.png',
      bounds: ptBounds,
    },
    {
      name: 'Green Power/Toughness',
      src: '/img/frames/m15/regular/m15PTG.png',
      bounds: ptBounds,
    },
    {
      name: 'Multicolored Power/Toughness',
      src: '/img/frames/m15/regular/m15PTM.png',
      bounds: ptBounds,
    },
    {
      name: 'Artifact Power/Toughness',
      src: '/img/frames/m15/regular/m15PTA.png',
      bounds: ptBounds,
    },
    {
      name: 'Colorless Power/Toughness',
      src: '/img/frames/m15/regular/m15PTC.png',
      bounds: ptBounds,
    },
    { name: 'White Nyx Frame', src: '/img/frames/token/m15/regular/nyx/w.png', masks },
    { name: 'Blue Nyx Frame', src: '/img/frames/token/m15/regular/nyx/u.png', masks },
    { name: 'Black Nyx Frame', src: '/img/frames/token/m15/regular/nyx/b.png', masks },
    { name: 'Red Nyx Frame', src: '/img/frames/token/m15/regular/nyx/r.png', masks },
    { name: 'Green Nyx Frame', src: '/img/frames/token/m15/regular/nyx/g.png', masks },
    {
      name: 'Multicolored Nyx Frame',
      src: '/img/frames/token/m15/regular/nyx/m.png',
      masks,
    },
    { name: 'Artifact Nyx Frame', src: '/img/frames/token/m15/regular/nyx/a.png', masks },
  ],
  text: { mana, title, type, rules, pt },
};

export default template;
