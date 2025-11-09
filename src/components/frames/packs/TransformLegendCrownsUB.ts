import type { FramePackTemplate, Mask, FrameItem } from './types';

// Common masks for legend crown frames
const masks: Mask[] = [
  { src: '/img/frames/m15/crowns/m15MaskLegendCrown.png', name: 'Crown Without Pinlines' },
  { src: '/img/frames/m15/crowns/m15MaskLegendCrownPinline.png', name: 'Crown With Pinlines' }
];

// Bounds for legend crowns (positioned at top of card)
const crownBounds = { x: 0.0274, y: 0.0191, width: 0.9454, height: 0.1667 };

// Border cover bounds (hides border behind crown)
const borderCoverBounds = { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 };

const frames: FrameItem[] = [
  // Front-side legend crowns with masks - automatically add border cover (index 16) when no mask is selected
  { name: 'White Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/w.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/u.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/b.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/r.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/g.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/m.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/a.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/transform/crowns/ub/regular/l.png', masks, bounds: crownBounds, complementary: 16 },
  
  // Back-side legend crowns with masks - automatically add border cover (index 16) when no mask is selected
  { name: 'White Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/w.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Blue Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/u.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Black Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/b.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Red Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/r.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Green Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/g.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Multicolored Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/m.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Artifact Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/a.png', masks, bounds: crownBounds, complementary: 16 },
  { name: 'Land Legend Crown (Back)', src: '/img/frames/m15/transform/crowns/ub/regular/new/l.png', masks, bounds: crownBounds, complementary: 16 },
  
  // Border cover (uses black.png to hide border behind crown)
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: borderCoverBounds }
];

const template: FramePackTemplate = {
  id: 'TransformLegendCrownsUB',
  label: 'Legend Crowns (Transform) (Universes Beyond)',
  notice: 'Legend crowns for double-faced transforming cards. Includes both front and back variants. When added without a mask, they automatically include the border cover frame to hide the black border.',
  // Addon-only pack (no version/artBounds/setSymbolBounds/watermarkBounds) - uses base frame settings
  frames
};

export default template;
