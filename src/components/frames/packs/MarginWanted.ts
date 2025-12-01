import type { FramePackTemplate, Bounds, FrameItem } from './types';

const bounds: Bounds = { x: -88.5 / 2010, y: -79 / 2817, width: 2187 / 2010, height: 2975 / 2817 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'Wanted Extension', src: '/img/frames/wanted/margin.png', bounds, ogBounds }
];

const template: FramePackTemplate = {
  id: 'MarginWanted',
  label: 'Wanted Poster Margins',
  frames
};

export default template;
