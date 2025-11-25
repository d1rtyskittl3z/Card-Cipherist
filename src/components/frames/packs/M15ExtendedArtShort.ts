import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/boxTopper/short/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/boxTopper/short/type.png', name: 'Type' },
  { src: '/img/frames/m15/boxTopper/short/text.svg', name: 'Rules' },
  { src: '/img/frames/m15/boxTopper/short/frame.svg', name: 'Frame' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

// Shared bounds
const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const nicknameBevelBounds: Bounds = { x: 0.058, y: 0.111, width: 0.884, height: 0.0381 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/boxTopper/short/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/boxTopper/short/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/boxTopper/short/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/boxTopper/short/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/boxTopper/short/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/boxTopper/short/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/boxTopper/short/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/m15/boxTopper/short/l.png', masks },
  { name: 'White Land Frame', src: '/img/frames/m15/boxTopper/short/wl.png', masks },
  { name: 'Blue Land Frame', src: '/img/frames/m15/boxTopper/short/ul.png', masks },
  { name: 'Black Land Frame', src: '/img/frames/m15/boxTopper/short/bl.png', masks },
  { name: 'Red Land Frame', src: '/img/frames/m15/boxTopper/short/rl.png', masks },
  { name: 'Green Land Frame', src: '/img/frames/m15/boxTopper/short/gl.png', masks },
  { name: 'Multicolored Land Frame', src: '/img/frames/m15/boxTopper/short/ml.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/regular/m15PTW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/regular/m15PTU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/regular/m15PTB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/regular/m15PTR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/regular/m15PTG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/regular/m15PTM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/regular/m15PTA.png', bounds },
  { name: 'Bevel Cutout for Nickname', src: '/img/black.png', bounds: nicknameBevelBounds, erase: true },
  { name: 'Nickname Bevel', src: '/img/frames/m15/boxTopper/m15BoxTopperNicknameBevel.png', bounds: nicknameBevelBounds },
  { name: 'White Nyx Frame', src: '/img/frames/extended/shorter/nyx/w.png', masks },
  { name: 'Blue Nyx Frame', src: '/img/frames/extended/shorter/nyx/u.png', masks },
  { name: 'Black Nyx Frame', src: '/img/frames/extended/shorter/nyx/b.png', masks },
  { name: 'Red Nyx Frame', src: '/img/frames/extended/shorter/nyx/r.png', masks },
  { name: 'Green Nyx Frame', src: '/img/frames/extended/shorter/nyx/g.png', masks },
  { name: 'Multicolored Nyx Frame', src: '/img/frames/extended/shorter/nyx/m.png', masks },
  { name: 'Artifact Nyx Frame', src: '/img/frames/extended/shorter/nyx/a.png', masks },
  { name: 'White Snow Frame', src: '/img/frames/extended/shorter/snow/w.png', masks },
  { name: 'Blue Snow Frame', src: '/img/frames/extended/shorter/snow/u.png', masks },
  { name: 'Black Snow Frame', src: '/img/frames/extended/shorter/snow/b.png', masks },
  { name: 'Red Snow Frame', src: '/img/frames/extended/shorter/snow/r.png', masks },
  { name: 'Green Snow Frame', src: '/img/frames/extended/shorter/snow/g.png', masks },
  { name: 'Multicolored Snow Frame', src: '/img/frames/extended/shorter/snow/m.png', masks },
  { name: 'Artifact Snow Frame', src: '/img/frames/extended/shorter/snow/a.png', masks },
  { name: 'Land Snow Frame', src: '/img/frames/extended/shorter/snow/l.png', masks }
];

// Template
const template: FramePackTemplate = {
  id: 'M15ExtendedArtShort',
  label: 'Extended Art (Shorter Textbox)',
  version: 'm15ExtendedArtShort',
  artBounds: { x: 0, y: 0.081, width: 1, height: 0.5753 },
  setSymbolBounds: { x: 0.9213, y: 0.6343, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7978, width: 0.75, height: 0.1872 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.61, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6743, width: 0.828, height: 0.2448, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' }
  }
};

export default template;
