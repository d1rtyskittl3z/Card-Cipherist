import type { FramePackTemplate, FrameItem } from './types';

// Bounds for floating legend crowns (slightly different positioning than standard crowns)
const crownBounds = { x: 0.0307, y: 0.0191, width: 0.9387, height: 0.1024 };

// Border cover and cutout bounds
const borderCoverBounds = { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 };
const lowerCutoutBounds = { x: 0.0734, y: 0.1096, width: 0.8532, height: 0.0143 };
const outlineBounds = { x: 0.028, y: 0.0172, width: 0.944, height: 0.1062 };

const frames: FrameItem[] = [
  // Floating legend crowns - automatically add border cover (index 9) when no mask is selected
  { name: 'White Legend Crown', src: '/img/frames/m15/ub/crowns/floating/w.png', bounds: crownBounds, complementary: 9 },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/ub/crowns/floating/u.png', bounds: crownBounds, complementary: 9 },
  { name: 'Black Legend Crown', src: '/img/frames/m15/ub/crowns/floating/b.png', bounds: crownBounds, complementary: 9 },
  { name: 'Red Legend Crown', src: '/img/frames/m15/ub/crowns/floating/r.png', bounds: crownBounds, complementary: 9 },
  { name: 'Green Legend Crown', src: '/img/frames/m15/ub/crowns/floating/g.png', bounds: crownBounds, complementary: 9 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/ub/crowns/floating/m.png', bounds: crownBounds, complementary: 9 },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/ub/crowns/floating/a.png', bounds: crownBounds, complementary: 9 },
  { name: 'Land Legend Crown', src: '/img/frames/m15/ub/crowns/floating/l.png', bounds: crownBounds, complementary: 9 },
  { name: 'Colorless Legend Crown', src: '/img/frames/m15/ub/crowns/floating/c.png', bounds: crownBounds, complementary: 9 },
  
  // Support elements
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: borderCoverBounds },
  { name: 'Legend Crown Lower Cutout', src: '/img/black.png', bounds: lowerCutoutBounds, erase: true }, // Erases pixels to create cutout effect
  { name: 'Legend Crown Outline', src: '/img/frames/m15/crowns/m15CrownFloatingOutline.png', bounds: outlineBounds }
];

const template: FramePackTemplate = {
  id: 'UBLegendCrownsFloating',
  label: 'Floating Legend Crowns (Universes Beyond)',
  notice: 'Floating legend crowns with a unique layered design for Universes Beyond cards. The "Lower Cutout" frame uses erase mode to create a cutout effect below the crown. When added, crowns automatically include the border cover.',
  // Addon-only pack (no version/artBounds/setSymbolBounds/watermarkBounds) - uses base frame settings
  frames
};

export default template;
