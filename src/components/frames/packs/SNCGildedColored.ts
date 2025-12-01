import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/snc/gilded/frame.svg', name: 'Frame' }
];

const bounds: Bounds = { x: 0.05, y: 0.0177, width: 0.9, height: 0.0958 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/snc/gilded/colored/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/snc/gilded/colored/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/snc/gilded/colored/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/snc/gilded/colored/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/snc/gilded/colored/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/snc/gilded/colored/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/snc/gilded/colored/a.png', masks },
  { name: 'Power/Toughness', src: '/img/frames/snc/gilded/colored/pt.png', bounds: { x: 0.7707, y: 0.8843, width: 0.1694, height: 0.0639 } },
  { name: 'White Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/w.png', bounds },
  { name: 'Blue Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/u.png', bounds },
  { name: 'Black Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/b.png', bounds },
  { name: 'Red Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/r.png', bounds },
  { name: 'Green Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/g.png', bounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/m.png', bounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/snc/gilded/colored/crowns/a.png', bounds }
];

const template: FramePackTemplate = {
  id: 'SNCGildedColored',
  label: 'Colored Golden Age (SNC)',
  version: 'sncGildedColored',
  artBounds: { x: 0.078, y: 0.1124, width: 0.844, height: 0.4448 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0629, width: 0.928, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    pt: { name: 'Power/Toughness', text: '', x: 0.788, y: 0.9, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
