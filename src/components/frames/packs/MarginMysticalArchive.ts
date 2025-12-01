import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 2186 / 2010, height: 2974 / 2814 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

// Masks available for margin frames
const masks: Mask[] = [
  { src: '/img/frames/mysticalArchive/margin/maskPinline.png', name: 'Pinline' },
  { src: '/img/frames/mysticalArchive/margin/maskPinlineRight.png', name: 'Pinline (Right)' },
];

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/mysticalArchive/margin/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/mysticalArchive/margin/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/mysticalArchive/margin/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/mysticalArchive/margin/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/mysticalArchive/margin/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/mysticalArchive/margin/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/mysticalArchive/margin/a.png', bounds, ogBounds, masks },
  { name: 'Land Extension', src: '/img/frames/mysticalArchive/margin/l.png', bounds, ogBounds, masks },
];

const template: FramePackTemplate = {
  id: 'MarginMysticalArchive',
  label: 'Mystical Archive Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
