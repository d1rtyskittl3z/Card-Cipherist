import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'DFC',
  label: 'Transform',
  packs: [
    { kind: 'label', label: 'Front' },
    { kind: 'pack', label: 'Regular (Front)', id:'M15TransformFront' },
    { kind: 'pack', label: 'Nyx (Front)', id:'M15TransformNyxFront' },
    { kind: 'pack', label: 'Snow (Front)', id:'M15TransformSnowFront' },
    { kind: 'pack', label: 'Universes Beyond (Front)', id:'M15TransformUBFront' },
    { kind: 'pack', label: 'Borderless (Front)', id:'TransformBorderlessFront' },
    { kind: 'pack', label: 'Extended Art (Front)', id:'TransformExtendedFront' },
    { kind: 'pack', label: 'Sagas (Front)', id:'SagaDFC' },
    { kind: 'pack', label: 'Saga Creatures (Front)', id: 'SagaCreatureFront' },
    { kind: 'pack', label: 'Saga Creatures (Back)', id: 'SagaCreatureBack' },
    { kind: 'pack', label: 'Saga Creatures (Universes Beyond) (Front)', id: 'SagaCreatureUBFront' },
    { kind: 'pack', label: 'Saga Creatures (Universes Beyond) (Back)', id: 'SagaCreatureUBBack' },

    { kind: 'label', label: 'Back' },
    { kind: 'pack', label: 'Regular (Back)', id:'M15TransformBackNew' },
    { kind: 'pack', label: 'Nyx (Back)', id:'M15TransformNyxBackNew' },
    { kind: 'pack', label: 'Snow (Back)', id:'M15TransformSnowBackNew' },
    { kind: 'pack', label: 'Universes Beyond (Back)', id:'M15TransformUBBackNew' },
    { kind: 'pack', label: 'Borderless (Back)', id:'TransformBorderlessBack' },
    { kind: 'pack', label: 'Extended Art (Back)', id:'TransformExtendedBack' },


    { kind: 'label', label: 'Common Parts' },

    { kind: 'pack', label: 'Color Identity Pips', id:'M15CIPips' },
    { kind: 'pack', label: 'Transform Icons', id:'M15TransformTypes' },

    { kind: 'label', label: 'Other frames' },
    { kind: 'pack', label: 'Regular (Back, top-left icon)', id:'M15TransformBack' },
    { kind: 'pack', label: 'Nyx (Back, top-left icon)', id:'M15TransformNyxBack' },
    { kind: 'pack', label: 'Snow (Back, top-left icon)', id:'M15TransformSnowBack' },
    { kind: 'pack', label: 'Universes Beyond (Back, top-left icon)', id:'M15TransformUBBack' },
    { kind: 'pack', label: 'SDCC15 (Blackout)', id:'TransformSDCC15' },

    { kind: 'label', label: 'Addons' },
    { kind: 'pack', label: 'Legend Crowns', id:'TransformLegendCrowns' },
    { kind: 'pack', label: 'Floating Legend Crowns', id:'TransformLegendCrownsFloating' },
    { kind: 'pack', label: 'Nickname Legend Crowns', id:'TransformLegendCrownsNickname' },
    { kind: 'pack', label: 'Legend Crowns (Universes Beyond)', id:'TransformLegendCrownsUB' },
    { kind: 'pack', label: 'Inner Crowns', id:'M15InnerCrowns' },
    { kind: 'pack', label: 'Holo Stamps', id:'M15HoloStamps' },
    { kind: 'pack', label: 'Dark Power/Toughness', id:'M15DarkPT' },
    { kind: 'pack', label: '"The List" Stamp', id:'TheList' },

    { kind: 'label', label: 'Custom Addons' },
    { kind: 'pack', label: 'Brawl Crowns', id:'TransformLegendCrownsBrawl' }
    ],
}

export default group
