import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/unfinity/mask/titlePinlines.png', name: 'Title Pinlines' },
  { src: '/img/frames/unfinity/mask/title.png', name: 'Title' },
  { src: '/img/frames/unfinity/mask/landSymbol.png', name: 'Land Symbol' },
  { src: '/img/frames/unstable/pinline.svg', name: 'Bottom' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/unfinity/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/unfinity/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/unfinity/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/unfinity/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/unfinity/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/unfinity/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/unfinity/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/unfinity/c.png', masks },
  { name:'Waste Frame', src:'/img/frames/unfinity/L.png', masks},
];

const template: FramePackTemplate = {
  id: 'Unfinity',
  label: 'Unfinity Basics (UNF)',
  version: 'unfinity',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9196 },
  setSymbolBounds: { x: 0.5, y: -0.0639, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
  },
};

export default template;
