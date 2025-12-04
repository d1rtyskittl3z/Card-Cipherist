import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Shared bounds for power/toughness boxes
const ptBounds: Bounds = { x: 0.8294, y: 0.8715, width: 0.1214, height: 0.0715 };

// Shared bounds for legend crowns
const crownBounds: Bounds = { x: 0.002, y: 0.0134, width: 0.996, height: 0.1362 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/celid/asap/w.png' },
  { name: 'Blue Frame', src: '/img/frames/custom/celid/asap/u.png' },
  { name: 'Black Frame', src: '/img/frames/custom/celid/asap/b.png' },
  { name: 'Red Frame', src: '/img/frames/custom/celid/asap/r.png' },
  { name: 'Green Frame', src: '/img/frames/custom/celid/asap/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/custom/celid/asap/m.png' },
  { name: 'Artifact Frame', src: '/img/frames/custom/celid/asap/a.png' },
  { name: 'White Power/Toughness', src: '/img/frames/custom/celid/asap/pt/w.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/custom/celid/asap/pt/u.png', bounds: ptBounds },
  { name: 'Black Power/Toughness', src: '/img/frames/custom/celid/asap/pt/b.png', bounds: ptBounds },
  { name: 'Red Power/Toughness', src: '/img/frames/custom/celid/asap/pt/r.png', bounds: ptBounds },
  { name: 'Green Power/Toughness', src: '/img/frames/custom/celid/asap/pt/g.png', bounds: ptBounds },
  { name: 'Multicolored Power/Toughness', src: '/img/frames/custom/celid/asap/pt/m.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/custom/celid/asap/pt/a.png', bounds: ptBounds },
  { name: 'White Legend Crown', src: '/img/frames/custom/celid/asap/crown/w.png', bounds: crownBounds },
  { name: 'Blue Legend Crown', src: '/img/frames/custom/celid/asap/crown/u.png', bounds: crownBounds },
  { name: 'Black Legend Crown', src: '/img/frames/custom/celid/asap/crown/b.png', bounds: crownBounds },
  { name: 'Red Legend Crown', src: '/img/frames/custom/celid/asap/crown/r.png', bounds: crownBounds },
  { name: 'Green Legend Crown', src: '/img/frames/custom/celid/asap/crown/g.png', bounds: crownBounds },
  { name: 'Multicolored Legend Crown', src: '/img/frames/custom/celid/asap/crown/m.png', bounds: crownBounds },
  { name: 'Artifact Legend Crown', src: '/img/frames/custom/celid/asap/crown/a.png', bounds: crownBounds },
];

const template: FramePackTemplate = {
  id: 'CustomCelidAsap',
  label: "Celid's Asap",
  version: 'customCelidAsap',
  artBounds: { x: 0, y: 0, width: 1, height: 0.8929 },
  setSymbolBounds: { x: 0.5, y: 0.9524, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', x: 0.37, y: 0.0267, width: 0.26, height: 54 / 2100, oneLine: true, size: 54 / 1638, align: 'center', manaCost: true, manaSpacing: 0 },
    title: { name: 'Title', text: '', x: 0.06, y: 0.0743, width: 0.88, height: 0.04, oneLine: true, font: 'belerenb', size: 0.04, color: 'white', align: 'center' },
    type: { name: 'Type', text: '', x: 0.07, y: 0.9058, width: 0.86, height: 0.0286, oneLine: true, font: 'belerenb', size: 0.0286, color: 'white', align: 'center' },
    rules: { name: 'Rules Text', text: '', x: 0.074, y: 0.672, width: 0.852, height: 0.2191, size: 0.0362, color: 'white', align: 'center' },
    pt: { name: 'Power/Toughness', text: '', x: 0.8367, y: 0.8943, width: 0.11, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
