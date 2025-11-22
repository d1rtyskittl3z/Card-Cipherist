import type { FramePackTemplate } from './types';

const bounds = { x: 0.0594, y: 0.0377, width: 0.0734, height: 0.0524 };

const template: FramePackTemplate = {
  id: 'PlaneswalkerTransformIcons',
  label: 'Transform Icons',
  frames: [
    { name: 'Sun', src: '/img/frames/m15/transform/icons/sun.svg', bounds },
    { name: 'Crescent Moon', src: '/img/frames/m15/transform/icons/moon.svg', bounds },
    { name: 'Full Moon', src: '/img/frames/m15/transform/icons/fullmoon.svg', bounds },
    { name: 'Emrakul', src: '/img/frames/m15/transform/icons/emrakul.svg', bounds },
    { name: 'Compass', src: '/img/frames/m15/transform/icons/compass.svg', bounds },
    { name: 'Land', src: '/img/frames/m15/transform/icons/land.svg', bounds },
    { name: 'Planeswalker Ember', src: '/img/frames/m15/transform/icons/spark.svg', bounds },
    { name: 'Planeswalker Spark', src: '/img/frames/m15/transform/icons/planeswalker.svg', bounds },
    { name: 'Lesson', src: '/img/frames/m15/transform/icons/lesson.svg', bounds }
  ]
};

export default template;
