import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Post-M15', src: '/img/frames/m15/theList/regular.svg' },
  { name: 'Pre-M15', src: '/img/frames/m15/theList/old.svg' },
];

const template: FramePackTemplate = {
  id: 'TheList',
  label: '"The List" Stamp',
  frames,
};

export default template;
