import type { FramePackTemplate, FrameItem, Mask } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/m15MaskBorderSliver.png', name: 'Border' },
  { src: '/img/frames/m15/m15MaskBorderSliverCrown.png', name: 'Border (With Crown)' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Full Border' },
];

const frames: FrameItem[] = [
  { name: 'White Border', src: '/img/frames/white.png', masks, noDefaultMask: true },
  { name: 'Silver Border', src: '/img/frames/silver.png', masks, noDefaultMask: true },
  { name: 'Gold Border', src: '/img/frames/gold.png', masks, noDefaultMask: true },
];

const template: FramePackTemplate = {
  id: 'M15Borders',
  label: 'Colored Borders',
  frames,
};

export default template;
