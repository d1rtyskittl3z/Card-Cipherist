import type { FramePackTemplate, Mask } from './types';

// M15 Smooth Nickname Legend Crowns
// Smooth legend crown frames with nickname overlays
// Automatically adds a "Nickname" text field when frames are used

// Common masks for smooth nickname legend crowns
const masks: Mask[] = [
  { src: 'img/frames/m15/nickname/smooth/masks/maskcrown.png', name: 'Crown' },
  { src: '/img/frames/m15/nickname/smooth/masks/maskTitle.png', name: 'Title' },
  { src: '/img/frames/m15/nickname/smooth/masks/maskTrueName.png', name: 'True Title' }
];

// Full card bounds
const bounds = { x: 0, y: 0, width: 1, height: 1 };

const M15SmoothNickname: FramePackTemplate = {
  id: 'M15SmoothNickname',
  label: 'Smooth Nickname Legend Crowns',
  notice: 'Smooth nickname legend crown frames are decorative overlays. When a frame from this pack is added, a "Nickname" text field will be dynamically added to the text editor. Frames with "Auto Erase" automatically add cutout elements to erase the title area under the crown.',
  frames: [
    // Standard smooth nickname crowns (auto-add border cover at index 22)
    { name: 'White Nickname', src: '/img/frames/m15/nickname/smooth/w.png', masks, bounds, complementary: 22 },
    { name: 'Blue Nickname', src: '/img/frames/m15/nickname/smooth/u.png', masks, bounds, complementary: 22 },
    { name: 'Black Nickname', src: '/img/frames/m15/nickname/smooth/b.png', masks, bounds, complementary: 22 },
    { name: 'Red Nickname', src: '/img/frames/m15/nickname/smooth/r.png', masks, bounds, complementary: 22 },
    { name: 'Green Nickname', src: '/img/frames/m15/nickname/smooth/g.png', masks, bounds, complementary: 22 },
    { name: 'Multicolored Nickname', src: '/img/frames/m15/nickname/smooth/m.png', masks, bounds, complementary: 22 },
    { name: 'Artifact Nickname', src: '/img/frames/m15/nickname/smooth/a.png', masks, bounds, complementary: 22 },
    { name: 'Colorless Nickname', src: '/img/frames/m15/nickname/smooth/c.png', masks, bounds, complementary: 22 },
    { name: 'Land Nickname', src: '/img/frames/m15/nickname/smooth/L.png', masks, bounds, complementary: 22 },
    { name: 'Purple (Black Alt) Nickname', src: '/img/frames/m15/nickname/smooth/bAlt.png', masks, bounds, complementary: 22 },
    { name: 'Purple (Black Alt Light) Nickname', src: '/img/frames/m15/nickname/smooth/bAltLight.png', masks, bounds, complementary: 22 },

    // Color title variants (auto-add border cover at index 22)
    { name: 'White Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/w.png', masks, bounds, complementary: 22 },
    { name: 'Blue Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/u.png', masks, bounds, complementary: 22 },
    { name: 'Black Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/b.png', masks, bounds, complementary: 22 },
    { name: 'Red Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/r.png', masks, bounds, complementary: 22 },
    { name: 'Green Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/g.png', masks, bounds, complementary: 22 },
    { name: 'Multicolored Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/m.png', masks, bounds, complementary: 22 },
    { name: 'Artifact Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/a.png', masks, bounds, complementary: 22 },
    { name: 'Colorless Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/c.png', masks, bounds, complementary: 22 },
    { name: 'Land Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/L.png', masks, bounds, complementary: 22 },
    { name: 'Purple (Black Alt) Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/bAlt.png', masks, bounds, complementary: 22 },
    { name: 'Purple (Black Alt Light) Nickname', src: '/img/frames/m15/nickname/smooth/colortitle/bAltLight.png', masks, bounds, complementary: 22 },

    // Cutout elements
    { name: 'Legend Crown Border Cover (Auto Erase Title Under Crown)', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 }, erase: true, complementary: 23 },
    { name: 'Legend Crown Lower Cutout (Auto Erase Title Under Crown)', src: '/img/black.png', bounds: { x: 0.0734, y: 0.1096, width: 0.8532, height: 0.0143 }, erase: true },
    { name: 'Legend Crown Border Cover', src: '/img/black.png', bounds: { x: 0.0394, y: 0.0277, width: 0.9214, height: 0.0177 } },
    { name: 'Legend Crown Lower Cutout', src: '/img/black.png', bounds: { x: 0.0734, y: 0.1096, width: 0.8532, height: 0.0143 } },
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

export default M15SmoothNickname;
