import type { FramePackTemplate, FrameItem } from './types';

const bounds = { x: 1737 / 2010, y: 0.0505, width: 0.0734, height: 0.0524 };

const frames: FrameItem[] = [
  { name: 'Up Arrow', src: '/img/frames/m15/transform/icons/default.png', bounds },
  { name: 'Down Arrow', src: '/img/frames/m15/transform/icons/downArrow.png', bounds },
  { name: 'Sun', src: '/img/frames/m15/transform/icons/sun.svg', bounds },
  { name: 'Crescent Moon', src: '/img/frames/m15/transform/icons/moon.svg', bounds },
  { name: 'Full Moon', src: '/img/frames/m15/transform/icons/fullmoon.svg', bounds },
  { name: 'Emrakul', src: '/img/frames/m15/transform/icons/emrakul.svg', bounds },
  { name: 'Compass', src: '/img/frames/m15/transform/icons/compass.svg', bounds },
  { name: 'Land', src: '/img/frames/m15/transform/icons/land.svg', bounds },
  { name: 'Planeswalker Ember', src: '/img/frames/m15/transform/icons/spark.svg', bounds },
  { name: 'Planeswalker Spark', src: '/img/frames/m15/transform/icons/planeswalker.svg', bounds },
  { name: 'Lesson', src: '/img/frames/m15/transform/icons/lesson.svg', bounds },
  { name: 'Closed Fan', src: '/img/frames/m15/transform/icons/fanClosed.svg', bounds },
  { name: 'Open Fan', src: '/img/frames/m15/transform/icons/fanOpen.svg', bounds },
  { name: 'Meld', src: '/img/frames/m15/transform/icons/hammer.png', bounds },
];

const template: FramePackTemplate = {
  id: 'M15TransformTypesBack',
  label: 'Transform Icons (Back/Right)',
  frames,
};

export default template;
