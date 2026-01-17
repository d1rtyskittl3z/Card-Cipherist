import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Transform Addon Arrows (Snow)
// Addon-only pack providing snow transform arrows for MDFC cards

const bounds: Bounds = { x: 1810 / 2010, y: 2290 / 2814, width: 136 / 2010, height: 250 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Transform Arrow', src: '/img/frames/modal/transformAddon/snow/w.png', bounds },
  { name: 'Blue Transform Arrow', src: '/img/frames/modal/transformAddon/snow/u.png', bounds },
  { name: 'Black Transform Arrow', src: '/img/frames/modal/transformAddon/snow/b.png', bounds },
  { name: 'Red Transform Arrow', src: '/img/frames/modal/transformAddon/snow/r.png', bounds },
  { name: 'Green Transform Arrow', src: '/img/frames/modal/transformAddon/snow/g.png', bounds },
  { name: 'Multicolored Transform Arrow', src: '/img/frames/modal/transformAddon/snow/m.png', bounds },
  { name: 'Artifact Transform Arrow', src: '/img/frames/modal/transformAddon/snow/a.png', bounds },
  { name: 'Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/L.png', bounds },
  { name: 'White Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/w.png', bounds },
  { name: 'Blue Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/u.png', bounds },
  { name: 'Black Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/b.png', bounds },
  { name: 'Red Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/r.png', bounds },
  { name: 'Green Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/g.png', bounds },
  { name: 'Multicolored Land Transform Arrow', src: '/img/frames/modal/transformAddon/snow/land/m.png', bounds }
];

const TransformAddonMDFCSnow: FramePackTemplate = {
  id: 'TransformAddonMDFCSnow',
  label: 'Transform Addon Arrows (Snow)',
  frames
};

export default TransformAddonMDFCSnow;
