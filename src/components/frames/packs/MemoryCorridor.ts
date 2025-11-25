import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [{ src: '/img/frames/memoryCorridor/mask.png', name: 'Highlights' }];
const bptBounds: Bounds = { x: 1545 / 2010, y: 2464 / 2814, width: 369 / 2010, height: 191 / 2814 };
const stampBounds: Bounds = { x: 860 / 2010, y: 2544 / 2814, width: 290 / 2010, height: 123 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/memoryCorridor/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/memoryCorridor/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/memoryCorridor/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/memoryCorridor/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/memoryCorridor/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/memoryCorridor/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/memoryCorridor/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/memoryCorridor/l.png', masks },
  { name: 'White Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/w.png', bounds: bptBounds },
  { name: 'Blue Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/u.png', bounds: bptBounds },
  { name: 'Black Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/b.png', bounds: bptBounds },
  { name: 'Red Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/r.png', bounds: bptBounds },
  { name: 'Green Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/g.png', bounds: bptBounds },
  { name: 'Multicolored Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/m.png', bounds: bptBounds },
  { name: 'Artifact Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/a.png', bounds: bptBounds },
  { name: 'Land Power/Toughness Box', src: '/img/frames/memoryCorridor/pt/l.png', bounds: bptBounds },
  { name: 'Gold Holo Stamp', src: '/img/frames/memoryCorridor/stamp-gold.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/memoryCorridor/stamp.png', bounds: stampBounds }
];

const template: FramePackTemplate = {
  id: 'MemoryCorridor',
  label: 'Memory Corridor (ACR)',
  version: 'memoryCorridor',
  artBounds: { x: 0, y: 0, width: 2010 / 2010, height: 1587 / 2814 },
  setSymbolBounds: { x: 1834 / 2010, y: 1641 / 2814, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 150 / 2010, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'dinnextbold', size: (63 / 2814) * 1.34, allCaps: true },
    type: { name: 'Type', text: '', x: 151 / 2010, y: 1635 / 2814, width: 0.8292, height: 53 / 2814, oneLine: true, font: 'dinnextmedium', size: (53 / 2814) * 1.34, allCaps: true, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 172.86 / 2010, y: 1743.6642 / 2814, width: 1664.28 / 2010, height: 839.6892 / 2814, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 1613.528 / 2010, y: 2529.228 / 2814, width: 0.1367, height: 0.0372, size: (81 / 2814) * 1.43, font: 'dinnextmedium', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
