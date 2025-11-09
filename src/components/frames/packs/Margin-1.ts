import type { FramePackTemplate, Mask, FrameItem } from './types';

// Common bounds for margin extensions (extend beyond normal card boundaries)
const extensionBounds = { x: -0.044, y: -1 / 35, width: 1.088, height: 37 / 35 };
const ogBounds = { x: 0, y: 0, width: 1, height: 1 };

// Masks available for colored border extensions
// These masks have extended bounds to create margin effects
const borderExtensionMasks: Mask[] = [
  { src: '/img/frames/margins/blackBorderExtension.png', name: 'Border Extension', bounds: extensionBounds, ogBounds },
  { src: '/img/frames/margins/borderlessBorderExtension.png', name: 'Borderless Border Extension', bounds: extensionBounds, ogBounds },
  { src: '/img/frames/margins/boxTopperBorderExtension.png', name: 'Box Topper Border Extension', bounds: extensionBounds, ogBounds },
  { src: '/img/frames/margins/blackCorners.png', name: 'Cornered Border Extension', bounds: extensionBounds, ogBounds },
];

const frames: FrameItem[] = [
  // Frames without masks - only "No Mask" will be available
  { name: 'Black Extension', src: '/img/frames/margins/blackBorderExtension.png', bounds: extensionBounds },
  { name: 'Borderless Extension', src: '/img/frames/margins/borderlessBorderExtension.png', bounds: extensionBounds },
  { name: 'Borderless Extension (Bottom Bar)', src: '/img/frames/margins/borderlessBottomBarExtension.png', bounds: extensionBounds },
  { name: 'Box Topper Extension', src: '/img/frames/margins/boxTopperBorderExtension.png', bounds: extensionBounds },
  { name: 'Box Topper Extension (Short)', src: '/img/frames/margins/boxTopperShortBorderExtension.png', bounds: extensionBounds },
  { name: 'Box Topper Extension (Planeswalker)', src: '/img/frames/planeswalker/boxTopper/margin.png', bounds: extensionBounds },
  { name: 'Box Topper Extension (Promo / Tall Art)', src: '/img/frames/promo/extended/margin.png', bounds: extensionBounds },
  { name: 'Black Extension (Cornered)', src: '/img/frames/margins/blackCorners.png', bounds: extensionBounds },

  // Frames with custom masks - prevent default masks from being applied
  { name: 'White Border Extension', src: '/img/frames/white.png', ogBounds, bounds: extensionBounds, masks: borderExtensionMasks, noDefaultMask: true },
  { name: 'Silver Border Extension', src: '/img/frames/silver.png', ogBounds, bounds: extensionBounds, masks: borderExtensionMasks, noDefaultMask: true },
  { name: 'Gold Border Extension', src: '/img/frames/gold.png', ogBounds, bounds: extensionBounds, masks: borderExtensionMasks, noDefaultMask: true },
  { name: 'Pokemon Border Extension', src: '/img/frames/custom/pokemon/extension.png', ogBounds, bounds: extensionBounds, masks: borderExtensionMasks, noDefaultMask: true },
];

const template: FramePackTemplate = {
  id: 'Margin-1',
  label: 'Generic Margins',
  version: 'margin',
  notice: 'Margin frames extend beyond the normal card boundaries. Use these as overlays on top of other frames.',
  // Default bounds (margins don't define their own card layout)
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6303, width: 0.828, height: 0.2875, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center' },
  },
};

export default template;
