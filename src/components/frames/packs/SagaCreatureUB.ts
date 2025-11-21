import type { FramePackTemplate, FrameItem, Mask, TextConfig } from './types';

const bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const bounds2 = { x: 0.4254, y: 0.9005, width: 0.1494, height: 0.0486 };

const masks: Mask[] = [
  { src: '/img/frames/saga/creature/masks/sagaMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/saga/creature/masks/sagaMaskType.png', name: 'Type' },
  { src: '/img/frames/saga/creature/masks/sagaMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/saga/creature/masks/sagaMaskBanner.png', name: 'Banner' },
  { src: '/img/frames/saga/creature/masks/sagaMaskBannerRight.png', name: 'Banner (Right)' },
  { src: '/img/frames/saga/creature/masks/sagaMaskText.png', name: 'Text' },
  { src: '/img/frames/saga/creature/masks/sagaMaskBorder.png', name: 'Border' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/saga/creature/ub/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/saga/creature/ub/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/saga/creature/ub/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/saga/creature/ub/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/saga/creature/ub/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/saga/creature/ub/m.png', masks },
//   { name: 'Artifact Frame', src: '/img/frames/saga/creature/ub/a.png', masks },
//   { name: 'Land Frame', src: '/img/frames/saga/creature/ub/l.png', masks },
  { name: 'Banner Pinstripe (Multicolored)', src: '/img/frames/saga/creature/sagaMidStripe.png', bounds: { x: 145 / 2010, y: 572 / 2814, width: 18 / 2010, height: 1333 / 2814 } },
  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/ub/pt/a.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/ub/pt/c.png', bounds },
  { name: 'White Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/w.png', bounds: bounds2 },
  { name: 'Blue Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/u.png', bounds: bounds2 },
  { name: 'Black Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/b.png', bounds: bounds2 },
  { name: 'Red Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/r.png', bounds: bounds2 },
  { name: 'Green Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/g.png', bounds: bounds2 },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/m.png', bounds: bounds2 },
  { name: 'Artifact Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/a.png', bounds: bounds2 },
  { name: 'Land Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/l.png', bounds: bounds2 },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/gray.png', bounds: bounds2 },
  { name: 'Gold Holo Stamp', src: '/img/frames/m15/ub/regular/stamp/gold.png', bounds: bounds2 },
];

const text: Record<string, TextConfig> = {
  mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
  title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
  type: { name: 'Type', text: '', x: 0.0854, y: 2151 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
  ability0: { name: 'Ability 1', text: '', x: 0.1334, y: 0.215, width: 0.35, height: 0.1786, size: 0.0305 },
  ability1: { name: 'Ability 2', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
  ability2: { name: 'Ability 3', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
  ability3: { name: 'Ability 4', text: '', x: 0.1334, y: 0, width: 0.35, height: 0, size: 0.0305 },
  rules2: { name: 'Rules Text', text: '', x: 160 / 2010, y: 2333 / 2814, width: 1692 / 2010, height: 257 / 2814, size: 0.0305, color: 'black', align: 'center' },
  reminder: { name: 'Reminder Text', text: '{i}(As this Saga enters and after your draw step,//{right40}add a lore counter. Sacrifice after III.)', x: 0.0867, y: 0.116, width: 0.844, height: 0.0828, size: 0.0312, shadowColor: 'white' },
  pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
};

const template: FramePackTemplate = {
  id: 'SagaCreatureUB',
  label: 'Universes Beyond Saga Creature Frames',
  version: 'sagaCreatureUB',
  artBounds: { x: 1009 / 2010, y: 588 / 2814, width: 844 / 2010, height: 1533 / 2814 },
  setSymbolBounds: { x: 0.9227, y: 2218 / 2814, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.3027, y: 0.4748, width: 0.3547, height: 0.6767 },
  saga: { x: 0.1, width: 0.3947, defaultAbilities: [1, 1, 1, 1], defaultCount: 3 },
  frames,
  text,
};

export default template;
