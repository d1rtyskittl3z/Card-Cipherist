import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/regular/m15MaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/regular/m15MaskType.png', name: 'Type' },
  { src: '/img/frames/m15/regular/m15MaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

// Shared bounds
const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const blankTextboxBounds: Bounds = { x: 0.0734, y: 0.6253, width: 0.8534, height: 0.2977 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/fnm/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/fnm/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/fnm/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/fnm/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/fnm/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/fnm/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/fnm/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/fnm/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTC.png', bounds },
  { name: 'White Blank Textbox', src: '/img/frames/m15/fnm/blankText/w.png', bounds: blankTextboxBounds },
  { name: 'Blue Blank Textbox', src: '/img/frames/m15/fnm/blankText/u.png', bounds: blankTextboxBounds },
  { name: 'Black Blank Textbox', src: '/img/frames/m15/fnm/blankText/b.png', bounds: blankTextboxBounds },
  { name: 'Red Blank Textbox', src: '/img/frames/m15/fnm/blankText/r.png', bounds: blankTextboxBounds },
  { name: 'Green Blank Textbox', src: '/img/frames/m15/fnm/blankText/g.png', bounds: blankTextboxBounds },
  { name: 'Multicolored Blank Textbox', src: '/img/frames/m15/fnm/blankText/m.png', bounds: blankTextboxBounds },
  { name: 'Artifact Blank Textbox', src: '/img/frames/m15/fnm/blankText/a.png', bounds: blankTextboxBounds },
  { name: 'Colorless Blank Textbox', src: '/img/frames/m15/fnm/blankText/l.png', bounds: blankTextboxBounds }
];

// Template
const template: FramePackTemplate = {
  id: 'FNM',
  label: 'FNM Promo (Inverted Promos)',
  version: 'fnm',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
