import type { FramePackTemplate, Mask } from './types';

// M15 Nickname Addon Pack
// This is an addon-only pack that adds nickname title overlays
// Automatically adds a "Nickname" text field when frames are used

// Common masks for nickname titles
const masks: Mask[] = [
  { src: '/img/frames/m15/nickname/m15MaskNicknameTitleStrokeless.png', name: 'Pinline' },
  { src: '/img/frames/m15/nickname/m15NicknameMaskTrueName.png', name: 'True Title' }
];

// Bounds for nickname titles
const bounds = { x: 0.0494, y: 0.0405, width: 0.9014, height: 0.1053 };

const M15Nickname2: FramePackTemplate = {
  id: 'M15Nickname-2',
  label: 'Nicknames',
  notice: 'Nickname frames are addon overlays for the title area. When a frame from this pack is added, a "Nickname" text field will be dynamically added to the text editor.',
  frames: [
    { name: 'White Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleW.png', masks, bounds },
    { name: 'Blue Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleU.png', masks, bounds },
    { name: 'Black Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleB.png', masks, bounds },
    { name: 'Red Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleR.png', masks, bounds },
    { name: 'Green Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleG.png', masks, bounds },
    { name: 'Multicolored Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleM.png', masks, bounds },
    { name: 'Artifact Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleA.png', masks, bounds },
    { name: 'Land Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleL.png', masks, bounds },
    { name: 'Colorless Nickname', src: '/img/frames/m15/nickname/addons/m15NicknameTitleC.png', masks, bounds }
  ],
  // Nickname text field configuration (added dynamically when frames are used)
  text: {
    nickname: {
      name: 'Nickname',
      text: '',
      x: 0.14,
      y: 0.1129,
      width: 0.72,
      height: 0.0243,
      oneLine: true,
      font: 'mplantini',
      size: 0.0229,
      color: 'white',
      shadowX: 0.0014,
      shadowY: 0.001,
      align: 'center'
    }
  }
};

export default M15Nickname2;
