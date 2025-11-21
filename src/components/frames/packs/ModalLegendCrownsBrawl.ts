import type { FramePackTemplate, FrameItem, Mask, Bounds } from './types';

const crownBounds: Bounds = { x: 0.0087, y: 0.0005, width: 0.9827, height: 0.1853 };

const masks: Mask[] = [
  { src: '/img/frames/custom/brawl/floating.svg', name: 'Crown Without Pinlines' },
  { src: '/img/frames/custom/brawl/center.svg', name: 'Center' },
  { src: '/img/frames/custom/brawl/second.svg', name: 'Second' },
  { src: '/img/frames/custom/brawl/third.svg', name: 'Third' },
  { src: '/img/frames/custom/brawl/wings.svg', name: 'Wings' }
];

const frames: FrameItem[] = [
  { name: 'White Crown', src: '/img/frames/modal/crowns/brawl/w.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Blue Crown', src: '/img/frames/modal/crowns/brawl/u.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Black Crown', src: '/img/frames/modal/crowns/brawl/b.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Red Crown', src: '/img/frames/modal/crowns/brawl/r.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Green Crown', src: '/img/frames/modal/crowns/brawl/g.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Multicolored Crown', src: '/img/frames/modal/crowns/brawl/m.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Artifact Crown', src: '/img/frames/modal/crowns/brawl/a.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Land Crown', src: '/img/frames/modal/crowns/brawl/l.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Legend Crown Cutout', src: '/img/frames/modal/crowns/cutout.svg', erase: true },
  { name: 'Legend Crown Border Cover', src: '/img/frames/modal/crowns/cover.svg' }
];

const template: FramePackTemplate = {
  id: 'ModalLegendCrownsBrawl',
  label: 'Brawl Legend Crowns',
  notice: 'Adds Brawl-style legend crown overlays for modal DFCs and applies the matching cutout/border cover to hide the default frame.',
  frames
};

export default template;