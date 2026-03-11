import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Planar Frame (Phenomenon)', src: '/img/frames/planechase/phenomenon.png' },
  { name: 'Planar Frame (1)', src: '/img/frames/planechase/tallest.png' },
  { name: 'Planar Frame (2)', src: '/img/frames/planechase/taller.png' },
  { name: 'Planar Frame (3)', src: '/img/frames/planechase/tall.png' },
  { name: 'Planar Frame (4)', src: '/img/frames/planechase/short.png' },
  { name: 'Planar Frame (5)', src: '/img/frames/planechase/shorter.png' },
  { name: 'Planar Frame (6)', src: '/img/frames/planechase/shortest.png' },
];

const template: FramePackTemplate = {
  id: 'Planechase',
  label: 'Planechase',
  version: 'planechase',
  notice: 'For the large chaos icon, use {planechase}. For smaller icons, use {chaos} and {planeswalker}.',
  canvasDimensions: [3000, 2100, 0, 0],
  landscape: true,
  artBounds: { x: 0.031, y: 0.0434, width: 0.9381, height: 0.9147 },
  setSymbolBounds: { x: 0.7772, y: 0.694, width: 0.12, height: 0.0334, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0643, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0434, align: 'center' },
    type: { name: 'Type', text: '', x: 0.2424, y: 0.6658, width: 0.5152, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0339, align: 'center' },
    rules: { name: 'Rules Text', text: '\n{planechase}Whenever you roll {chaos}, ', x: 0.1158, y: 0.7174, width: 0.7684, height: 0.2087, size: 0.0362 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: '\uFFEE{elemidinfo-artist}', x: 0.0647, y: 0.9434, width: 0.8707, height: 0.0174, oneLine: true, font: 'belerenbsc', size: 0.0174, color: 'white', outlineWidth: 0.003, align: 'center' },
  },
  brush: '/img/manaSymbols/artistbrush.svg',
};

export default template;
