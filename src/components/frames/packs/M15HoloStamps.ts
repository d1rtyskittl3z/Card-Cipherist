import type { FramePackTemplate, FrameItem, Bounds } from './types';

const defaultBounds: Bounds = { x: 0.436, y: 0.9034, width: 0.128, height: 0.0458 };
const altBounds: Bounds = { x: 0.4554, y: 0.9172, width: 0.0894, height: 0.0320 };
const acornBounds: Bounds = { x: 0.4554, y: 0.9129, width: 0.0894, height: 0.0381 };

const frames: FrameItem[] = [
  { name: 'White Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampW.png', bounds: defaultBounds },
  { name: 'Blue Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampU.png', bounds: defaultBounds },
  { name: 'Black Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampB.png', bounds: defaultBounds },
  { name: 'Red Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampR.png', bounds: defaultBounds },
  { name: 'Green Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampG.png', bounds: defaultBounds },
  { name: 'Multicolored Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampM.png', bounds: defaultBounds },
  { name: 'Artifact Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampA.png', bounds: defaultBounds },
  { name: 'Land Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampL.png', bounds: defaultBounds },
  { name: 'Colorless Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampC.png', bounds: defaultBounds },
  { name: 'Artifact (2) Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampA2.png', bounds: defaultBounds },
  { name: 'Artifact (3) Holo Stamp', src: '/img/frames/m15/holoStamps/m15HoloStampA3.png', bounds: defaultBounds },
  { name: 'Plain Holo Stamp', src: '/img/frames/m15/holoStamps/stamp.png', bounds: altBounds },
  { name: 'Gray Holo Stamp', src: '/img/frames/m15/holoStamps/gray.png', bounds: altBounds },
  { name: 'Acorn Holo Stamp', src: '/img/frames/m15/holoStamps/acorn.png', bounds: acornBounds },
  { name: 'Alchemy Holo Stamp', src: '/img/frames/m15/holoStamps/alchemy.png', bounds: altBounds },
];

const template: FramePackTemplate = {
  id: 'M15HoloStamps',
  label: 'Holo Stamps',
  frames,
};

export default template;
