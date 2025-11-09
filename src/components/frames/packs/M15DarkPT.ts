import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTC.png', bounds },
];

const template: FramePackTemplate = {
  id: 'M15DarkPT',
  label: 'Dark Power/Toughness',
  frames,
};

export default template;
