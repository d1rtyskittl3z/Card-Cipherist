import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'Purple Frame', src: '/img/frames/m15/custom/purple.png', masks },
  { name: 'Midnight Frame', src: '/img/frames/m15/custom/m15Midnight.png', masks },
  { name: 'PT Inner Fill', src: '/img/frames/m15/custom/m15CustomPTInnerFill.png', bounds: { x: 0.79, y: 0.8977, width: 0.1414, height: 0.04 } },
];

const template: FramePackTemplate = {
  id: 'MiscCustom',
  label: 'Misc. Custom Frames',
  frames,
};

export default template;
