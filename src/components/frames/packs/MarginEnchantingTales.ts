import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 2186 / 2010, height: 2974 / 2814 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/enchantingTales/margin/w.png', bounds, ogBounds },
  { name: 'Blue Extension', src: '/img/frames/enchantingTales/margin/u.png', bounds, ogBounds },
  { name: 'Black Extension', src: '/img/frames/enchantingTales/margin/b.png', bounds, ogBounds },
  { name: 'Red Extension', src: '/img/frames/enchantingTales/margin/r.png', bounds, ogBounds },
  { name: 'Green Extension', src: '/img/frames/enchantingTales/margin/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension', src: '/img/frames/enchantingTales/margin/m.png', bounds, ogBounds },
];

const template: FramePackTemplate = {
  id: 'MarginEnchantingTales',
  label: 'Enchanting Tales Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
