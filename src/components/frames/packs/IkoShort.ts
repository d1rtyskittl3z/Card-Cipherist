import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/iko/short/masks/maskPinlines.png', name: 'Pinline' },
  { src: '/img/frames/iko/short/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/iko/short/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/iko/short/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/iko/short/masks/maskNoTitle.png', name: 'No Title' },
  { src: '/img/frames/iko/short/masks/maskNoBorder.png', name: 'No Border' },
  { src: '/img/frames/iko/short/masks/maskStraightBorder.png', name: 'Straight Border' },
  { src: '/img/frames/iko/short/masks/maskBorder.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/iko/short/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/iko/short/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/iko/short/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/iko/short/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/iko/short/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/iko/short/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/iko/short/a.png', masks },
  { name: 'Artifact Frame (Alt)', src: '/img/frames/iko/short/a2.png', masks },
  { name: 'Land Frame', src: '/img/frames/iko/short/l.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTW.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTU.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTB.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTR.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTG.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTM.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTA.png', bounds: ptBounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/nickname/m15NicknamePTC.png', bounds: ptBounds },
  { name: 'White Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/w.png', masks },
  { name: 'Blue Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/u.png', masks },
  { name: 'Black Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/b.png', masks },
  { name: 'Red Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/r.png', masks },
  { name: 'Green Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/g.png', masks },
  { name: 'Multicolored Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/m.png', masks },
  { name: 'Artifact Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/a.png', masks },
  { name: 'Artifact Frame (Alt, Colored Textboxes)', src: '/img/frames/iko/short/colored/a2.png', masks },
  { name: 'Land Frame (Colored Textboxes)', src: '/img/frames/iko/short/colored/l.png', masks },
];

const template: FramePackTemplate = {
  id: 'IkoShort',
  label: 'Borderless Frames (Extra Short)',
  version: 'promoRegular',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: { x: 0.9213, y: 0.7272, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.8415, width: 0.75, height: 0.1115 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.7024, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.7647, width: 0.828, height: 0.1543, size: 0.0362, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
