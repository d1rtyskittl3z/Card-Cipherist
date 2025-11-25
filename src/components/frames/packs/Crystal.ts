import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/crystal/pinline.png', name: 'Pinline' },
  { src: '/img/frames/crystal/title.png', name: 'Title' },
  { src: '/img/frames/crystal/type.png', name: 'Type' },
  { src: '/img/frames/crystal/rules.png', name: 'Rules' },
  { src: '/img/frames/crystal/border.png', name: 'Border' },
];

const bounds = { x: 1157 / 1500, y: 1847 / 2100, width: 294 / 1500, height: 170 / 2100 };
const crownBounds = { x: 0, y: 0, width: 1, height: 107 / 2100 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/crystal/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/crystal/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/crystal/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/crystal/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/crystal/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/crystal/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/crystal/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/crystal/l.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/crystal/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/crystal/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/crystal/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/crystal/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/crystal/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/crystal/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/crystal/pt/a.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/crystal/pt/c.png', bounds },
  { name: 'Land Power/Toughness', src: '/img/frames/crystal/pt/l.png', bounds },

  { name: 'White Legend Crown', src: '/img/frames/crystal/crowns/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/crystal/crowns/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/crystal/crowns/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/crystal/crowns/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/crystal/crowns/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/crystal/crowns/m.png', bounds: crownBounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/crystal/crowns/a.png', bounds: crownBounds },
  { name: 'Colorless Legend Crown', src: '/img/frames/crystal/crowns/c.png', bounds: crownBounds },
  { name: 'Land Legend Crown', src: '/img/frames/crystal/crowns/l.png', bounds: crownBounds },
];

const template: FramePackTemplate = {
  id: 'Crystal',
  label: 'Ikoria Crystal (MOM)',
  version: 'crystal',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  replacementMasks: { 'Right Half': 'img/frames/crystal/maskRightHalf.png' },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 142 / 1500, y: 1342 / 2100, width: 1207 / 1500, height: 573 / 2100, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 1195 / 1500, y: 1904 / 2100, width: 218 / 1500, height: 89 / 2100, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
