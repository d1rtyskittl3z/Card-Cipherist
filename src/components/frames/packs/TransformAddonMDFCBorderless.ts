import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Transform Addon Arrows (Borderless)
// Addon-only pack providing borderless transform arrows for MDFC cards
// Includes text box cover mask with erase mode

const bounds: Bounds = { x: 1810 / 2010, y: 2290 / 2814, width: 136 / 2010, height: 250 / 2814 };
const bounds2: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/w.png', bounds, complementary: 8 },
  { name: 'Blue Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/u.png', bounds, complementary: 8 },
  { name: 'Black Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/b.png', bounds, complementary: 8 },
  { name: 'Red Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/r.png', bounds, complementary: 8 },
  { name: 'Green Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/g.png', bounds, complementary: 8 },
  { name: 'Multicolored Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/m.png', bounds, complementary: 8 },
  { name: 'Artifact Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/a.png', bounds, complementary: 8 },
  { name: 'Land Transform Arrow', src: '/img/frames/modal/transformAddon/borderless/L.png', bounds, complementary: 8 },
  { name: 'Transform Text Box Cover', src: '/img/frames/modal/transformAddon/borderless/masks/maskEraseTextBox.png', bounds: bounds2, erase: true }
];

const TransformAddonMDFCBorderless: FramePackTemplate = {
  id: 'TransformAddonMDFCBorderless',
  label: 'Transform Addon Arrows (Borderless)',
  frames
};

export default TransformAddonMDFCBorderless;
