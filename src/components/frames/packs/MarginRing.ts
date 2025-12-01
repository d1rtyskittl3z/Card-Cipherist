import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 1.088, height: 37 / 35 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/lotr/margin/w.png', bounds, ogBounds },
  { name: 'Blue Extension', src: '/img/frames/lotr/margin/u.png', bounds, ogBounds },
  { name: 'Black Extension', src: '/img/frames/lotr/margin/b.png', bounds, ogBounds },
  { name: 'Red Extension', src: '/img/frames/lotr/margin/r.png', bounds, ogBounds },
  { name: 'Green Extension', src: '/img/frames/lotr/margin/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension', src: '/img/frames/lotr/margin/m.png', bounds, ogBounds },
  { name: 'Artifact Extension', src: '/img/frames/lotr/margin/a.png', bounds, ogBounds },
  { name: 'Land Extension', src: '/img/frames/lotr/margin/l.png', bounds, ogBounds },
];

const template: FramePackTemplate = {
  id: 'MarginRing',
  label: 'LTR Ring Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
