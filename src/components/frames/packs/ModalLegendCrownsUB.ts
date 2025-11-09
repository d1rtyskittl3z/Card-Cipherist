import type { FramePackTemplate, FrameItem } from './types';

// Bounds for legend crowns (positioned at top of card)
const crownBounds = { x: 0.0274, y: 0.0191, width: 0.9454, height: 0.1667 };

const frames: FrameItem[] = [
  // Legend crowns for modal DFCs - automatically add border cover (index 8) when no mask is selected
  { name: 'White Legend Crown', src: '/img/frames/modal/crowns/ub/w.png', bounds: crownBounds, complementary: 8 },
  { name: 'Blue Legend Crown', src: '/img/frames/modal/crowns/ub/u.png', bounds: crownBounds, complementary: 8 },
  { name: 'Black Legend Crown', src: '/img/frames/modal/crowns/ub/b.png', bounds: crownBounds, complementary: 8 },
  { name: 'Red Legend Crown', src: '/img/frames/modal/crowns/ub/r.png', bounds: crownBounds, complementary: 8 },
  { name: 'Green Legend Crown', src: '/img/frames/modal/crowns/ub/g.png', bounds: crownBounds, complementary: 8 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/modal/crowns/ub/m.png', bounds: crownBounds, complementary: 8 },
  { name: 'Artifact Legend Crown', src: '/img/frames/modal/crowns/ub/a.png', bounds: crownBounds, complementary: 8 },
  { name: 'Land Legend Crown', src: '/img/frames/modal/crowns/ub/l.png', bounds: crownBounds, complementary: 8 },
  
  // Border cover (SVG overlay)
  { name: 'Legend Crown Border Cover', src: '/img/frames/modal/crowns/regular/cover.svg' }
];

const template: FramePackTemplate = {
  id: 'ModalLegendCrownsUB',
  label: 'Legend Crowns (MDFC) (Universes Beyond)',
  notice: 'Legend crowns for modal double-faced cards (MDFCs). When added, they automatically include the border cover frame to hide the modal border.',
  // Addon-only pack (no version/artBounds/setSymbolBounds/watermarkBounds) - uses base frame settings
  frames
};

export default template;
