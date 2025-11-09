import type { FramePackTemplate } from './types';

// Japan Showcase Nicknames
// Nickname frames for Japan Showcase style cards
// When a frame from this pack is added, a "Nickname" text field will be dynamically added to the text editor

const bounds = { x: 0, y: 0, width: 1, height: 1 };

const JapanShowcaseNicknames: FramePackTemplate = {
  id: 'JapanShowcaseNicknames',
  label: 'Japan Showcase Nicknames',
  version: 'JapaneseShowcase',
  artBounds: { x: 0, y: 0, width: 1, height: 0.9224 },
  setSymbolBounds: {
    x: 0.91,
    y: 0.635,
    width: 0.12,
    height: 0.0410,
    vertical: 'center',
    horizontal: 'right',
    outlineWidth: 0.003,
    outlineColor: 'black'
  },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames: [
    { name: 'White Nickname', src: '/img/frames/m15/japanShowcase/nickname/w.png', bounds },
    { name: 'Blue Nickname', src: '/img/frames/m15/japanShowcase/nickname/u.png', bounds },
    { name: 'Black Nickname', src: '/img/frames/m15/japanShowcase/nickname/b.png', bounds },
    { name: 'Red Nickname', src: '/img/frames/m15/japanShowcase/nickname/r.png', bounds },
    { name: 'Green Nickname', src: '/img/frames/m15/japanShowcase/nickname/g.png', bounds },
    { name: 'Multicolored Nickname', src: '/img/frames/m15/japanShowcase/nickname/m.png', bounds },
    { name: 'Artifact Nickname', src: '/img/frames/m15/japanShowcase/nickname/a.png', bounds },
    { name: 'Land Nickname', src: '/img/frames/m15/japanShowcase/nickname/L.png', bounds },
    { name: 'Colorless Nickname', src: '/img/frames/m15/japanShowcase/nickname/c.png', bounds }
  ],
  text: {
    mana: {
      name: 'Mana Cost',
      text: '',
      y: 0.0683,
      width: 0.919,
      height: 71 / 2100,
      oneLine: true,
      size: 71 / 1638,
      align: 'right',
      outlineWidth: 0.01,
      manaCost: true,
      manaSpacing: 0
    },
    nickname: {
      name: 'Nickname',
      text: '',
      x: 0.09,
      y: 0.0582,
      width: 0.8292,
      height: 0.0543,
      outlineWidth: 0.008,
      oneLine: true,
      font: 'belerenb',
      size: 0.0381,
      color: 'white'
    },
    title: {
      name: 'Title',
      text: '',
      x: 0.14,
      y: 0.12,
      width: 0.768,
      height: 0.0243,
      oneLine: true,
      outlineWidth: 0.0065,
      font: 'mplantini',
      size: 0.0229,
      color: 'white',
      align: 'right'
    },
    type: {
      name: 'Type',
      text: '',
      x: 0.0854,
      y: 0.612,
      width: 0.71,
      height: 0.0543,
      oneLine: true,
      font: 'belerenb',
      size: 0.0279,
      outlineWidth: 0.008,
      color: 'white'
    },
    rules: {
      name: 'Rules Text',
      text: '',
      x: 0.086,
      y: 0.692,
      width: 0.771,
      height: 0.206,
      size: 0.033,
      outlineWidth: 0.008,
      font: 'Plantin MT Pro',
      color: 'white'
    },
    pt: {
      name: 'Power/Toughness',
      text: '',
      x: 0.804,
      y: 0.896,
      width: 0.118,
      height: 0.049,
      size: 0.04,
      outlineWidth: 0.008,
      font: 'belerenbsc',
      oneLine: true,
      align: 'center',
      color: 'white'
    }
  }
};

export default JapanShowcaseNicknames;
