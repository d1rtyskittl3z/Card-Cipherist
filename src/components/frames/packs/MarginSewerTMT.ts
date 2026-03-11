import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: -88 / 2010, y: -80 / 2817, width: 2187 / 2010, height: 2978 / 2817 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const masks: Mask[] = [
  { src: '/img/frames/sewerTMT/margin/masks/maskFloating.png', name: 'Floating Frame' },
];

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/sewerTMT/margin/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/sewerTMT/margin/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/sewerTMT/margin/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/sewerTMT/margin/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/sewerTMT/margin/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/sewerTMT/margin/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/sewerTMT/margin/a.png', bounds, ogBounds, masks },
];

const template: FramePackTemplate = {
  id: 'MarginSewerTMT',
  label: 'Sewer (TMT) Margins',
  notice: 'Margin addon pack for Sewer (TMT) frames. Uses loadMarginVersion - apply as overlay on base frames.',
  frames,
};

export default template;
