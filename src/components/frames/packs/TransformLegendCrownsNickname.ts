import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0.0234, y: 0.0167, width: 0.952, height: 0.1286 };

const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/w.png', bounds, complementary: [8, 9] },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/u.png', bounds, complementary: [8, 9] },
  { name: 'Black Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/b.png', bounds, complementary: [8, 9] },
  { name: 'Red Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/r.png', bounds, complementary: [8, 9] },
  { name: 'Green Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/g.png', bounds, complementary: [8, 9] },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/m.png', bounds, complementary: [8, 9] },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/a.png', bounds, complementary: [8, 9] },
  { name: 'Land Legend Crown', src: '/img/frames/m15/transform/crowns/nickname/l.png', bounds, complementary: [8, 9] },
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 }, erase: true },
  { name: 'Legend Crown Lower Cutout', src: '/img/black.png', bounds: { x: 0.0767, y: 0.1096, width: 0.8467, height: 0.0143 }, erase: true },
];

const template: FramePackTemplate = {
  id: 'TransformLegendCrownsNickname',
  label: 'Legend Crowns (Nickname)',
  version: 'TransformLegendCrownsNickname',
  artBounds: { x: 0, y: 0, width: 0, height: 0 },
  frames,
};

export default template;
