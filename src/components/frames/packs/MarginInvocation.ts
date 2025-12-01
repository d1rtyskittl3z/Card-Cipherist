import type { FramePackTemplate, FrameItem } from './types';

// Shared bounds for margin extensions
const bounds = { x: -0.044, y: -1 / 35, width: 1.088, height: 37 / 35 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/invocation/margins/w.png', bounds, ogBounds },
  { name: 'Blue Extension', src: '/img/frames/invocation/margins/u.png', bounds, ogBounds },
  { name: 'Black Extension', src: '/img/frames/invocation/margins/b.png', bounds, ogBounds },
  { name: 'Red Extension', src: '/img/frames/invocation/margins/r.png', bounds, ogBounds },
  { name: 'Green Extension', src: '/img/frames/invocation/margins/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension', src: '/img/frames/invocation/margins/m.png', bounds, ogBounds },
  { name: 'Artifact Extension', src: '/img/frames/invocation/margins/a.png', bounds, ogBounds },
  { name: 'White Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/w.png', bounds, ogBounds },
  { name: 'Blue Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/u.png', bounds, ogBounds },
  { name: 'Black Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/b.png', bounds, ogBounds },
  { name: 'Red Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/r.png', bounds, ogBounds },
  { name: 'Green Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/m.png', bounds, ogBounds },
  { name: 'Artifact Extension (Multiverse Legends)', src: '/img/frames/invocation/mul/margins/a.png', bounds, ogBounds },
  { name: 'White Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/w.png', bounds, ogBounds },
  { name: 'Blue Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/u.png', bounds, ogBounds },
  { name: 'Black Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/b.png', bounds, ogBounds },
  { name: 'Red Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/r.png', bounds, ogBounds },
  { name: 'Green Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/m.png', bounds, ogBounds },
  { name: 'Artifact Extension (Extended Art)', src: '/img/frames/akh/invocation/extended/margins/a.png', bounds, ogBounds },
];

const template: FramePackTemplate = {
  id: 'MarginInvocation',
  label: 'Invocation Margins',
  // notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  frames,
};

export default template;
