import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/new/pinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/new/title.png', name: 'Title' },
  { src: '/img/frames/m15/new/type.png', name: 'Type' },
  { src: '/img/frames/m15/new/rules.png', name: 'Rules' },
  { src: '/img/frames/m15/new/frame.png', name: 'Frame' },
  { src: '/img/frames/m15/new/border.png', name: 'Border' },
];

const innerCrownBounds = { x: 329 / 2010, y: 70 / 2814, width: 1353 / 2010, height: 64 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/new/nyx/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/new/nyx/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/new/nyx/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/new/nyx/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/new/nyx/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/new/nyx/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/new/nyx/a.png', masks },
  { name: 'White Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/w.png', bounds: innerCrownBounds },
  { name: 'Blue Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/u.png', bounds: innerCrownBounds },
  { name: 'Black Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/b.png', bounds: innerCrownBounds },
  { name: 'Red Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/r.png', bounds: innerCrownBounds },
  { name: 'Green Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/g.png', bounds: innerCrownBounds },
  { name: 'Multicolored Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/m.png', bounds: innerCrownBounds },
  { name: 'Artifact Inner Crown (Companion)', src: '/img/frames/m15/innerCrowns/new/companion/a.png', bounds: innerCrownBounds },
];

const template: FramePackTemplate = {
  id: 'M15NyxNew',
  label: 'Nyx (Theros)',
  frames,
};

export default template;
