import type { FramePackTemplate, FrameItem } from './types';

// Custom QR Code Deck Cover pack
// This pack shows a "QR Code" tab with controls for QR code generation

const manaSymbolBounds = { width: 0.06, height: 0.0429 };

const frames: FrameItem[] = [
  { name: 'White Frame', src: '/img/frames/custom/deckCover/w.png' },
  { name: 'Blue Frame', src: '/img/frames/custom/deckCover/u.png' },
  { name: 'Black Frame', src: '/img/frames/custom/deckCover/b.png' },
  { name: 'Red Frame', src: '/img/frames/custom/deckCover/r.png' },
  { name: 'Green Frame', src: '/img/frames/custom/deckCover/g.png' },
  { name: 'Multicolored Frame', src: '/img/frames/custom/deckCover/m.png' },
  { name: 'Colorless Frame', src: '/img/frames/custom/deckCover/c.png' },
  { name: 'White Mana Symbol', src: '/img/manaSymbols/w.svg', bounds: { x: 0.1594, y: 0.7529, ...manaSymbolBounds } },
  { name: 'Blue Mana Symbol', src: '/img/manaSymbols/u.svg', bounds: { x: 0.23, y: 0.7896, ...manaSymbolBounds } },
  { name: 'Black Mana Symbol', src: '/img/manaSymbols/b.svg', bounds: { x: 0.2027, y: 0.8486, ...manaSymbolBounds } },
  { name: 'Red Mana Symbol', src: '/img/manaSymbols/r.svg', bounds: { x: 0.116, y: 0.8486, ...manaSymbolBounds } },
  { name: 'Green Mana Symbol', src: '/img/manaSymbols/g.svg', bounds: { x: 0.0887, y: 0.7896, ...manaSymbolBounds } },
];

const template: FramePackTemplate = {
  id: 'CustomDeckCover',
  label: 'Deck Covers',
  version: 'customQRCodeDeckCover',
  artBounds: { x: 0, y: 0, width: 1, height: 0.7162 },
  setSymbolBounds: { x: 0.5, y: 0.9681, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'center' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  qrCode: { x: 0.36, y: 0.73, size: 0.28, fgColor: '#fff', bgColor: '#000', bgAlpha: 0, },
  text: {
    title: { name: 'Title', text: '', x: 0.0474, y: 0.0234, width: 0.9054, height: 0.0534, oneLine: true, font: 'belerenb', size: 0.0534, color: 'white', align: 'center', shadowX: 0.0027, shadowY: 0.002 },
    notes: { name: 'Description', text: '', x: 0.69, y: 0.7358, width: 0.27, height: 0.18, font: 'belerenb', size: 0.0362, color: 'white', align: 'center', shadowX: 0.002, shadowY: 0.0015 },
  },
};

export default template;
