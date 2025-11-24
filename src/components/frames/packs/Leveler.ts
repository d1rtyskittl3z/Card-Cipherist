import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

const masks: Mask[] = [
  { src: '/img/frames/levelers/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/levelers/regular/text.svg', name: 'Rules' },
  { src: '/img/frames/levelers/regular/rulesTop.svg', name: 'Rules (Top)' },
  { src: '/img/frames/levelers/regular/rulesMid.svg', name: 'Rules (Middle)' },
  { src: '/img/frames/levelers/regular/rulesBottom.svg', name: 'Rules (Bottom)' },
  { src: '/img/frames/levelers/regular/levelMid.svg', name: 'Level (Middle)' },
  { src: '/img/frames/levelers/regular/levelBottom.svg', name: 'Level (Bottom)' },
  { src: '/img/frames/levelers/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' },
];

const masks2: Mask[] = [
  { src: '/img/frames/levelers/regular/pt/top.svg', name: 'PT (Top)' },
  { src: '/img/frames/levelers/regular/pt/mid.svg', name: 'PT (Middle)' },
  { src: '/img/frames/levelers/regular/pt/bottom.svg', name: 'PT (Bottom)' },
];

const bounds: Bounds = { x: 0.7574, y: 0.6415, width: 0.188, height: 0.2667 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/levelers/regular/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/levelers/regular/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/levelers/regular/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/levelers/regular/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/levelers/regular/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/levelers/regular/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/levelers/regular/a.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/levelers/regular/v.png', masks },
  { name: 'White PT', src: '/img/frames/levelers/regular/pt/w.png', bounds, masks: masks2 },
  { name: 'Blue PT', src: '/img/frames/levelers/regular/pt/u.png', bounds, masks: masks2 },
  { name: 'Black PT', src: '/img/frames/levelers/regular/pt/b.png', bounds, masks: masks2 },
  { name: 'Red PT', src: '/img/frames/levelers/regular/pt/r.png', bounds, masks: masks2 },
  { name: 'Green PT', src: '/img/frames/levelers/regular/pt/g.png', bounds, masks: masks2 },
  { name: 'Multicolored PT', src: '/img/frames/levelers/regular/pt/m.png', bounds, masks: masks2 },
  { name: 'Artifact PT', src: '/img/frames/levelers/regular/pt/a.png', bounds, masks: masks2 },
  { name: 'Vehicle PT', src: '/img/frames/levelers/regular/pt/v.png', bounds, masks: masks2 },
];

const template: FramePackTemplate = {
  id: 'Leveler',
  label: 'Levelers (Zendikar)',
  version: 'leveler',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    levelup: { name: 'Level Up', text: 'Level up {1}{c} {i}({1}{c}: Put a level counter on this. Level up only as a sorcery.){/i}', x: 0.086, y: 0.6303, width: 0.6834, height: 0.0905, size: 0.0296 },
    rules2: { name: 'Rules Text 2', text: '', x: 0.2067, y: 0.7229, width: 0.5627, height: 0.0953, size: 0.0296 },
    rules3: { name: 'Rules Text 3', text: '', x: 0.2067, y: 0.8220, width: 0.5627, height: 0.0953, size: 0.0296 },
    pt: { name: 'Power/Toughness 1', text: '', x: 0.7928, y: 0.6591, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    pt2: { name: 'Power/Toughness 2', text: '', x: 0.7928, y: 0.7524, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    pt3: { name: 'Power/Toughness 3', text: '', x: 0.7928, y: 0.8515, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
    level2: { name: 'Level 2', text: 'LEVEL\n{fontsize0.02}1-5', x: 0.0727, y: 0.7420, width: 0.08, height: 0.0572, size: 0.0139, font: 'belerenbsc', align: 'center' },
    level3: { name: 'Level 3', text: 'LEVEL\n6+', x: 0.0727, y: 0.8448, width: 0.08, height: 0.0572, size: 0.0139, font: 'belerenbsc', align: 'center' },
  },
};

export default template;
