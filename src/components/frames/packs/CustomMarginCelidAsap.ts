import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Extended bounds for margin frames (extend beyond normal card boundaries)
const bounds: Bounds = { x: -0.044, y: 0.6143, width: 1.088, height: 0.4143 };
const ogBounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };

const frames: FrameItem[] = [
  { name: 'White Extension', src: '/img/frames/custom/celid/asap/margins/w.png', bounds, ogBounds },
  { name: 'Blue Extension', src: '/img/frames/custom/celid/asap/margins/u.png', bounds, ogBounds },
  { name: 'Black Extension', src: '/img/frames/custom/celid/asap/margins/b.png', bounds, ogBounds },
  { name: 'Red Extension', src: '/img/frames/custom/celid/asap/margins/r.png', bounds, ogBounds },
  { name: 'Green Extension', src: '/img/frames/custom/celid/asap/margins/g.png', bounds, ogBounds },
  { name: 'Multicolored Extension', src: '/img/frames/custom/celid/asap/margins/m.png', bounds, ogBounds },
  { name: 'Artifact Extension', src: '/img/frames/custom/celid/asap/margins/a.png', bounds, ogBounds },
];

const template: FramePackTemplate = {
  id: 'CustomMarginCelidAsap',
  label: "Celid's Asap Margins",
  notice: 'Margin addon pack for Celid\'s Asap frames. Uses loadMarginVersion - apply as overlay on base frames.',
  frames,
};

export default template;
