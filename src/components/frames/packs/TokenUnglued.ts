import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/token/unglued/w.png' },
  { name: 'Blue Frame', src: '/img/frames/token/unglued/u.png' },
  { name: 'Black Frame', src: '/img/frames/token/unglued/b.png' },
  { name: 'Red Frame', src: '/img/frames/token/unglued/r.png' },
  { name: 'Green Frame', src: '/img/frames/token/unglued/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/token/unglued/m.png' },
  { name: 'Artifact Frame', src: '/img/frames/token/unglued/a.png' },
  { name: 'Land Frame', src: '/img/frames/token/unglued/l.png' },
];

const template: FramePackTemplate = {
  id: 'TokenUnglued',
  label: 'Unglued',
  version: 'tokenUnglued',
  artBounds: { x: 0.12, y: 0.0972, width: 0.76, height: 0.7672 },
  setSymbolBounds: { x: 0.8914, y: 0.9224, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -2, y: -2, width: 0.64, height: 0.24 },
  frames,
  text: {
    pt: { name: 'Power/Toughness', text: '', x: 0.8074, y: 0.9043, width: 0.1367, height: 0.0429, size: 0.0429, oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus: {elemidinfo-artist}', x: 0.1, y: 0.8829, width: 0.8, height: 0.0267, oneLine: true, font:'mplantin', size: 0.0267, align: 'center', shadowX: 0.0021, shadowY: 0.0015, color: 'white' },
  },
};

export default template;
