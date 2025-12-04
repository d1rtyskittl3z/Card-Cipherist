import type { FramePackTemplate, FrameItem, Mask } from './types';

const masks: Mask[] = [
  { src: '/img/frames/seventh/regular/pinline.svg', name: 'Pinline' },
  { src: '/img/frames/seventh/regular/rules.svg', name: 'Rules' },
  { src: '/img/frames/seventh/regular/frame.svg', name: 'Frame' },
  { src: '/img/frames/seventh/regular/trim.svg', name: 'Textbox Pinline' },
  { src: '/img/frames/seventh/regular/dual.svg', name: 'Dual Land' },
  { src: '/img/frames/seventh/regular/border.svg', name: 'Border' },
];

const borderMask: Mask[] = [
  { src: '/img/frames/seventh/regular/border.svg', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/seventh/regular/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/seventh/regular/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/seventh/regular/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/seventh/regular/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/seventh/regular/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/seventh/regular/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/seventh/regular/a.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/seventh/regular/c.png', masks },
  { name: 'Land Frame', src: '/img/frames/seventh/regular/l.png', masks },
  { name: 'DCI Star', src: '/img/frames/seventh/foilStar.svg' },
  { name: 'Foil Layer', src: '/img/frames/effects/foil.png', opacity: 20, masks: [{ src: '/img/frames/seventh/foil.svg', name: 'With Star' }, { src: '/img/frames/seventh/foil2.svg', name: 'Without Star' }] },
  { name: 'White Border', src: '/img/frames/white.png', masks: borderMask, noDefaultMask: true },
  { name: 'Silver Border', src: '/img/frames/silver.png', masks: borderMask, noDefaultMask: true },
  { name: 'Gold Border', src: '/img/frames/gold.png', masks: borderMask, noDefaultMask: true },
];

const DEFAULT_ABILITIES: [string, string, string, string] = ['', '+1', '0', ''];
const DEFAULT_ADJUST: [number, number, number, number] = [0, 0, 0, 0];
const DEFAULT_HEIGHTS: [number, number, number, number] = [0.0915, 0.0915, 0.0915, 0];

const template: FramePackTemplate = {
  id: 'PlaneswalkerSeventh',
  label: 'Seventh Edition Planeswalkers',
  version: 'planeswalkerSeventh',
  artBounds: { x: 0.12, y: 0.0991, width: 0.7667, height: 0.4429 },
  setSymbolBounds: { x: 0.9, y: 0.5739, width: 0.12, height: 0.0372, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.18, y: 0.64, width: 0.64, height: 0.24 },
  planeswalker: {
    x: 0.18,
    width: 0.70,
    defaultAbilities: DEFAULT_ABILITIES,
    defaultAbilityAdjust: DEFAULT_ADJUST,
    defaultHeights: DEFAULT_HEIGHTS,
  },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 0.1067, y: 0.0539, width: 0.8174, height: 72 / 2100, oneLine: true, size: 72 / 1638, align: 'right', manaCost: true },
    title: { name: 'Title', text: '', x: 0.1134, y: 0.0481, width: 0.7734, height: 0.041, oneLine: true, font: 'goudymedieval', size: 0.041, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.1074, y: 0.5486, width: 0.7852, height: 0.0543, oneLine: true, size: 0.032, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    ability0: { name: 'Ability 1', text: '', x: 0.18, y: 0.6067, width: 0.70, height: 0.0915, size: 0.0358 },
    ability1: { name: 'Ability 2', text: '', x: 0.18, y: 0, width: 0.70, height: 0.0915, size: 0.0358 },
    ability2: { name: 'Ability 3', text: '', x: 0.18, y: 0, width: 0.70, height: 0.0915, size: 0.0358 },
    ability3: { name: 'Ability 4', text: '', x: 0.18, y: 0, width: 0.70, height: 0, size: 0.0358 },
    loyalty: { name: 'Loyalty', text: '', x: 0.8074, y: 0.9043, width: 0.1367, height: 0.0429, size: 0.0429, oneLine: true, align: 'center', color: 'white' },
  },
  loadBottomInfo: {
    top: { name: 'Artist', text: 'Illus: {elemidinfo-artist}', x: 0.1, y: 1872 / 2100, width: 0.8, height: 0.0267, oneLine: true, font: 'mplantin', size: 0.0267, align: 'center', shadowX: 0.0021, shadowY: 0.0015, color: 'white' },
  },
};

export default template;
