import type { FramePackTemplate, FrameItem } from './types';

const frames: FrameItem[] = [
  { name: 'Modal DFC', src: '/img/frames/modal/helper/regular.png' },
  { name: 'Transform DFC', src: '/img/frames/modal/helper/transform.png' }
];

const template: FramePackTemplate = {
  id: 'ModalHelper',
  label: 'Helper Cards',
  version: 'modalRegular',
  notice: 'Loads helper cards that auto-apply the modal DFC layout and text configuration used by the regular/transform modal packs.',
  artBounds: { x: 0, y: 0, width: 1, height: 1 },
  setSymbolBounds: { x: 0.5, y: 0.9524, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: { mana: { name: 'Mana Cost', text: '', y: 0.081, width: 0.9234, height: 99 / 2100, oneLine: true, size: 99 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.22, y: 0.0791, width: 0.69, height: 0.0534, oneLine: true, font: 'belerenb', size: 0.0534 },
    mana2: { name: 'Mana Cost 2', text: '', y: 0.1696, width: 0.9234, height: 99 / 2100, oneLine: true, size: 99 / 1638, align: 'right', shadowX: -0.001, shadowY: 0.0029, manaCost: true, manaSpacing: 0 },
    title2: { name: 'Title 2', text: '', x: 0.22, y: 0.1681, width: 0.69, height: 0.0534, oneLine: true, font: 'belerenb', size: 0.0534 },
    rules: { name: 'Rules Text', text: '', x: 0.0914, y: 0.2439, width: 0.8174, height: 0.6762, size: 0.0362 }
  }
};

export default template;