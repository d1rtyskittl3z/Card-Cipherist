import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };
const bounds2: Bounds = { x: 0.048, y: 0.0367, width: 0.0834, height: 0.8805 };
const bounds3: Bounds = { x: 0.0649, y: 0.0532, width: 0.0349, height: 0.0185 };
const bounds4: Bounds = { x: 0.048, y: 0.0432, width: 0.0834, height: 0.8805 };
const bounds5: Bounds = { x: 145 / 2010, y: 121 / 2814, width: 104 / 2010, height: 104 / 2814 };
const bounds6: Bounds = { x: 145 / 2010, y: 137 / 2814, width: 104 / 2010, height: 104 / 2814 };

const frames: FrameItem[] = [
  { name: 'White MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/w.png', bounds },
  { name: 'Blue MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/u.png', bounds },
  { name: 'Black MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/b.png', bounds },
  { name: 'Red MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/r.png', bounds },
  { name: 'Green MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/g.png', bounds },
  { name: 'Multicolored MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/m.png', bounds },
  { name: 'Colorless MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/c.png', bounds },
  { name: 'Land MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/L.png', bounds },
  { name: 'White Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/w.png', bounds },
  { name: 'Blue Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/u.png', bounds },
  { name: 'Black Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/b.png', bounds },
  { name: 'Red Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/r.png', bounds },
  { name: 'Green Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/g.png', bounds },
  { name: 'Multicolored Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/m.png', bounds },
  { name: 'Colorless Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/c.png', bounds },
  { name: 'Land Saga MDFC Flipside', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/saga/L.png', bounds },
  { name: 'Front Face', src: '/img/frames/custom/classicshifted/mdfc/mdfcFront.png', bounds: bounds2 },
  { name: 'Back Face', src: '/img/frames/custom/classicshifted/mdfc/mdfcBack.png', bounds: bounds2 },
  { name: 'Retro Arrow Up', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/retroUp.png', bounds: bounds3 },
  { name: 'Retro Arrow Down', src: '/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/retroDown.png', bounds: bounds3 },
  { name: 'Transform Icon', src: '/img/frames/custom/classicshifted/transform/transformIcon.png', bounds: { x: 129 / 2010, y: 104 / 2814, width: 137 / 2010, height: 137 / 2814 } },
  { name: 'Up Arrow', src: '/img/frames/m15/transform/icons/default.png', bounds: bounds5 },
  { name: 'Down Arrow', src: '/img/frames/m15/transform/icons/downArrow.png', bounds: bounds5 },
  { name: 'Legend Crown Front Face', src: '/img/frames/custom/classicshifted/mdfc/mdfcFront.png', bounds: bounds4 },
  { name: 'Legend Crown Back Face', src: '/img/frames/custom/classicshifted/mdfc/mdfcBack.png', bounds: bounds4 },
  { name: 'Legend Crown Transform Icon', src: '/img/frames/custom/classicshifted/transform/transformIcon.png', bounds: { x: 129 / 2010, y: 120 / 2814, width: 137 / 2010, height: 137 / 2814 } },
  { name: 'Legend Crown Up Arrow', src: '/img/frames/m15/transform/icons/default.png', bounds: bounds6 },
  { name: 'Legend Crown Down Arrow', src: '/img/frames/m15/transform/icons/downArrow.png', bounds: bounds6 }
];

const template: FramePackTemplate = {
  id: 'StoneCutterDeluxeDFC',
  label: 'StoneCutter MDFC Addons',
  version: 'stoneCutterDeluxeDFC',
  artBounds: { x: 0.08, y: 0.0954, width: 0.84, height: 0.4653 },
  setSymbolBounds: { x: 0.9213, y: 0.5958, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0497, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.14, y: 0.0372, width: 0.748, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.571, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.002, shadowY: 0.0015 },
    rules: { name: 'Rules Text', text: '', x: 0.086, y: 0.6329, width: 0.828, height: 0.2905, size: 0.0362 },
    flipsideType: { name: 'Flipside Type', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0234, color: 'white', oneLine: true, font: 'belerenb' },
    flipSideReminder: { name: 'Flipside Text', text: '', x: 0.068, y: 0.892, width: 0.364, height: 0.0391, size: 0.0258, color: 'white', oneLine: true, align: 'right' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX: 0.002, shadowY: 0.0015 }
  }
};

export default template;
