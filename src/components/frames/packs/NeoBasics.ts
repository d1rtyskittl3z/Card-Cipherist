import type { FramePackTemplate, FrameItem, Mask, StretchConfig } from './types';

const plainsMasks: Mask[] = [
  { src: '/img/frames/neo/basics/masks/w.svg', name: 'Plains Symbol' },
  { src: '/img/frames/neo/basics/masks/title.svg', name: 'Title' },
  { src: '/img/frames/neo/basics/masks/border.svg', name: 'Border' },
];

const islandMasks: Mask[] = [
  { src: '/img/frames/neo/basics/masks/u.svg', name: 'Island Symbol' },
  { src: '/img/frames/neo/basics/masks/title.svg', name: 'Title' },
  { src: '/img/frames/neo/basics/masks/border.svg', name: 'Border' },
];

const swampMasks: Mask[] = [
  { src: '/img/frames/neo/basics/masks/b.svg', name: 'Swamp Symbol' },
  { src: '/img/frames/neo/basics/masks/title.svg', name: 'Title' },
  { src: '/img/frames/neo/basics/masks/border.svg', name: 'Border' },
];

const mountainMasks: Mask[] = [
  { src: '/img/frames/neo/basics/masks/r.svg', name: 'Mountain Symbol' },
  { src: '/img/frames/neo/basics/masks/title.svg', name: 'Title' },
  { src: '/img/frames/neo/basics/masks/border.svg', name: 'Border' },
];

const forestMasks: Mask[] = [
  { src: '/img/frames/neo/basics/masks/g.svg', name: 'Forest Symbol' },
  { src: '/img/frames/neo/basics/masks/title.svg', name: 'Title' },
  { src: '/img/frames/neo/basics/masks/border.svg', name: 'Border' },
];

const colorlessMasks: Mask[] = [
  { src: '/img/frames/neo/basics/masks/c.svg', name: 'Colorless Symbol' },
  { src: '/img/frames/neo/basics/masks/title.svg', name: 'Title' },
  { src: '/img/frames/neo/basics/masks/border.svg', name: 'Border' },
];

const stretch: StretchConfig[] = [
  { name: 'outline', targets: [3, 11], change: [0, 0] },
  { name: 'top', targets: [0, -2], change: [0, 0] },
  { name: 'bottom', targets: [0], change: [0, 0] },
  { name: 'symbol', targets: [0], change: [0, 0] },
  { name: 'Border', targets: [], change: [0, 0] },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/neo/basics/w.svg', stretch, masks: plainsMasks },
  { name: 'Blue Frame', src: '/img/frames/neo/basics/u.svg', stretch, masks: islandMasks },
  { name: 'Black Frame', src: '/img/frames/neo/basics/b.svg', stretch, masks: swampMasks },
  { name: 'Red Frame', src: '/img/frames/neo/basics/r.svg', stretch, masks: mountainMasks },
  { name: 'Green Frame', src: '/img/frames/neo/basics/g.svg', stretch, masks: forestMasks },
  { name: 'Colorless Frame', src: '/img/frames/neo/basics/c.svg', stretch, masks: colorlessMasks },
];

const template: FramePackTemplate = {
  id: 'NeoBasics',
  label: 'Kamigawa Basics (NEO)',
  version: 'neoBasics',
  notice:
    'When you load the Kamigawa Basics frame version, a "Kamigawa Basics" tab will appear. This tab allows you to control the height of the title bar.',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9286 },
  setSymbolBounds: { x: -1, y: -1, width: 0, height: 0, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7705, width: 0.75, height: 0.2362 },
  frames,
  text: {
    title: {
      name: 'Title',
      text: '',
      x: 0.12,
      y: 0.1048,
      width: 0.1734,
      height: 0.2381,
      font: 'japanese-title',
      size: 0.1191,
      align: 'center',
      vertical: true,
      color: 'white',
    },
  },
};

export default template;
