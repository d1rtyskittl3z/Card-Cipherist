import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Transform Addon Arrows (Extended Art)
// Addon-only pack providing extended art transform arrows for MDFC cards

const bounds: Bounds = { x: 1810 / 2010, y: 2290 / 2814, width: 136 / 2010, height: 250 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Transform Arrow', src: '/img/frames/modal/transformAddon/extended/w.png', bounds },
  { name: 'Blue Transform Arrow', src: '/img/frames/modal/transformAddon/extended/u.png', bounds },
  { name: 'Black Transform Arrow', src: '/img/frames/modal/transformAddon/extended/b.png', bounds },
  { name: 'Red Transform Arrow', src: '/img/frames/modal/transformAddon/extended/r.png', bounds },
  { name: 'Green Transform Arrow', src: '/img/frames/modal/transformAddon/extended/g.png', bounds },
  { name: 'Multicolored Transform Arrow', src: '/img/frames/modal/transformAddon/extended/m.png', bounds },
  { name: 'Artifact Transform Arrow', src: '/img/frames/modal/transformAddon/extended/a.png', bounds },
  { name: 'Land Transform Arrow (Matches Promo Extended Art Frames)', src: '/img/frames/modal/transformAddon/extended/L.png', bounds }
];

const TransformAddonMDFCExtended: FramePackTemplate = {
  id: 'TransformAddonMDFCExtended',
  label: 'Transform Addon Arrows (Extended Art)',
  frames
};

export default TransformAddonMDFCExtended;
