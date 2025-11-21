import type { FramePackTemplate, FrameItem, Bounds } from './types';

const crownBounds: Bounds = { x: 0.0307, y: 0.0191, width: 0.9387, height: 0.1024 };
const borderBounds: Bounds = { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 };
const outlineBounds: Bounds = { x: 0.028, y: 0.0172, width: 0.944, height: 0.1062 };

const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/modal/crowns/floating/w.png', bounds: crownBounds, complementary: 8 },
  { name: 'Blue Legend Crown', src: '/img/frames/modal/crowns/floating/u.png', bounds: crownBounds, complementary: 8 },
  { name: 'Black Legend Crown', src: '/img/frames/modal/crowns/floating/b.png', bounds: crownBounds, complementary: 8 },
  { name: 'Red Legend Crown', src: '/img/frames/modal/crowns/floating/r.png', bounds: crownBounds, complementary: 8 },
  { name: 'Green Legend Crown', src: '/img/frames/modal/crowns/floating/g.png', bounds: crownBounds, complementary: 8 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/modal/crowns/floating/m.png', bounds: crownBounds, complementary: 8 },
  { name: 'Artifact Legend Crown', src: '/img/frames/modal/crowns/floating/a.png', bounds: crownBounds, complementary: 8 },
  { name: 'Land Legend Crown', src: '/img/frames/modal/crowns/floating/l.png', bounds: crownBounds, complementary: 8 },
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: borderBounds },
  { name: 'Legend Crown Cutout', src: '/img/frames/modal/crowns/cutout.svg', erase: true },
  { name: 'Legend Crown Outline', src: '/img/frames/m15/crowns/m15CrownFloatingOutline.png', bounds: outlineBounds }
];

const template: FramePackTemplate = {
  id: 'ModalLegendCrownsFloating',
  label: 'Floating Legend Crowns',
  notice: 'Floating legend crown overlays for modal DFCs that also add a cutout/outline and border cover when no mask is selected.',
  frames
};

export default template;