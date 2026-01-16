import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks for frames
const masks: Mask[] = [
  { src: '/img/frames/fable/margin/masks/maskNoBorder.png', name: 'No Border' },
];

// Shared bounds for extension frames
const bounds: Bounds = { x: -88 / 2010, y: -80 / 2817, width: 2187 / 2010, height: 2978 / 2817 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/fable/margin/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/fable/margin/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/fable/margin/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/fable/margin/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/fable/margin/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/fable/margin/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/fable/margin/a.png', bounds, ogBounds, masks },
];

const template: FramePackTemplate = {
  id: 'MarginFableECL',
  label: 'Fable (ECL) Margins',
  frames,
};

export default template;
