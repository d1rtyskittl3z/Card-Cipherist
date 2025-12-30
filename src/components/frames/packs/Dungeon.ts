import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks for dungeon frames
const masks: Mask[] = [
  { src: '/img/frames/dungeon/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/dungeon/regular/frame.svg', name: 'Frame' },
];

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/dungeon/regular/w.png', complementary: 6, masks },
  { name: 'Blue Frame', src: '/img/frames/dungeon/regular/u.png', complementary: 6, masks },
  { name: 'Black Frame', src: '/img/frames/dungeon/regular/b.png', complementary: 6, masks },
  { name: 'Red Frame', src: '/img/frames/dungeon/regular/r.png', complementary: 6, masks },
  { name: 'Green Frame', src: '/img/frames/dungeon/regular/g.png', complementary: 6, masks },
  { name: 'Colorless Frame', src: '/img/frames/dungeon/regular/c.png', complementary: 6, masks },
  { name: 'Floor', src: '/img/frames/dungeon/regular/floor.png' },
];

// Template
const template: FramePackTemplate = {
  id: 'Dungeon',
  label: 'Dungeon (AFR)',
  version: 'dungeon',
  notice: 'Dungeons require the Dungeon tab to configure room layouts. The interface allows you to define room positions, sizes, and doorway placements on a grid system.',
  artBounds: { x: 0, y: 0, width: 1, height: 1 },
  setSymbolBounds: { x: 0.5, y: 0.8967, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.3027, y: 0.4748, width: 0.3547, height: 0.6767 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 0.0381, color: 'white', align: 'center' },
  },
};

export default template;
