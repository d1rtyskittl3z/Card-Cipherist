import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Marker Frame', src: '/img/frames/token/marker/marker.png' },
];

const template: FramePackTemplate = {
  id: 'TokenMarker',
  label: 'Marker Card',
  version: 'tokenMarker',
  artBounds: { x: 0.04, y: 0.0286, width: 0.92, height: 0.8953 },
  setSymbolBounds: { x: 0.9213, y: 0.7024, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.8458, width: 0.75, height: 0.1191 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 0.0854, y: 0.6781, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenbsc', size: 0.0381, color: 'white', align: 'center' },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7424, width: 0.828, height: 0.1767, size: 0.0362, color: 'white' },
  },
};

export default template;
