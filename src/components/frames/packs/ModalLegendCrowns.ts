import type { FramePackTemplate, FrameItem, Bounds } from './types';

const crownBounds: Bounds = { x: 0.0274, y: 0.0191, width: 0.9454, height: 0.1667 };

const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/modal/crowns/regular/w.png', bounds: crownBounds, complementary: 8 },
  { name: 'Blue Legend Crown', src: '/img/frames/modal/crowns/regular/u.png', bounds: crownBounds, complementary: 8 },
  { name: 'Black Legend Crown', src: '/img/frames/modal/crowns/regular/b.png', bounds: crownBounds, complementary: 8 },
  { name: 'Red Legend Crown', src: '/img/frames/modal/crowns/regular/r.png', bounds: crownBounds, complementary: 8 },
  { name: 'Green Legend Crown', src: '/img/frames/modal/crowns/regular/g.png', bounds: crownBounds, complementary: 8 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/modal/crowns/regular/m.png', bounds: crownBounds, complementary: 8 },
  { name: 'Artifact Legend Crown', src: '/img/frames/modal/crowns/regular/a.png', bounds: crownBounds, complementary: 8 },
  { name: 'Land Legend Crown', src: '/img/frames/modal/crowns/regular/l.png', bounds: crownBounds, complementary: 8 },
  { name: 'Legend Crown Border Cover', src: '/img/frames/modal/crowns/regular/cover.svg' }
];

const template: FramePackTemplate = {
  id: 'ModalLegendCrowns',
  label: 'Regular Legend Crowns',
  notice: 'Adds legend crown overlays for modal DFCs and automatically includes the border cover frame to hide the default modal border.',
  frames
};

export default template;