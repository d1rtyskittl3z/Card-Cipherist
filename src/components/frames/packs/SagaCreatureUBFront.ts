import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/saga/creature/transform-front/masks/pinline.png', name: 'Pinline' },
  { src: '/img/frames/saga/creature/transform-front/masks/title.png', name: 'Title' },
  { src: '/img/frames/saga/creature/masks/sagaMaskType.png', name: 'Type' },
  { src: '/img/frames/saga/creature/transform-front/masks/frame.png', name: 'Frame' },
  { src: '/img/frames/saga/creature/masks/sagaMaskBanner.png', name: 'Banner' },
  { src: '/img/frames/saga/creature/masks/sagaMaskBannerRight.png', name: 'Banner (Right)' },
  { src: '/img/frames/saga/creature/transform-front/masks/text.png', name: 'Text' },
  { src: '/img/frames/saga/creature/transform-front/masks/border.png', name: 'Border' },
];

const ptBounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };
const stripeBounds = { x: 145 / 2010, y: 572 / 2814, width: 18 / 2010, height: 1333 / 2814 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/saga/creature/ub/transform-front/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/saga/creature/ub/transform-front/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/saga/creature/ub/transform-front/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/saga/creature/ub/transform-front/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/saga/creature/ub/transform-front/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/saga/creature/ub/transform-front/m.png', masks },
  { name: 'Banner Pinstripe (Multicolored)', src: '/img/frames/saga/creature/sagaMidStripe.png', bounds: stripeBounds },
  { name: 'White Power/Toughness', src: '/img/frames/m15/ub/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/ub/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/ub/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/ub/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/ub/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/ub/pt/m.png', bounds: ptBounds },
];

const template: FramePackTemplate = {
  id: 'SagaCreatureUBFront',
  label: 'Saga Creatures (Universes Beyond) (Front)',
  version: 'sagaCreatureUBTransformFront',
  artBounds: { x: 1009 / 2010, y: 588 / 2814, width: 844 / 2010, height: 1533 / 2814 },
  setSymbolBounds: { x: 0.9227, y: 2218 / 2814, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.3027, y: 0.4748, width: 0.3547, height: 0.6767 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.16, y: 0.0522, width: 0.7547, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 2151 / 2814, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    ability0: { name: 'Ability 1', text: '', x: 0.1334, y: 0.215, width: 0.35, height: 0.1786, size: 0.0305 },
    ability1: { name: 'Ability 2', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
    ability2: { name: 'Ability 3', text: '', x: 0.1334, y: 0, width: 0.35, height: 0.1786, size: 0.0305 },
    ability3: { name: 'Ability 4', text: '', x: 0.1334, y: 0, width: 0.35, height: 0, size: 0.0305 },
    rules2: { name: 'Rules Text', text: '', x: 160 / 2010, y: 2333 / 2814, width: 1692 / 2010, height: 257 / 2814, size: 0.0305, color: 'black', align: 'center' },
    reminder: { name: 'Reminder Text', text: '{i}(As this Saga enters and after your draw step,//{right40}add a lore counter. Sacrifice after III.)', x: 0.0867, y: 0.116, width: 0.844, height: 0.0828, size: 0.0312, shadowColor: 'white' },
    reversePT: { name: 'Reverse PT', text: '', x: 0.086, y: 0.842, width: 0.838, height: 0.0362, size: 0.0291, oneLine: true, color: '#666', align: 'right', font: 'belerenbsc' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
