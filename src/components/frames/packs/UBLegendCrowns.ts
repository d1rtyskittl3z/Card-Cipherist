import type { FramePackTemplate, Mask, FrameItem } from './types';

// Common masks for legend crown frames
const masks: Mask[] = [
  { src: '/img/frames/m15/crowns/m15MaskLegendCrown.png', name: 'Crown Without Pinlines' },
  { src: '/img/frames/m15/ub/crowns/m15MaskLegendCrownPinline.png', name: 'Crown With Pinlines' }
];

// Bounds for legend crowns (positioned at top of card)
const crownBounds = { x: 0.0274, y: 0.0191, width: 0.9454, height: 0.1667 };

// Border cover bounds (hides border behind crown)
const borderCoverBounds = { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 };

const frames: FrameItem[] = [
  // Legend crowns with masks - automatically add border cover (index 9) when no mask is selected
  { name: 'White Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownW.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownU.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownB.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownR.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownG.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownM.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownA.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/ub/crowns/m15CrownL.png', masks, bounds: crownBounds, complementary: 9 },
  { name: 'Colorless Legend Crown', src: '/img/frames/m15/crowns/m15CrownC.png', masks, bounds: crownBounds, complementary: 9 },
  
  // Border cover (uses black.png to hide border behind crown)
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: borderCoverBounds }
];

const template: FramePackTemplate = {
  id: 'UBLegendCrowns',
  label: 'Legend Crowns (Universes Beyond)',
  notice: 'Legend crowns are decorative overlays for legendary creatures. When added without a mask, they automatically include the border cover frame to hide the black border.',
  // Addon-only pack (no version/artBounds/setSymbolBounds/watermarkBounds) - uses base frame settings
  frames
};

export default template;
