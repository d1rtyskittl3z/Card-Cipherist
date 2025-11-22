import type { FramePackTemplate } from './types';

const bounds = { x: 0.4394, y: 0.9015, width: 0.1214, height: 0.051 };

const template: FramePackTemplate = {
  id: 'PlaneswalkerHoloStamps',
  label: 'Holo Stamps',
  frames: [
    { name: 'White Holo Stamp', src: '/img/frames/planeswalker/holo/w.png', bounds },
    { name: 'Blue Holo Stamp', src: '/img/frames/planeswalker/holo/u.png', bounds },
    { name: 'Black Holo Stamp', src: '/img/frames/planeswalker/holo/b.png', bounds },
    { name: 'Red Holo Stamp', src: '/img/frames/planeswalker/holo/r.png', bounds },
    { name: 'Green Holo Stamp', src: '/img/frames/planeswalker/holo/g.png', bounds },
    { name: 'Multicolored Holo Stamp', src: '/img/frames/planeswalker/holo/m.png', bounds },
    { name: 'Artifact Holo Stamp', src: '/img/frames/planeswalker/holo/a.png', bounds },
    { name: 'Land Holo Stamp', src: '/img/frames/planeswalker/holo/l.png', bounds }
  ]
};

export default template;
