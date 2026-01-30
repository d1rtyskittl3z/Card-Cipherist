import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Shared bounds
const bounds: Bounds = { x: 64 / 2010, y: 81 / 2814, width: 1886 / 2010, height: 482 / 2814 };
const innerBounds: Bounds = { x: 345 / 2010, y: 97 / 2814, width: 1325 / 2010, height: 60 / 2814 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/8th/crowns/w.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Blue Legend Crown', src: '/img/frames/8th/crowns/u.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Black Legend Crown', src: '/img/frames/8th/crowns/b.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Red Legend Crown', src: '/img/frames/8th/crowns/r.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Green Legend Crown', src: '/img/frames/8th/crowns/g.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Multicolored Legend Crown', src: '/img/frames/8th/crowns/m.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Artifact Legend Crown', src: '/img/frames/8th/crowns/a.png', bounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Land Legend Crown', src: '/img/frames/8th/crowns/l.png', bounds, complementary: 'Legend Crown Border Cover' },
//   { name: 'Colorless Legend Crown', src: '/img/frames/8th/crowns/c.png', bounds, complementary: 'Legend Crown Border Cover' }, //MISSING
  { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0, y: 0, width: 1, height: 160 / 2814 } },
  { name: 'White Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/w.png', bounds: innerBounds },
  { name: 'Blue Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/u.png', bounds: innerBounds },
  { name: 'Black Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/b.png', bounds: innerBounds },
  { name: 'Red Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/r.png', bounds: innerBounds },
  { name: 'Green Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/g.png', bounds: innerBounds },
  { name: 'Multicolored Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/m.png', bounds: innerBounds },
  { name: 'Artifact Inner Crown (Nyx)', src: '/img/frames/8th/crowns/inner/nyx/a.png', bounds: innerBounds },
  { name: 'White Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/companion/w.png', bounds: innerBounds },
  { name: 'Blue Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/companion/u.png', bounds: innerBounds },
  { name: 'Black Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/companion/b.png', bounds: innerBounds },
//   { name: 'Red Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/nycompanionx/r.png', bounds: innerBounds }, //MISSING
  { name: 'Green Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/companion/g.png', bounds: innerBounds },
  { name: 'Multicolored Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/companion/m.png', bounds: innerBounds },
  { name: 'Artifact Inner Crown (Companion)', src: '/img/frames/8th/crowns/inner/companion/a.png', bounds: innerBounds },
];

// Template
const template: FramePackTemplate = {
  id: '8thLegendCrowns',
  label: 'Eighth Edition Legend Crowns',
  notice: 'Addon pack providing legend crown overlays for Eighth Edition style cards. Select a crown to automatically add the border cover frame.',
  frames,
};

export default template;
