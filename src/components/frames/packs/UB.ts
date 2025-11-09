import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const stampBounds = { x: 0.4254, y: 0.9005, width: 0.1494, height: 0.0486 };

const frames: FrameItem[] = [
  // Regular frames
  { name: 'White Frame', src: '/img/frames/m15/ub/regular/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/ub/regular/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/ub/regular/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/ub/regular/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/ub/regular/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/ub/regular/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/ub/regular/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/ub/regular/l.png', masks },
  
  // Enchantment frames
  { name: 'White Enchantment Frame', src: '/img/frames/m15/ub/regular/we.png', masks },
  { name: 'Blue Enchantment Frame', src: '/img/frames/m15/ub/regular/ue.png', masks },
  { name: 'Black Enchantment Frame', src: '/img/frames/m15/ub/regular/be.png', masks },
  { name: 'Red Enchantment Frame', src: '/img/frames/m15/ub/regular/re.png', masks },
  { name: 'Green Enchantment Frame', src: '/img/frames/m15/ub/regular/ge.png', masks },
  { name: 'Multicolored Enchantment Frame', src: '/img/frames/m15/ub/regular/me.png', masks },
  { name: 'Artifact Enchantment Frame', src: '/img/frames/m15/ub/regular/ae.png', masks },
  
  // Additional frames
  { name: 'Land Frame', src: '/img/frames/m15/ub/regular/l.png', masks },
  { name: 'Vehicle Frame', src: '/img/frames/m15/ub/regular/v.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/m15/ub/regular/c.png', masks },
  
  // Land frames with color identity
  { name: 'White Land Frame', src: '/img/frames/m15/ub/regular/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/ub/regular/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/ub/regular/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/ub/regular/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/ub/regular/gl.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/ub/regular/ml.png', masks },
  
  // Power/Toughness frames
  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds: ptBounds },
  { name: 'Vehicle Power/Toughness', src: '/img/frames/m15/ub/pt/v.png', bounds: ptBounds },
  
  // Holo Stamps
  { name: 'White Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/w.png', bounds: stampBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/u.png', bounds: stampBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/b.png', bounds: stampBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/r.png', bounds: stampBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/g.png', bounds: stampBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/m.png', bounds: stampBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/a.png', bounds: stampBounds },
  { name: 'Land Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/l.png', bounds: stampBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/gray.png', bounds: stampBounds }
// MISSING  { name: 'Gold Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/gold.png', bounds: stampBounds }
];

const template: FramePackTemplate = {
  id: 'UB',
  label: 'Universes Beyond',
  version: 'ubRegular',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
