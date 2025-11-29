import type { FramePackTemplate, FrameItem, Bounds } from './types';

// Shared bounds for power/toughness boxes
const ptBounds: Bounds = { x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733 };

const frames: FrameItem[] = [
  { name: 'White Frame (Gideon)', src: '/img/frames/m15/signatureSpellbook/gideon.png' },
  { name: 'Blue Frame (Jace)', src: '/img/frames/m15/signatureSpellbook/jace.png' },
  { name: 'Artifact Frame (Gideon)', src: '/img/frames/m15/signatureSpellbook/artifact.png' },
  { name: 'White Power/Toughness', src: '/img/frames/m15/signatureSpellbook/gideonPT.png', bounds: ptBounds },
  { name: 'Blue Power/Toughness', src: '/img/frames/m15/signatureSpellbook/jacePT.png', bounds: ptBounds },
  { name: 'Artifact Power/Toughness', src: '/img/frames/m15/signatureSpellbook/artifactPT.png', bounds: ptBounds },
  { name: 'Holo Stamp', src: '/img/frames/m15/m21/m15M21Stamp.png', bounds: { x: 0.4727, y: 0.892, width: 0.0547, height: 0.0391 } },
];

const template: FramePackTemplate = {
  id: 'SignatureSpellbook',
  label: 'Signature Spellbook (Jace/Gideon)',
  version: 'signatureSpellbook',
  notice: 'To use the darker mana symbols on white cards, place a "DM21" (for "Dark M21") before the following mana symbols: wubrg, 0-9, and x.',
  artBounds: { x: 0.0767, y: 0.1129, width: 0.8476, height: 0.4429 },
  setSymbolBounds: { x: 0.9213, y: 0.591, width: 0.12, height: 0.041, vertical: 'center', horizontal: 'right' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 0.0613, width: 0.9292, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', manaCost: true, manaSpacing: 0, manaPrefix: 'm21' },
    title: { name: 'Title', text: '', x: 0.0854, y: 0.0522, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    type: { name: 'Type', text: '', x: 0.0854, y: 0.5664, width: 0.8292, height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0324, color: 'white', shadowX: 0.0014, shadowY: 0.001 },
    rules: { name: 'Rules Text', text: '', x: 0.0967, y: 0.6453, width: 0.8067, height: 0.2381, size: 0.0362 },
    pt: { name: 'Power/Toughness', text: '', x: 0.7928, y: 0.902, width: 0.1367, height: 0.0372, size: 0.0372, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
  },
};

export default template;
