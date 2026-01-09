import type { FramePackTemplate, FrameItem } from './types';

// Bounds for floating legend crowns
const crownBounds = { x: 59 / 2010, y: 55 / 2814, width: 1901 / 2010, height: 305 / 2814 };
const borderCoverBounds = { x: 78 / 2010, y: 80 / 2814, width: 1855 / 2010, height: 235 / 2814 };
const extendedArtFixEraseBounds = { x: 78 / 2010, y: 80 / 2814, width: 1855 / 2010, height: 250 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/m15/crowns/new/floating/w.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Blue Legend Crown', src: '/img/frames/m15/crowns/new/floating/u.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Black Legend Crown', src: '/img/frames/m15/crowns/new/floating/b.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Red Legend Crown', src: '/img/frames/m15/crowns/new/floating/r.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Green Legend Crown', src: '/img/frames/m15/crowns/new/floating/g.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Multicolored Legend Crown', src: '/img/frames/m15/crowns/new/floating/m.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Artifact Legend Crown', src: '/img/frames/m15/crowns/new/floating/a.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Land Legend Crown', src: '/img/frames/m15/crowns/new/floating/l.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Colorless Legend Crown', src: '/img/frames/m15/crowns/new/floating/c.png', bounds: crownBounds, complementary: 'Legend Crown Border Cover' },
  { name: 'Legend Crown Border Cover', src: '/img/frames/m15/crowns/new/floating/extendedArtFix.png', bounds: borderCoverBounds, complementary: 'Extended Art Fix Erase' },
  { name: 'Extended Art Fix Erase', src: '/img/frames/m15/crowns/new/floating/extendedArtFixErase.png', bounds: extendedArtFixEraseBounds, erase: true },
];

const template: FramePackTemplate = {
  id: 'M15LegendCrownsFloatingNew',
  label: 'Floating Legend Crowns',
  frames,
};

export default template;
