import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Transform Addon Arrows
// Addon-only pack providing transform arrows for MDFC cards

const bounds: Bounds = { x: 1810 / 2010, y: 2290 / 2814, width: 136 / 2010, height: 250 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Transform Arrow', src: '/img/frames/modal/transformAddon/w.png', bounds },
  { name: 'Blue Transform Arrow', src: '/img/frames/modal/transformAddon/u.png', bounds },
  { name: 'Black Transform Arrow', src: '/img/frames/modal/transformAddon/b.png', bounds },
  { name: 'Red Transform Arrow', src: '/img/frames/modal/transformAddon/r.png', bounds },
  { name: 'Green Transform Arrow', src: '/img/frames/modal/transformAddon/g.png', bounds },
  { name: 'Multicolored Transform Arrow', src: '/img/frames/modal/transformAddon/m.png', bounds },
  { name: 'Artifact Transform Arrow', src: '/img/frames/modal/transformAddon/a.png', bounds },
  { name: 'Vehicle Transform Arrow', src: '/img/frames/modal/transformAddon/v.png', bounds },
  { name: 'White Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/nyx/w.png', bounds },
  { name: 'Blue Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/nyx/u.png', bounds },
  { name: 'Black Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/nyx/b.png', bounds },
  { name: 'Red Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/nyx/r.png', bounds },
  { name: 'Green Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/nyx/g.png', bounds },
  { name: 'Multicolored Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/nyx/m.png', bounds },
  { name: 'Artifact Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/a.png', bounds },
  { name: 'Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/L.png', bounds },
  { name: 'White Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/w.png', bounds },
  { name: 'Blue Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/u.png', bounds },
  { name: 'Black Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/b.png', bounds },
  { name: 'Red Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/r.png', bounds },
  { name: 'Green Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/g.png', bounds },
  { name: 'Multicolored Land Transform Arrow', src: '/img/frames/modal/transformAddon/land/m.png', bounds }
];

const TransformAddonMDFC: FramePackTemplate = {
  id: 'TransformAddonMDFC',
  label: 'Transform Addon Arrows',
  frames
};

export default TransformAddonMDFC;
