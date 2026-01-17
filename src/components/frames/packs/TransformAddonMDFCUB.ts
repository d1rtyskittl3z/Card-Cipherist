import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Transform Addon Arrows (UB)
// Addon-only pack providing Universe Beyond transform arrows for MDFC cards

const bounds: Bounds = { x: 1810 / 2010, y: 2290 / 2814, width: 136 / 2010, height: 250 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Transform Arrow', src: '/img/frames/modal/transformAddon/ub/w.png', bounds },
  { name: 'Blue Transform Arrow', src: '/img/frames/modal/transformAddon/ub/u.png', bounds },
  { name: 'Black Transform Arrow', src: '/img/frames/modal/transformAddon/ub/b.png', bounds },
  { name: 'Red Transform Arrow', src: '/img/frames/modal/transformAddon/ub/r.png', bounds },
  { name: 'Green Transform Arrow', src: '/img/frames/modal/transformAddon/ub/g.png', bounds },
  { name: 'Multicolored Transform Arrow', src: '/img/frames/modal/transformAddon/ub/m.png', bounds },
  { name: 'Artifact Transform Arrow', src: '/img/frames/modal/transformAddon/ub/a.png', bounds },
  { name: 'Vehicle Transform Arrow', src: '/img/frames/modal/transformAddon/ub/v.png', bounds },
  { name: 'White Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/w.png', bounds },
  { name: 'Blue Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/u.png', bounds },
  { name: 'Black Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/b.png', bounds },
  { name: 'Red Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/r.png', bounds },
  { name: 'Green Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/g.png', bounds },
  { name: 'Multicolored Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/m.png', bounds },
  { name: 'Artifact Nyx Transform Arrow', src: '/img/frames/modal/transformAddon/ub/nyx/a.png', bounds },
  { name: 'Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/L.png', bounds },
  { name: 'White Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/w.png', bounds },
  { name: 'Blue Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/u.png', bounds },
  { name: 'Black Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/b.png', bounds },
  { name: 'Red Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/r.png', bounds },
  { name: 'Green Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/g.png', bounds },
  { name: 'Multicolored Land Transform Arrow', src: '/img/frames/modal/transformAddon/ub/land/m.png', bounds }
];

const TransformAddonMDFCUB: FramePackTemplate = {
  id: 'TransformAddonMDFCUB',
  label: 'Transform Addon Arrows (UB)',
  frames
};

export default TransformAddonMDFCUB;
