import type { FramePackTemplate, Mask, FrameItem } from './types';

const stampBounds = { x: 894 / 2010, y: 2559 / 2814, width: 216 / 2010, height: 121 / 2814 };

const masks: Mask[] = [
  { src: '/img/frames/m15/room/maskRight.png', name: 'Right Side' },
  { src:'/img/frames/m15/split/maskTopRight.png', name:'Top Right'}, 
  { src:'/img/frames/m15/split/maskBottomLeft.png', name:'Bottom Left'},
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/room/ub/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/room/ub/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/room/ub/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/room/ub/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/room/ub/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/room/ub/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/room/ub/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/room/ub/l.png', masks },
  { name: 'Holo Stamp', src: '/img/frames/m15/room/ub/stamp.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/room/ub/grayStamp.png', bounds: stampBounds },
];

const template: FramePackTemplate = {
  id: 'RoomUB',
  label: 'Rooms (Universes Beyond)',
  version: 'room',
  artBounds: { x: -0.196, y: 0.2756, width: 1.22, height: 0.4080, rotation: -90 },
  setSymbolBounds: { x: 1140 / 2010, y: 250 / 2814, width: 0.12, height: 0.0280, vertical: 'center', horizontal: 'center', rotation: -90 },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost (Left)', text: '', x: 130 / 2010, y: 0.8943, width: 0.5367, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, rotation: -90 },
    title: { name: 'Title (Left)', text: '', x: 105 / 2010, y: 0.8943, width: 0.5367, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: -90 },
    type: { name: 'Type', text: '', x: 0.55, y: 0.8943, width: 1762 / 1500, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, color: 'white', rotation: -90 },
    rules: { name: 'Rules Text (Left)', text: '', x: 1054 / 1500, y: 0.8896, width: 776 / 1500, height: 372 / 2100, size: 0.0362, rotation: -90 },
    mana2: { name: 'Mana Cost (Right)', text: '', x: 130 / 2010, y: 0.4381, width: 0.5367, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0, rotation: -90 },
    title2: { name: 'Title (Right)', text: '', x: 105 / 2010, y: 0.4381, width: 0.5367, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, rotation: -90 },
    type2: { name: 'Type 2', text: '', x: 0.55, y: 0.8943, width: 1762 / 1500, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, align: 'right', color: 'white', rotation: -90 },
    rules2: { name: 'Rules Text (Right)', text: '', x: 1054 / 1500, y: 0.4334, width: 776 / 1500, height: 372 / 2100, size: 0.0362, rotation: -90 },
    reminder: { name: 'Room Rules', text: '{i}(You may cast either half. That door unlocks on the battlefield. As a sorcery, you may pay the mana cost of a locked door to unlock it.){/i}', x: 916 / 1500, y: 1868 / 2100, width: 1734 / 1500, height: 110 / 2100, color: 'white', align: 'center', size: 0.0362, rotation: -90 },
  },
};

export default template;
