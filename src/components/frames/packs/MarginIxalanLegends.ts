import type { FramePackTemplate, Bounds, FrameItem } from './types';

const bounds: Bounds = { x: -89 / 2010, y: -81 / 2814, width: 2188 / 2010, height: 2976 / 2814 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'Legends of Ixalan Margins', src: '/img/frames/ixalanLegends/margin.png', bounds, ogBounds }
];

const template: FramePackTemplate = {
  id: 'MarginIxalanLegends',
  label: 'Legends of Ixalan Margins',
  frames
};

export default template;
