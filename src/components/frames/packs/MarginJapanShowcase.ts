import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -88 / 2010, y: -80 / 2817, width: 2187 / 2010, height: 2978 / 2817 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

// Masks available for margin frames
const masks: Mask[] = [
  { src: '/img/frames/m15/japanShowcase/margin/masks/maskBorderPinlines.png', name: 'Pinline' },
  { src: '/img/frames/m15/japanShowcase/margin/masks/maskBorder.png', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/m15/japanShowcase/margin/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/m15/japanShowcase/margin/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/m15/japanShowcase/margin/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/m15/japanShowcase/margin/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/m15/japanShowcase/margin/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/m15/japanShowcase/margin/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/m15/japanShowcase/margin/a.png', bounds, ogBounds, masks },
  { name: 'Land Extension', src: '/img/frames/m15/japanShowcase/margin/L.png', bounds, ogBounds, masks },
  { name: 'Black (Alt) Extension', src: '/img/frames/m15/japanShowcase/margin/bAlt.png', bounds, ogBounds, masks },
];

const template: FramePackTemplate = {
  id: 'MarginJapanShowcase',
  label: 'Japan Showcase Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
