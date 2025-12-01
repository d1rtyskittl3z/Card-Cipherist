import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 2186 / 2010, height: 2974 / 2814 };

const frames: FrameItem[] = [
  { name: 'Black Extension', src: '/img/frames/margins/blackBorderExtension.png', bounds },
  { name: 'Extended Art Extension', src: '/img/frames/margins/new/extendedArt.png', bounds },
];

const template: FramePackTemplate = {
  id: 'MarginNew',
  label: 'Accurate Frame Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
