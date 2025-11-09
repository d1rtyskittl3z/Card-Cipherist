import type { FramePackTemplate, Mask, FrameItem } from './types';

const masks: Mask[] = [
  { src: '/img/frames/textless/eoe/masks/maskPinlines.png', name: 'Pinlines' },
  { src: '/img/frames/textless/eoe/masks/maskSymbol.png', name: 'Mana Symbol' },
  { src: '/img/frames/textless/eoe/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/textless/eoe/masks/maskNoBorder.png', name: 'No Border' },
  { src: '/img/frames/textless/eoe/masks/maskBorder.png', name: 'Border' },
];

const masks2: Mask[] = [
  { src: '/img/frames/textless/eoe/symbols/masks/maskLeft.png', name: 'Left Half' },
  { src: '/img/frames/textless/eoe/symbols/masks/maskRight.png', name: 'Right Half' },
];

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/textless/eoe/w.png', masks },
  { name: 'Blue Frame', src: '/img/frames/textless/eoe/u.png', masks },
  { name: 'Black Frame', src: '/img/frames/textless/eoe/b.png', masks },
  { name: 'Red Frame', src: '/img/frames/textless/eoe/r.png', masks },
  { name: 'Green Frame', src: '/img/frames/textless/eoe/g.png', masks },
  { name: 'Multicolored Frame', src: '/img/frames/textless/eoe/m.png', masks },
  { name: 'Colorless Frame', src: '/img/frames/textless/eoe/a.png', masks },
  { name: 'Waste Frame', src: '/img/frames/textless/eoe/L.png', masks },
  { name: 'Black (Alt) Frame', src: '/img/frames/textless/eoe/bAlt.png', masks },
  { name: 'Plains Symbol', src: '/img/frames/textless/eoe/symbols/plains.png', masks: masks2 },
  { name: 'Island Symbol', src: '/img/frames/textless/eoe/symbols/island.png', masks: masks2 },
  { name: 'Swamp Symbol', src: '/img/frames/textless/eoe/symbols/swamp.png', masks: masks2 },
  { name: 'Mountain Symbol', src: '/img/frames/textless/eoe/symbols/mountain.png', masks: masks2 },
  { name: 'Forest Symbol', src: '/img/frames/textless/eoe/symbols/forest.png', masks: masks2 },
  { name: 'Mythic Symbol', src: '/img/frames/textless/eoe/symbols/mythic.png', masks: masks2 },
  { name: 'Waste Symbol', src: '/img/frames/textless/eoe/symbols/waste.png', masks: masks2 },
];

const template: FramePackTemplate = {
  id: 'EOEBasics',
  label: 'Edge of Eternities Basics (EOE)',
  version: 'eoeBasics',
  artBounds: { x: 0, y: 0, width: 1.05, height: 0.9324 },
  setSymbolBounds: { x: 0.9213, y: 0.8739, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: -1, y: -1, width: 0.0007, height: 0.0005 },
  frames,
  text: {
    title: { name: 'Title', text: '', x: 245 / 1500, y: 0.8481, width: 1400 / 2010, height: 0.0543, align: 'center', color: 'white', oneLine: true, font: 'belerenb', size: 0.0324 },
  },
};

export default template;
