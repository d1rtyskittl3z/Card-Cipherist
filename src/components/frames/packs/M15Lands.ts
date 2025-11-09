import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const watermarkBounds = { x: 0.3267, y: 0.6491, width: 0.3474, height: 0.2496 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/regular/lw.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/regular/lu.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/regular/lb.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/regular/lr.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/regular/lg.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/regular/lm.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/m15/regular/ll.png', masks },
  { name: 'Plains Watermark', src: '/img/frames/m15/basics/w.png', bounds: watermarkBounds },
  { name: 'Island Watermark', src: '/img/frames/m15/basics/u.png', bounds: watermarkBounds },
  { name: 'Swamp Watermark', src: '/img/frames/m15/basics/b.png', bounds: watermarkBounds },
  { name: 'Mountain Watermark', src: '/img/frames/m15/basics/r.png', bounds: watermarkBounds },
  { name: 'Forest Watermark', src: '/img/frames/m15/basics/g.png', bounds: watermarkBounds },
  { name: 'Wastes Watermark', src: '/img/frames/m15/basics/c.png', bounds: watermarkBounds },
];

const template: FramePackTemplate = {
  id: 'M15Lands',
  label: 'Lands',
  frames,
};

export default template;
