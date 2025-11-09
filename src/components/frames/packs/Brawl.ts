import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/custom/brawl/floating.svg', name: 'Crown Without Pinlines' },
  { src: '/img/frames/custom/brawl/center.svg', name: 'Center' },
  { src: '/img/frames/custom/brawl/second.svg', name: 'Second' },
  { src: '/img/frames/custom/brawl/third.svg', name: 'Third' },
  { src: '/img/frames/custom/brawl/wings.svg', name: 'Wings' },
];

const crownBounds = { x: 0.0094, y: 0.0005, width: 0.9814, height: 0.1848 };

const frames: FrameItem[] = [
  { name: 'White Crown', src: '/img/frames/custom/brawl/w.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Blue Crown', src: '/img/frames/custom/brawl/u.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Black Crown', src: '/img/frames/custom/brawl/b.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Red Crown', src: '/img/frames/custom/brawl/r.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Green Crown', src: '/img/frames/custom/brawl/g.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Multicolored Crown', src: '/img/frames/custom/brawl/m.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Artifact Crown', src: '/img/frames/custom/brawl/a.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Land Crown', src: '/img/frames/custom/brawl/l.png', masks, bounds: crownBounds, complementary: 8 },
  { name: 'Brawl Crown Border Cover', src: '/img/frames/custom/brawl/cover.svg' },
];

const template: FramePackTemplate = {
  id: 'Brawl',
  label: 'Brawl Legend Crowns',
  frames,
};

export default template;
