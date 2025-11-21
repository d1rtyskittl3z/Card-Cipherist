import type { FramePackTemplate, FrameItem, Bounds } from './types';

const crownBounds: Bounds = { x: 0.0234, y: 0.0167, width: 0.952, height: 0.1286 };

const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/modal/crowns/nickname/w.png', bounds: crownBounds, complementary: 8 },
  { name: 'Blue Legend Crown', src: '/img/frames/modal/crowns/nickname/u.png', bounds: crownBounds, complementary: 8 },
  { name: 'Black Legend Crown', src: '/img/frames/modal/crowns/nickname/b.png', bounds: crownBounds, complementary: 8 },
  { name: 'Red Legend Crown', src: '/img/frames/modal/crowns/nickname/r.png', bounds: crownBounds, complementary: 8 },
  { name: 'Green Legend Crown', src: '/img/frames/modal/crowns/nickname/g.png', bounds: crownBounds, complementary: 8 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/modal/crowns/nickname/m.png', bounds: crownBounds, complementary: 8 },
  { name: 'Artifact Legend Crown', src: '/img/frames/modal/crowns/nickname/a.png', bounds: crownBounds, complementary: 8 },
  { name: 'Land Legend Crown', src: '/img/frames/modal/crowns/nickname/l.png', bounds: crownBounds, complementary: 8 },
  { name: 'Legend Crown Cutout', src: '/img/frames/modal/nickname/cutout.svg', erase: true }
];

const template: FramePackTemplate = {
  id: 'ModalLegendCrownsNickname',
  label: 'Nickname Legend Crowns',
  notice: 'Adds nickname legend crown overlays for modal DFCs and includes the nickname cutout to remove the default frame border.',
  frames
};

export default template;