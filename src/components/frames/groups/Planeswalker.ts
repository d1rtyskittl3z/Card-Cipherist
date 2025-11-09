import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Planeswalker',
  label: 'Planeswalkers',
  notice: 'More work need to be done for this group. ',
  packs: [
    { kind: 'pack', label: 'Regular', id:'PlaneswalkerRegular' },
    { kind: 'pack', label: 'Borderless', id:'PlaneswalkerBorderless' },
    { kind: 'pack', label: 'Extended Art', id:'PlaneswalkerBoxTopper' },
    { kind: 'pack', label: 'Tall', id:'PlaneswalkerTall' },
    { kind: 'pack', label: 'Tall Borderless', id:'PlaneswalkerTallBorderless' },
    { kind: 'pack', label: 'Compleated', id:'PlaneswalkerCompleated' },
    { kind: 'pack', label: 'Innistrad: Double Feature', id:'PlaneswalkerDBL' },
    { kind: 'pack', label: 'Innistrad: Double Feature (Tall)', id:'PlaneswalkerTallDBL' },

    { kind: 'label', label: 'Addons' },
    { kind: 'pack', label: 'Holo Stamps', id:'PlaneswalkerHoloStamps' },

    { kind: 'label', label: 'Special Frames' },
    { kind: 'pack', label: 'Nickname', id:'PlaneswalkerNickname' },
    { kind: 'pack', label: 'Blackout (SDCC15)', id:'PlaneswalkerSDCC15' },

    { kind: 'label', label: 'DFC Frames' },
    { kind: 'pack', label: 'MDFC', id:'PlaneswalkerMDFC' },
    { kind: 'pack', label: 'Transform (Front)', id:'PlaneswalkerTransformFront' },
    { kind: 'pack', label: 'Transform (Back)', id:'PlaneswalkerTransformBack' },
    { kind: 'pack', label: 'Innistrad: Double Feature: Transform (Front)', id:'PlaneswalkerTransformFrontDBL' },
    { kind: 'pack', label: 'Innistrad: Double Feature: Transform (Back)', id:'PlaneswalkerTransformBackDBL' },
    { kind: 'pack', label: 'Color Identity Pips', id:'M15CIPips' },
    { kind: 'pack', label: 'Transform Icons', id:'PlaneswalkerTransformIcons' }
  ],
}

export default group
