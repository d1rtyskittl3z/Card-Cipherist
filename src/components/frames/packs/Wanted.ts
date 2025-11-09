import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Shared bounds for power/toughness boxes
const ptBounds: Bounds = {
  x: 1351 / 2010,
  y: 2395 / 2817,
  width: 642 / 2010,
  height: 271 / 2817,
};

// Shared bounds for holo stamps
const stampBounds: Bounds = {
  x: 714 / 2010,
  y: 2490 / 2817,
  width: 630 / 2010,
  height: 182 / 2817,
};

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/wanted/w.png' },
  { name: 'Blue Frame', src: '/img/frames/wanted/u.png' },
  { name: 'Black Frame', src: '/img/frames/wanted/b.png' },
  { name: 'Red Frame', src: '/img/frames/wanted/r.png' },
  { name: 'Green Frame', src: '/img/frames/wanted/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/wanted/m.png' },
  { name: 'Artifact Frame', src: '/img/frames/wanted/a.png' },

  { name: 'White Power/Toughness', src: '/img/frames/wanted/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/wanted/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/wanted/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/wanted/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/wanted/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/wanted/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/wanted/pt/a.png', bounds: ptBounds },

  { name: 'White Holo Stamp', src: '/img/frames/wanted/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/wanted/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/wanted/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/wanted/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/wanted/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/wanted/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/wanted/stamp/a.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'Wanted',
  label: 'Wanted Poster (OTJ)',
  version: 'wanted',
  artBounds: {
    x: 215 / 2010,
    y: 652 / 2817,
    width: 1581 / 2010,
    height: 1067 / 2817,
  },
  setSymbolBounds: {
    x: 1860 / 2010,
    y: 1782 / 2814,
    width: 0.12,
    height: 0.041,
    vertical: 'center',
    horizontal: 'right',
  },
  watermarkBounds: {
    x: 0.5,
    y: 0.7762,
    width: 0.75,
    height: 0.2305,
  },
  frames,
  text: {
    mana: {
      name: 'Mana Cost',
      text: '',
      x: 0, // Not used with manaPlacement (but required for type safety)
      y: 0, // Not used with manaPlacement
      width: 0, // Not used with manaPlacement
      height: 0, // Not used with manaPlacement
      size: 95 / 2010,
      manaCost: true,
      manaPrefix: 'wanted',
      vertical: 'center', // CRITICAL: Symbols stack vertically
      manaPlacement: {
        x: [1813 / 2010, 1813 / 2010, 1813 / 2010, 1813 / 2010, 1813 / 2010, 1813 / 2010],
        y: [626 / 2817, 733 / 2817, 840 / 2817, 947 / 2817, 1054 / 2817, 1161 / 2817],
      },
      noVerticalCenter: true,
    },
    title: {
      name: 'Title',
      text: '',
      x: 61 / 2010,
      y: 254 / 2817,
      width: 1889 / 2010,
      height: 175 / 2817,
      oneLine: true,
      font: 'davisonamericana',
      size: 175 / 2187,
      color: '#523c29',
      align: 'center',
    },
    subtitle: {
      name: 'Subtitle',
      text: '',
      x: 61 / 2010,
      y: 445 / 2817,
      width: 1889 / 2010,
      height: 92 / 2817,
      oneLine: true,
      font: 'davisonamericana',
      size: 92 / 2187,
      color: '#523c29',
      align: 'center',
    },
    type: {
      name: 'Type',
      text: '',
      x: 151 / 2010,
      y: 1760 / 2817,
      width: 1490 / 2010,
      height: 70 / 2817,
      oneLine: true,
      font: 'officina',
      size: 76 / 2817,
      color: '#523c29',
    },
    rules: {
      name: 'Rules Text',
      text: '',
      x: 155 / 2010,
      y: 1857 / 2817,
      width: 1703 / 2010,
      height: 678 / 2817,
      size: 81 / 2187,
      font: 'decour',
    },
    pt: {
      name: 'Power/Toughness',
      text: '',
      x: 0.7928,
      y: 2530 / 2817,
      width: 0.1367,
      height: 0.0372,
      size: 0.0372,
      font: 'arialblack',
      oneLine: true,
      align: 'center',
      color: '#523c29',
    },
  },
};

export default template;
