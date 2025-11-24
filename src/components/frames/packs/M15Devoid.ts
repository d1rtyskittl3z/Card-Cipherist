import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/devoid/m15DevoidFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/devoid/m15DevoidFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/devoid/m15DevoidFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/devoid/m15DevoidFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/devoid/m15DevoidFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/devoid/m15DevoidFrameM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/devoid/m15DevoidFrameA.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/devoid/m15DevoidFrameL.png', masks },
  { name: 'Devoid Power/Toughness', src: '/img/frames/m15/devoid/m15DevoidPT.png', bounds: ptBounds },
];

const template: FramePackTemplate = {
  id: 'M15Devoid',
  label: 'Devoid (Zendikar)',
  version: 'm15Devoid',
  artBounds: { x: 0.04, y: 0.1039, width: 0.92, height: 0.9229 },
  frames,
};

export default template;
