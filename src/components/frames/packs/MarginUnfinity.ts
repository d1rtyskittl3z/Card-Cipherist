import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 1.088, height: 37 / 35 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

// Empty masks array for consistency
const masks: Mask[] = [];

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/unfinity/margins/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/unfinity/margins/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/unfinity/margins/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/unfinity/margins/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/unfinity/margins/g.png', bounds, ogBounds, masks },
  { name: 'Waste Extension', src: '/img/frames/unfinity/margins/L.png', bounds, ogBounds, masks },
];

const template: FramePackTemplate = {
  id: 'MarginUnfinity',
  label: 'Unfinity Basics Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
