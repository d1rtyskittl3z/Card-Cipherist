import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0.0307, y: 0.0191, width: 0.9387, height: 0.1024 };

const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/m15/transform/crowns/floating/w.png', bounds, complementary: [8, 9] },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/transform/crowns/floating/u.png', bounds, complementary: [8, 9] },
  { name: 'Black Legend Crown', src: '/img/frames/m15/transform/crowns/floating/b.png', bounds, complementary: [8, 9] },
  { name: 'Red Legend Crown', src: '/img/frames/m15/transform/crowns/floating/r.png', bounds, complementary: [8, 9] },
  { name: 'Green Legend Crown', src: '/img/frames/m15/transform/crowns/floating/g.png', bounds, complementary: [8, 9] },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/transform/crowns/floating/m.png', bounds, complementary: [8, 9] },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/transform/crowns/floating/a.png', bounds, complementary: [8, 9] },
  { name: 'Land Legend Crown', src: '/img/frames/m15/transform/crowns/floating/l.png', bounds, complementary: [8, 9] },
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 } },
  { name: 'Legend Crown Lower Cutout', src: '/img/black.png', bounds: { x: 0.0767, y: 0.1096, width: 0.8467, height: 0.0143 }, erase: true },
  { name: 'Legend Crown Outline', src: '/img/frames/m15/crowns/m15CrownFloatingOutline.png', bounds: { x: 0.028, y: 0.0172, width: 0.944, height: 0.1062 } },
];

const template: FramePackTemplate = {
  id: 'TransformLegendCrownsFloating',
  label: 'Legend Crowns (Floating)',
  version: 'TransformLegendCrownsFloating',
  artBounds: { x: 0, y: 0, width: 0, height: 0 },
  frames,
};

export default template;
