import type { FramePackTemplate, FrameItem } from './types';

const innerCrownBounds = { x: 329 / 2010, y: 70 / 2814, width: 1353 / 2010, height: 64 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/w.png', bounds: innerCrownBounds },
  { name: 'Blue Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/u.png', bounds: innerCrownBounds },
  { name: 'Black Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/b.png', bounds: innerCrownBounds },
  { name: 'Red Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/r.png', bounds: innerCrownBounds },
  { name: 'Green Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/g.png', bounds: innerCrownBounds },
  { name: 'Multicolored Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/m.png', bounds: innerCrownBounds },
  { name: 'Artifact Inner Crown (Nyx)', src: '/img/frames/m15/innerCrowns/new/nyx/a.png', bounds: innerCrownBounds },
  { name: 'White Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/ew.png', bounds: innerCrownBounds },
  { name: 'Blue Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/eu.png', bounds: innerCrownBounds },
  { name: 'Black Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/eb.png', bounds: innerCrownBounds },
  { name: 'Red Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/er.png', bounds: innerCrownBounds },
  { name: 'Green Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/eg.png', bounds: innerCrownBounds },
  { name: 'Multicolored Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/em.png', bounds: innerCrownBounds },
  { name: 'Artifact Inner Crown (Nyx Universes Beyond)', src: '/img/frames/m15/innerCrowns/new/nyx/ea.png', bounds: innerCrownBounds },
  { name: 'White Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/w.png', bounds: innerCrownBounds },
  { name: 'Blue Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/u.png', bounds: innerCrownBounds },
  { name: 'Black Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/b.png', bounds: innerCrownBounds },
  { name: 'Red Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/r.png', bounds: innerCrownBounds },
  { name: 'Green Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/g.png', bounds: innerCrownBounds },
  { name: 'Multicolored Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/m.png', bounds: innerCrownBounds },
  { name: 'Artifact Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/a.png', bounds: innerCrownBounds },
];

const template: FramePackTemplate = {
  id: 'M15InnerCrownsNew',
  label: 'Inner Crowns',
  frames,
};

export default template;
