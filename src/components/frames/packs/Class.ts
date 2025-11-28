/**
 * Class (D&D) Frame Pack
 * D&D-style class cards with 4 adjustable levels
 */

import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/class/masks/maskPinlines.png', name: 'Pinline' },
  { src: '/img/frames/class/masks/maskBorderlessPinlines.png', name: 'Borderless Pinlines' },
  { src: '/img/frames/class/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/class/masks/maskType.png', name: 'Type' },
  { src: '/img/frames/class/masks/maskFrame.png', name: 'Frame' },
  { src: '/img/frames/class/masks/maskRules.png', name: 'Rules' },
  { src: '/img/frames/class/masks/maskTextBoxes.png', name: 'Text Boxes' },
  { src: '/img/frames/class/textRight.png', name: 'Text, Right Half' },
  { src: '/img/frames/class/masks/maskBorderless.png', name: 'Borderless' },
  { src: '/img/frames/class/masks/maskBorder.png', name: 'Border' },
  { src: '/img/frames/class/masks/maskBorderlessBorder.png', name: 'Borderless Border' },
];

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/class/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/class/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/class/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/class/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/class/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/class/m.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/class/a.png', masks },
  { name: 'Land Frame', src: '/img/frames/class/l.png', masks },
];

// Template
const template: FramePackTemplate = {
  id: 'Class-1',
  label: 'Class (D&D)',
  version: 'class',
  frames,
  artBounds: { x: 0.0753, y: 0.1124, width: 0.4247, height: 0.7253 },
  setSymbolBounds: { x: 0.9227, y: 0.8739, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5214, y: 0.4748, width: 0.38, height: 0.6767 },
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8481, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    level0c: { name: '1 - Text', text: '{i}(Gain the next level as a sorcery to add its ability.){/i}{lns}{bar}{lns}', x: 0.5093, y: 0.1129, width: 0.404, height: 0.2096, size: 0.0305 },
    level1a: { name: '2 - Cost', text: '{2}:', x: 0.5093, y: 0, width: 0.3967, height: 0.0277, size: 0.0277 },
    level1b: { name: '2 - Name', text: 'Level 2', x: 0.5093, y: 0, width: 0.3967, height: 0.0281, size: 0.0281, align: 'right' },
    level1c: { name: '2 - Text', text: '', x: 0.5093, y: 0, width: 0.404, height: 0.2091, size: 0.0305 },
    level2a: { name: '3 - Cost', text: '{3}:', x: 0.5093, y: 0, width: 0.3967, height: 0.0277, size: 0.0277 },
    level2b: { name: '3 - Name', text: 'Level 3', x: 0.5093, y: 0, width: 0.3967, height: 0.0281, size: 0.0281, align: 'right' },
    level2c: { name: '3 - Text', text: '', x: 0.5093, y: 0, width: 0.404, height: 0.2091, size: 0.0305 },
    level3a: { name: '4 - Cost', text: '{4}:', x: 0.5093, y: 0, width: 0.3967, height: 0.0277, size: 0.0277 },
    level3b: { name: '4 - Name', text: 'Level 4', x: 0.5093, y: 0, width: 0.3967, height: 0.0281, size: 0.0281, align: 'right' },
    level3c: { name: '4 - Text', text: '', x: 0.5093, y: 0, width: 0.404, height: 0, size: 0.0305 },
  },
  class: {
    x: 0.5014,
    width: 0.422,
    defaultHeights: [0.2096, 0.2091, 0.2091, 0],
  },
};

export default template;
