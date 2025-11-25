import type { FramePackTemplate, Mask, FrameItem, Bounds } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/m15/commanderLegends/m15CommanderLegendsMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/m15/commanderLegends/m15CommanderLegendsMaskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/commanderLegends/m15CommanderLegendsMaskType.png', name: 'Type' },
  { src: '/img/frames/m15/commanderLegends/m15CommanderLegendsMaskRules.png', name: 'Rules' },
  { src: '/img/frames/m15/regular/m15MaskBorder.png', name: 'Border' }
];

// Shared bounds
const bounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/m15/commanderLegends/frameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/m15/commanderLegends/frameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/m15/commanderLegends/frameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/m15/commanderLegends/frameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/m15/commanderLegends/frameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/m15/commanderLegends/frameM.png', masks },
  { name: 'Artifact Frame', src: '/img/frames/m15/commanderLegends/frameA.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/m15/commanderLegends/frameC.png', masks },
  { name: 'White Power/Toughness', src: '/img/frames/m15/commanderLegends/ptW.png', bounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/commanderLegends/ptU.png', bounds },
  { name: 'Black Power/Toughness', src: '/img/frames/m15/commanderLegends/ptB.png', bounds },
  { name: 'Red Power/Toughness', src: '/img/frames/m15/commanderLegends/ptR.png', bounds },
  { name: 'Green Power/Toughness', src: '/img/frames/m15/commanderLegends/ptG.png', bounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/m15/commanderLegends/ptM.png', bounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/commanderLegends/ptA.png', bounds },
  { name: 'Colorless Power/Toughness', src: '/img/frames/m15/commanderLegends/ptC.png', bounds }
];

// Template
const template: FramePackTemplate = {
  id: 'CommanderLegends',
  label: 'Commander Legends (CMR)',
  version: 'commanderLegends',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.5910, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71/2100, oneLine: true, size: 71/1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 0.0927, y: 0.6303, width: 0.8147, height: 0.2875, size: 0.0362, color: 'white' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
