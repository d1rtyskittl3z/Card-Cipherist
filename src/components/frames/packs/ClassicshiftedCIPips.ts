import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/ciPips/firstHalf.svg', name: 'First Half' },
  { src: '/img/frames/m15/ciPips/secondHalf.svg', name: 'Second Half' },
  { src: '/img/frames/m15/ciPips/firstThird.svg', name: 'First Third' },
  { src: '/img/frames/m15/ciPips/secondThird.svg', name: 'Second Third' },
  { src: '/img/frames/m15/ciPips/thirdThird.svg', name: 'Third Third' },
];

const pipBounds: Bounds = { x: -0.0034, y: 0.0058, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Pip', src: '/img/frames/m15/ciPips/w.svg', masks, complementary: 5, bounds: pipBounds },
  { name: 'Blue Pip', src: '/img/frames/m15/ciPips/u.svg', masks, complementary: 5, bounds: pipBounds },
  { name: 'Black Pip', src: '/img/frames/m15/ciPips/b.svg', masks, complementary: 5, bounds: pipBounds },
  { name: 'Red Pip', src: '/img/frames/m15/ciPips/r.svg', masks, complementary: 5, bounds: pipBounds },
  { name: 'Green Pip', src: '/img/frames/m15/ciPips/g.svg', masks, complementary: 5, bounds: pipBounds },
  { name: 'Color Identity Pip Base', src: '/img/frames/m15/ciPips/base.png', bounds: { x: 0.0734, y: 0.5805, width: 0.0467, height: 0.0334 } },
];

const template: FramePackTemplate = {
  id: 'ClassicshiftedCIPips',
  label: 'Color Identity Pips',
  notice: 'When using color identity pips, we recommend that you shift your Type text to the right with "{right66}".',
  frames,
};

export default template;
