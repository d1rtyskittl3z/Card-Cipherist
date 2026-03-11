import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/pixelTMT/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/pixelTMT/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/pixelTMT/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/pixelTMT/masks/maskTextBoxes.png', name: 'Text Boxes' },
  { src: '/img/frames/pixelTMT/masks/maskPinlines.png', name: 'Full Pinlines' },
  { src: '/img/frames/pixelTMT/masks/maskWhitePinlines.png', name: 'White Pinlines' },
  { src: '/img/frames/pixelTMT/masks/maskSingleColorPinlines.png', name: 'Single Color Pinlines' },
  { src: '/img/frames/pixelTMT/masks/maskDualLight.png', name: 'Light Color Dual Pinlines' },
  { src: '/img/frames/pixelTMT/masks/maskDualDark.png', name: 'Dark Color Dual Pinlines' },
  { src: '/img/frames/pixelTMT/masks/maskBorder.png', name: 'Border' },
];

const ptMasks: Mask[] = [
  { src: '/img/frames/pixelTMT/pt/masks/maskInnerFill.png', name: 'Inner Fill' },
  { src: '/img/frames/pixelTMT/pt/masks/maskWhitePinline.png', name: 'White Pinlines' },
  { src: '/img/frames/pixelTMT/pt/masks/maskSingle.png', name: 'Single Color Pinlines' },
  { src: '/img/frames/pixelTMT/pt/masks/maskDualLight.png', name: 'Light Color Dual Pinlines' },
  { src: '/img/frames/pixelTMT/pt/masks/maskDualDark.png', name: 'Dark Color Dual Pinlines' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/pixelTMT/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/pixelTMT/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/pixelTMT/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/pixelTMT/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/pixelTMT/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/pixelTMT/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/pixelTMT/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/pixelTMT/c.png', masks },
  { name: 'White (Alt) Frame', src: '/img/frames/pixelTMT/wAlt.png', masks },

  { name: 'White Power/Toughness', src: '/img/frames/pixelTMT/pt/w.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Blue Power/Toughness', src: '/img/frames/pixelTMT/pt/u.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Black Power/Toughness', src: '/img/frames/pixelTMT/pt/b.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Red Power/Toughness', src: '/img/frames/pixelTMT/pt/r.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Green Power/Toughness', src: '/img/frames/pixelTMT/pt/g.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/pixelTMT/pt/m.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Artifact Power/Toughness', src: '/img/frames/pixelTMT/pt/a.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'Colorless Power/Toughness', src: '/img/frames/pixelTMT/pt/c.png', masks: ptMasks, complementary: 'PT Cover' },
  { name: 'White (Alt) Power/Toughness', src: '/img/frames/pixelTMT/pt/wAlt.png', masks: ptMasks, complementary: 'PT Cover' },

  { name: 'The Teenage Mutant Ninja Turtles', src: '/img/frames/pixelTMT/characters/4turtle.png' },
  { name: 'Leonardo', src: '/img/frames/pixelTMT/characters/leo.png' },
  { name: 'Raphael', src: '/img/frames/pixelTMT/characters/raph.png' },
  { name: 'Donatello', src: '/img/frames/pixelTMT/characters/don.png' },
  { name: 'Michelangelo', src: '/img/frames/pixelTMT/characters/michael.png' },
  { name: 'April', src: '/img/frames/pixelTMT/characters/april.png' },
  { name: 'Bebop', src: '/img/frames/pixelTMT/characters/bebop.png' },
  { name: 'Casey Jones', src: '/img/frames/pixelTMT/characters/casey.png' },
  { name: 'Krang', src: '/img/frames/pixelTMT/characters/krang.png' },
  { name: 'Mouser', src: '/img/frames/pixelTMT/characters/mouser.png' },
  { name: 'Pizza', src: '/img/frames/pixelTMT/characters/pizza.png' },
  { name: 'Rocksteady', src: '/img/frames/pixelTMT/characters/rocksteady.png' },
  { name: 'Shredder', src: '/img/frames/pixelTMT/characters/shredder.png' },
  { name: 'Splinter', src: '/img/frames/pixelTMT/characters/splinter.png' },
  { name: 'Super Combo', src: '/img/frames/pixelTMT/characters/superCombo.png' },

  { name: 'PT Cover', src: '/img/frames/pixelTMT/ptCover.png', erase: true },
];

const template: FramePackTemplate = {
  id: 'PixelTMT',
  label: 'Pixel (TMT)',
  version: 'pixelTMT',
  replacementMasks: {
    'Right Half': { src: '/img/frames/pixelTMT/masks/maskRightHalf.png', preserveAlpha: true },
    'Left Half': { src: '/img/frames/pixelTMT/masks/maskLeftHalf.png', preserveAlpha: true },
  },
  artBounds: { x: 0, y: 0, width: 1, height: 0.9320 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0460, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7692, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 194 / 2814, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', manaCost: true, manaSpacing: 0, manaPrefix: 'pixel' },
    title: { name: 'Title', text: '', x: 155 / 2010, y: 125 / 2814, width: 1500 / 2010, height: 220 / 2814, oneLine: true, font: 'pixelfont', size: 0.0480, allCaps: true, color: 'white' },
    type: { name: 'Type', text: '', x: 155 / 2010, y: 0.5664, width: 1489 / 2010, height: 0.0543, oneLine: true, font: 'pixelfont', size: 0.0400, allCaps: true, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 155 / 2010, y: 1810 / 2814, width: 1710 / 2010, height: 690 / 2814, size: 0.0362, font: 'pixelfont', color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 1641 / 2010, y: 2454 / 2814, width: 0.1367, height: 0.0372, size: 0.0430, font: 'pixelfont', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
