import type { FramePackTemplate, Bounds, FrameItem, Mask } from './types';

const bounds: Bounds = { x: -89 / 2010, y: -81 / 2814, width: 2188 / 2010, height: 2976 / 2814 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };
const masks: Mask[] = [
  { src: '/img/frames/memoryCorridor/margins/maskHighlights.png', name: 'Highlights' }
];

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/memoryCorridor/margins/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/memoryCorridor/margins/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/memoryCorridor/margins/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/memoryCorridor/margins/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/memoryCorridor/margins/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/memoryCorridor/margins/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/memoryCorridor/margins/a.png', bounds, ogBounds, masks },
  { name: 'Land Extension', src: '/img/frames/memoryCorridor/margins/l.png', bounds, ogBounds, masks }
];

const template: FramePackTemplate = {
  id: 'MarginMemoryCorridor',
  label: 'Memory Corridor Margins',
  frames
};

export default template;
