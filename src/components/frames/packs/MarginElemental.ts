import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 2186 / 2010, height: 2974 / 2814 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/elemental/margin/w.png', bounds, ogBounds },
  { name: 'Blue Extension', src: '/img/frames/elemental/margin/u.png', bounds, ogBounds },
  { name: 'Black Extension', src: '/img/frames/elemental/margin/b.png', bounds, ogBounds },
  { name: 'Red Extension', src: '/img/frames/elemental/margin/r.png', bounds, ogBounds },
  { name: 'Green Extension', src: '/img/frames/elemental/margin/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension', src: '/img/frames/elemental/margin/m.png', bounds, ogBounds },
  { name: 'Artifact Extension', src: '/img/frames/elemental/margin/a.png', bounds, ogBounds },
  { name: 'Land Extension', src: '/img/frames/elemental/margin/l.png', bounds, ogBounds },
  { name: 'Colorless Extension', src: '/img/frames/elemental/margin/c.png', bounds, ogBounds },
];

const template: FramePackTemplate = {
  id: 'MarginElemental',
  label: 'Elemental Margins (TLA)',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
