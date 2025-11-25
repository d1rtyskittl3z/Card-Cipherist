import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds
const bounds = { x: 0.0307, y: 0.0191, width: 0.9387, height: 0.092 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Legend Crown', src: '/img/frames/etched/regular/crowns/w.png', bounds, complementary: 9 },
  { name: 'Blue Legend Crown', src: '/img/frames/etched/regular/crowns/u.png', bounds, complementary: 9 },
  { name: 'Black Legend Crown', src: '/img/frames/etched/regular/crowns/b.png', bounds, complementary: 9 },
  { name: 'Red Legend Crown', src: '/img/frames/etched/regular/crowns/r.png', bounds, complementary: 9 },
  { name: 'Green Legend Crown', src: '/img/frames/etched/regular/crowns/g.png', bounds, complementary: 9 },
  { name: 'Multicolored Legend Crown', src: '/img/frames/etched/regular/crowns/m.png', bounds, complementary: 9 },
  { name: 'Artifact Legend Crown', src: '/img/frames/etched/regular/crowns/a.png', bounds, complementary: 9 },
  { name: 'Land Crown', src: '/img/frames/etched/regular/crowns/l.png', bounds, complementary: 9 },
  { name: 'Colorless Crown', src: '/img/frames/etched/regular/crowns/c.png', bounds, complementary: 9 },
  { name: 'Legend Crown Cover', src: '/img/frames/etched/regular/crowns/cover.svg' }
];

// Template
const template: FramePackTemplate = {
  id: 'LegendCrownsEtched',
  label: 'Legend Crowns (Etched)',
  frames
};

export default template;
