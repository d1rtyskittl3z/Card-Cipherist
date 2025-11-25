import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds
const bounds = { x: 244 / 1500, y: 51 / 2100, width: 1012 / 1500, height: 64 / 2100 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/w.png', bounds },
  { name: 'Blue Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/u.png', bounds },
  { name: 'Black Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/b.png', bounds },
  { name: 'Red Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/r.png', bounds },
  { name: 'Green Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/g.png', bounds },
  { name: 'Multicolored Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/m.png', bounds },
  { name: 'Artifact Inner Crown (Nyx)', src: '/img/frames/etched/regular/innerCrowns/nyx/a.png', bounds },
  { name: 'White Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/w.png', bounds },
  { name: 'Blue Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/u.png', bounds },
  { name: 'Black Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/b.png', bounds },
  { name: 'Red Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/r.png', bounds },
  { name: 'Green Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/g.png', bounds },
  { name: 'Multicolored Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/m.png', bounds },
  { name: 'Artifact Inner Crown (Companion)', src: '/img/frames/etched/regular/innerCrowns/companion/a.png', bounds }
];

// Template
const template: FramePackTemplate = {
  id: 'InnerCrownsEtched',
  label: 'Inner Crowns (Etched)',
  frames
};

export default template;
