import type { FramePackTemplate, Mask, FrameItem } from './types';

// Shared masks
const masks: Mask[] = [
  { src: '/img/frames/expedition/znr/expeditionNewMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/m15/regular/m15MaskTitle.png', name: 'Title' },
  { src: '/img/frames/expedition/znr/expeditionNewMaskType.png', name: 'Type' },
  { src: '/img/frames/expedition/znr/expeditionNewMaskText.png', name: 'Rules' },
  { src: '/img/frames/expedition/znr/expeditionNewMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/expedition/znr/expeditionNewMaskHedrons.png', name: 'Hedrons' },
  { src: '/img/frames/expedition/znr/expeditionNewMaskBorder.png', name: 'Border' }
];

// Frames array
const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/expedition/znr/expeditionNewFrameW.png', masks },
  { name: 'Blue Frame', src: '/img/frames/expedition/znr/expeditionNewFrameU.png', masks },
  { name: 'Black Frame', src: '/img/frames/expedition/znr/expeditionNewFrameB.png', masks },
  { name: 'Red Frame', src: '/img/frames/expedition/znr/expeditionNewFrameR.png', masks },
  { name: 'Green Frame', src: '/img/frames/expedition/znr/expeditionNewFrameG.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/expedition/znr/expeditionNewFrameM.png', masks },
  { name: 'Land Frame', src: '/img/frames/expedition/znr/expeditionNewFrameL.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/expedition/znr/expeditionNewFrameC.png', masks }
];

// Template
const template: FramePackTemplate = {
  id: 'ExpeditionZNR-1',
  label: 'ZNR Expeditions (2020)',
  version: 'expeditionZNR',
  artBounds: { x: 0.04, y: 0.0667, width: 0.92, height: 0.7491 },
  setSymbolBounds: { x: 0.946, y: 0.8439, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.8196, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.1, y: 0.5648, width: 0.8, height: 0.2505, size: 0.0362 }
  }
};

export default template;
