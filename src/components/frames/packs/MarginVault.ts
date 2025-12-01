import type { FramePackTemplate, Bounds, FrameItem, Mask } from './types';

const masks: Mask[] = [
  { src: '/img/frames/vault/margin/masks/maskBorderless.png', name: 'Borderless' },
  { src: '/img/frames/vault/margin/masks/maskBottomFrame.png', name: 'Bottom Frame' },
  { src: '/img/frames/vault/margin/masks/maskNoBorder.png', name: 'No Border' },
  { src: '/img/frames/vault/margin/masks/maskBottomFrameNoBorder.png', name: 'Bottom Frame No Border' }
];
const bounds: Bounds = { x: -88 / 2010, y: -80 / 2817, width: 2187 / 2010, height: 2978 / 2817 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/vault/margin/w.png', bounds, ogBounds, masks },
  { name: 'Blue Extension', src: '/img/frames/vault/margin/u.png', bounds, ogBounds, masks },
  { name: 'Black Extension', src: '/img/frames/vault/margin/b.png', bounds, ogBounds, masks },
  { name: 'Red Extension', src: '/img/frames/vault/margin/r.png', bounds, ogBounds, masks },
  { name: 'Green Extension', src: '/img/frames/vault/margin/g.png', bounds, ogBounds, masks },
  { name: 'Multicolored Extension', src: '/img/frames/vault/margin/m.png', bounds, ogBounds, masks },
  { name: 'Artifact Extension', src: '/img/frames/vault/margin/a.png', bounds, ogBounds, masks },
  { name: 'Land Extension', src: '/img/frames/vault/margin/l.png', bounds, ogBounds, masks }
];

const template: FramePackTemplate = {
  id: 'MarginVault',
  label: 'Vault Margins',
  notice: 'If you use a legend crown, make sure to put the margin layer under the crowns layer.',
  frames
};

export default template;
