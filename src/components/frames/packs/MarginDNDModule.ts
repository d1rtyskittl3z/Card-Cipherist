import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 1.088, height: 37 / 35 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/dndModule/margin/w.svg', bounds, ogBounds },
  { name: 'Blue Extension', src: '/img/frames/dndModule/margin/u.svg', bounds, ogBounds },
  { name: 'Black Extension', src: '/img/frames/dndModule/margin/b.svg', bounds, ogBounds },
  { name: 'Red Extension', src: '/img/frames/dndModule/margin/r.svg', bounds, ogBounds },
  { name: 'Green Extension', src: '/img/frames/dndModule/margin/g.svg', bounds, ogBounds },
  { name: 'Multicolored Extension', src: '/img/frames/dndModule/margin/m.svg', bounds, ogBounds },
  { name: 'Artifact Extension', src: '/img/frames/dndModule/margin/a.svg', bounds, ogBounds },
  { name: 'Colorless Extension', src: '/img/frames/dndModule/margin/c.svg', bounds, ogBounds },
  { name: 'Land Extension', src: '/img/frames/dndModule/margin/l.svg', bounds, ogBounds },
];

const template: FramePackTemplate = {
  id: 'MarginDNDModule',
  label: 'D&D Module Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
