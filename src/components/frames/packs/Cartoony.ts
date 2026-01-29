import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'None', src: '/img/blank.png' },
];

const template: FramePackTemplate = {
  id: 'Cartoony',
  label: 'Cartoony - Sheepwave',
  version: 'cartoony',
  artBounds: { x: 0, y: 0, width: 1, height: 1 },
  setSymbolBounds: { x: 0.5, y: 0.9715, width: 0.12, height: 0.0358, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: {
      name: 'Mana Cost',
      text: '',
      x: 0,
      y: 0,
      size: 200 / 1638,
      manaCost: true,
      manaPrefix: 'c',
      noVerticalCenter: true,
      manaLayout: [
        { max: 1, size: 1.26, pos: [[0.828, 0]] },
        { max: 2, size: 1, pos: [[0.7854, 0.0034], [0.8734, 0.03]] },
        { max: 3, size: 1, pos: [[0.7914, 0.0205], [0.8794, -0.01], [0.8734, 0.0548]] },
        { max: 4, size: 0.9, pos: [[0.7927, -0.0034], [0.88, 0.0086], [0.8054, 0.0553], [0.89, 0.0715]] },
        { max: 7, size: 0.8, pos: [[0.8687, -0.0034], [0.9007, 0.0439], [0.7934, -0.0043], [0.8274, 0.0434], [0.8667, 0.092], [0.7534, 0.04], [0.786, 0.09]] },
      ],
    },
    title: { name: 'Title', text: '', y: 0.02, size: 0.08, font: 'Acme-Regular', oneLine: true, color: 'white', outlineWidth: 0.0048, arcRadius: 2, arcStart: -0.168, noVerticalCenter: true },
    type: { name: 'Type', text: '', x: 0.0234, y: 0.6205, width: 0.9534, height: 0.0543, size: 0.0491, font: 'Acme-Regular', oneLine: true, color: 'white', outlineWidth: 0.0034 },
    rules: { name: 'Rules Text', text: '', x: 0.0234, y: 0.662, width: 0.9534, height: 0.3, size: 0.0562, font: 'Acme-Regular', align: 'center', color: 'white', outlineWidth: 0.0034, manaImageScale: 10 / 7, manaPrefix: 'c' },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.062, font: 'Acme-Regular', oneLine: true, align: 'center', color: 'white', outlineWidth: 0.0034 },
    pronouns: { name: 'Pronouns', text: '', x: 0.0234, y: 0.95, width: 0.9534, height: 0.05, size: 0.03, font: 'Acme-Regular', align: 'center', color: 'white', outlineWidth: 0.0034, manaImageScale: 10 / 7, manaPrefix: 'c' },
  },
  loadBottomInfo: {
    topLeft: { name: 'Artist', text: 'Art: {elemidinfo-artist}', x: 0.01, y: 0.9572, width: 0.98, height: 0.0177, size: 0.0177, font: 'Acme-Regular', oneLine: true, color: 'white', outlineWidth: 0.003 },
  },
};

export default template;
