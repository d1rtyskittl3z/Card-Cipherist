import type { FramePackTemplate, Mask } from './types';

const masks: Mask[] = [
  { src: '/img/frames/planeswalker/tall/planeswalkerTallMaskPinline.png', name: 'Pinline' },
  { src: '/img/frames/planeswalker/regular/planeswalkerMaskTitle.png', name: 'Title' },
  { src: '/img/frames/planeswalker/tall/planeswalkerTallMaskType.png', name: 'Type' },
  { src: '/img/frames/planeswalker/tall/planeswalkerTallMaskFrame.png', name: 'Frame' },
  { src: '/img/frames/planeswalker/regular/planeswalkerMaskBorder.png', name: 'Border' },
  { src: '/img/frames/planeswalker/maskLoyalty.png', name: 'Loyalty' }
];

const stampBounds = { x: 0.4394, y: 0.9015, width: 0.1214, height: 0.051 };

const template: FramePackTemplate = {
  id: 'PlaneswalkerTallDBL',
  label: 'Innistrad: Double Feature (Tall)',
  version: 'planeswalkerDBLTall',
  artBounds: { x: 0.068, y: 0.101, width: 0.864, height: 0.8143 },
  setSymbolBounds: { x: 0.9227, y: 0.5234, width: 0.12, height: 0.0381, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames: [
    { name: 'White Frame', src: '/img/frames/planeswalker/dbl/tall/w.png', masks },
    { name: 'Blue Frame', src: '/img/frames/planeswalker/dbl/tall/u.png', masks },
    { name: 'Black Frame', src: '/img/frames/planeswalker/dbl/tall/b.png', masks },
    { name: 'Red Frame', src: '/img/frames/planeswalker/dbl/tall/r.png', masks },
    { name: 'Green Frame', src: '/img/frames/planeswalker/dbl/tall/g.png', masks },
    { name: 'Multicolored Frame', src: '/img/frames/planeswalker/dbl/tall/m.png', masks },
    { name: 'Holo Stamp', src: '/img/frames/planeswalker/dbl/stamp.png', bounds: stampBounds }
  ],
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0481, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.0867, y: 0.0372, width: 0.8267, height: 0.0548, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white' },
    type: { name: 'Type', text: '', x: 0.0867, y: 0.4967, width: 0.8267, height: 0.0548, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white' },
    ability0: { name: 'Ability 1', text: '', x: 0.18, y: 0.5581, width: 0.7467, height: 0.0896, size: 0.0353 },
    ability1: { name: 'Ability 2', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0896, size: 0.0353 },
    ability2: { name: 'Ability 3', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0896, size: 0.0353 },
    ability3: { name: 'Ability 4', text: '', x: 0.18, y: 0, width: 0.7467, height: 0.0896, size: 0.0353 },
    loyalty: { name: 'Loyalty', text: '', x: 0.806, y: 0.902, width: 0.14, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' }
  }
};

export default template;
