import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0.04, y: 0.0286, width: 0.92, height: 0.5324 };

const frames: FrameItem[] = [
  { name: 'White Miracle Frame', src: '/img/frames/m15/miracle/w.png', bounds },
  { name: 'Blue Miracle Frame', src: '/img/frames/m15/miracle/u.png', bounds },
  { name: 'Black Miracle Frame', src: '/img/frames/m15/miracle/b.png', bounds },
  { name: 'Red Miracle Frame', src: '/img/frames/m15/miracle/r.png', bounds },
  { name: 'Green Miracle Frame', src: '/img/frames/m15/miracle/g.png', bounds },
  { name: 'Multicolored Miracle Frame', src: '/img/frames/m15/miracle/m.png', bounds },
  { name: 'Artifact Miracle Frame', src: '/img/frames/m15/miracle/a.png', bounds },
  { name: 'Land Miracle Frame', src: '/img/frames/m15/miracle/l.png', bounds },
];

const template: FramePackTemplate = {
  id: 'M15Miracle',
  label: 'Miracle',
  frames,
};

export default template;
