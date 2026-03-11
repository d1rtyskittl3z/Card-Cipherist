import type { FramePackTemplate, FrameItem, Bounds } from './types';

const bounds: Bounds = { x: 0, y: 0, width: 1, height: 1 };
const boundsStamp: Bounds = { x: 0.4365, y: 0.902, width: 0.1264, height: 0.0452 };

const frames: FrameItem[] = [
  { name: 'Border', src: '/img/frames/fca/border.png', bounds },
  { name: 'Triangle Holo Stamp', src: '/img/frames/fca/stamp/stampTriangle.png', bounds },
  { name: 'Grey Triangle Stamp', src: '/img/frames/fca/stamp/greyTriangle.png', bounds },
  { name: 'Round Holo Stamp', src: '/img/frames/fca/stamp/stampRound.png', bounds: boundsStamp },
  { name: 'Grey Round Stamp', src: '/img/frames/fca/stamp/greyRound.png', bounds: boundsStamp },
];

// Default layout: title at top position (Option A).
// When a frame from this pack is added and no nickname field exists yet, the system automatically
// adds the nickname field (from text.nickname) and repositions title to the subtitle position
// (from text.titleWithNickname). This mirrors the original addTextbox('Nickname') behavior.
// titleWithNickname is a hidden config key used only for the swap — it is never rendered directly.
//
// The original source also converted newlines to {lns}{down7} in rules text; {down7} shifts text
// down by 7px and is supported by the current renderer via the text code system.

const template: FramePackTemplate = {
  id: 'FCA',
  label: 'Borderless Source Material',
  version: 'fca',
  notice: 'Adding any frame from this pack will automatically add a Nickname text field and reposition Title to a subtitle row below it. To use standard single-title layout, simply leave the Nickname field empty.',
  artBounds: { x: 0, y: 0, width: 1.005, height: 0.9324 },
  setSymbolBounds: { x: 0.91, y: 0.635, width: 0.12, height: 0.0410, vertical: 'center', horizontal: 'right', outlineWidth: 0.003, outlineColor: 'black' },
  watermarkBounds: { x: 0.5, y: 0.7762, width: 0.75, height: 0.2305 },
  frames,
  text: {
    mana: { name: 'Mana Cost', text: '', y: 173 / 2814, width: 1863 / 2010, height: 71 / 2100, oneLine: true, size: 71 / 1638, align: 'right', outlineWidth: 0.010, manaCost: true, manaSpacing: 0 },
    // Standard title (Option A) — repositioned to subtitle when nickname is added
    title: { name: 'Title', placeholder: 'If you are going to use a Nickname leave this field empty and use the Nickname and Title tabs to the right towards the end...', text: '', x: 163 / 2010, y: 139 / 2814, width: 1667 / 2010, height: 153 / 2814, oneLine: true, font: 'belerenb', size: 0.0381, outlineWidth: 0.008, color: 'white' },
    type: { name: 'Type', text: '', x: 172 / 2010, y: 1582 / 2814, width: 1542 / 2010, height: 153 / 2814, oneLine: true, font: 'belerenb', size: 0.0319, outlineWidth: 0.008, color: 'white' },
    rules: { name: 'Rules Text', text: '', x: 173 / 2010, y: 1770 / 2814, width: 1679 / 2010, height: 775 / 2814, size: 0.036, lineSpacing: -0.001, outlineWidth: 0.008, color: 'white', noVerticalCenter: true },
    pt: { name: 'Power/Toughness', text: '', x: 1598 / 2010, y: 2464 / 2814, width: 246 / 2010, height: 138 / 2814, size: 0.04, outlineWidth: 0.008, font: 'belerenbsc', oneLine: true, align: 'center', color: 'white' },
    // Nickname field — added dynamically when first frame is placed (takes the top title position)
    nickname: { name: 'Nickname', text: '', x: 163 / 2010, y: 139 / 2814, width: 1667 / 2010, height: 153 / 2814, oneLine: true, font: 'belerenb', size: 0.0381, outlineWidth: 0.008, color: 'white' },
    // titleWithNickname — used internally to reposition title when nickname is added (not rendered directly)
    titleWithNickname: { name: 'Title', text: '', x: 172 / 2010, y: 315 / 2814, width: 0.768, height: 0.0243, oneLine: true, font: 'mplantini', size: 0.0240, outlineWidth: 0.0080, color: 'white', align: 'left' },
  },
};

export default template;
