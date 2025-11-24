import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [];

const bounds: Bounds = { x: 115 / 1500, y: 45 / 2100, width: 1270 / 1500, height: 450 / 2100 };
const stampBounds: Bounds = { x: 662 / 1500, y: 1909 / 2100, width: 176 / 1500, height: 80 / 2100 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/tardis/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/tardis/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/tardis/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/tardis/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/tardis/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/tardis/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/tardis/a.png', masks },
//   { name: 'Land Frame', src: '/img/frames/tardis/l.png', masks },
  { name: 'Power/Toughness', src: '/img/frames/tardis/pt.png', bounds: { x: 1133 / 1500, y: 1850 / 2100, width: 299 / 1500, height: 173 / 2100 } },
  { name: 'White Legendary Crown', src: '/img/frames/tardis/crowns/w.png', bounds },
  { name: 'Blue Legendary Crown', src: '/img/frames/tardis/crowns/u.png', bounds },
  { name: 'Black Legendary Crown', src: '/img/frames/tardis/crowns/b.png', bounds },
  { name: 'Red Legendary Crown', src: '/img/frames/tardis/crowns/r.png', bounds },
  { name: 'Green Legendary Crown', src: '/img/frames/tardis/crowns/g.png', bounds },
  { name: 'Multicolored Legendary Crown', src: '/img/frames/tardis/crowns/m.png', bounds },
  { name: 'Artifact Legendary Crown', src: '/img/frames/tardis/crowns/a.png', bounds },
  { name: 'Land Legendary Crown', src: '/img/frames/tardis/crowns/l.png', bounds },
  { name: 'Gold Holo Stamp', src: '/img/frames/tardis/stamp.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/tardis/grayStamp.png', bounds: stampBounds }
];

const template: FramePackTemplate = {
  id: 'TARDIS',
  label: 'TARDIS (WHO)',
  version: 'tardis',
  artBounds: { x: 115 / 1500, y: 264 / 2100, width: 1271 / 1500, height: 898 / 2100 },
  setSymbolBounds: { x: 1337 / 1500, y: 1241 / 2100, width: 86 / 1500, height: 86 / 2100, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 131 / 2100, width: 1390 / 1500, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 111 / 2100, width: 0.8292, height: 0.0543, oneLine: true, font: 'gillsans', size: 79 / 2100, color: 'white', allCaps: true },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 1113 / 1500, height: 0.0543, oneLine: true, font: 'gillsans', size: 0.0324, color: 'white', allCaps: true },
    rules: { name: 'Rules Text', text: '', x: 129 / 1500, y: 1337 / 2100, width: 1242 / 1500, height: 578 / 2100, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 1193 / 1500, y: 1891 / 2100, width: 195 / 1500, height: 78 / 2100, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
