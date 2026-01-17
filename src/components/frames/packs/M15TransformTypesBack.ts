import type { FramePackTemplate, FrameItem, Bounds } from './types';

const iconBounds: Bounds = { x: 1737 / 2010, y: 0.0505, width: 0.0734, height: 0.0524 };
const iconBounds2: Bounds = { x: 0.0649, y: 162 / 2814, width: 0.0349, height: 0.0185 };

const frames: FrameItem[] = [
  { name: 'Retro Arrow Up', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/retroUp.png', bounds: iconBounds2 },
	{ name: 'Retro Arrow Down', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/mdfc/retroDown.png', bounds: iconBounds2 },
  { name: 'Up Arrow', src: '/img/frames/m15/transform/icons/default.png', bounds: iconBounds },
  { name: 'Down Arrow', src: '/img/frames/m15/transform/icons/downArrow.png', bounds: iconBounds },
  { name: 'Sun', src: '/img/frames/m15/transform/icons/sun.svg', bounds: iconBounds },
  { name: 'Crescent Moon', src: '/img/frames/m15/transform/icons/moon.svg', bounds: iconBounds },
  { name: 'Full Moon', src: '/img/frames/m15/transform/icons/fullmoon.svg', bounds: iconBounds },
  { name: 'Emrakul', src: '/img/frames/m15/transform/icons/emrakul.svg', bounds: iconBounds },
  { name: 'Compass', src: '/img/frames/m15/transform/icons/compass.svg', bounds: iconBounds },
  { name: 'Land', src: '/img/frames/m15/transform/icons/land.svg', bounds: iconBounds },
  { name: 'Planeswalker Ember', src: '/img/frames/m15/transform/icons/spark.svg', bounds: iconBounds },
  { name: 'Planeswalker Spark', src: '/img/frames/m15/transform/icons/planeswalker.svg', bounds: iconBounds },
  { name: 'Lesson', src: '/img/frames/m15/transform/icons/lesson.svg', bounds: iconBounds },
  { name: 'Closed Fan', src: '/img/frames/m15/transform/icons/fanClosed.svg', bounds: iconBounds },
  { name: 'Open Fan', src: '/img/frames/m15/transform/icons/fanOpen.svg', bounds: iconBounds },
  { name: 'Meld', src: '/img/frames/m15/transform/icons/hammer.png', bounds: iconBounds },
];

const template: FramePackTemplate = {
  id: 'M15TransformTypesBack',
  label: 'Transform Icons (Back/Right)',
  frames,
};

export default template;
