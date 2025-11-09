import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Modal-1',
  label: "Modal DFC's",
  packs: [
    { kind: 'pack', label: 'Regular', id:'ModalRegular' },
    { kind: 'pack', label: 'Nyx', id:'ModalNyx' },
    { kind: 'pack', label: 'Snow', id:'ModalSnow' },
    { kind: 'pack', label: 'Universes Beyond', id:'ModalUB' },
    { kind: 'pack', label: 'Borderless', id:'ModalBorderless' },
    { kind: 'pack', label: 'Extended Art', id:'ModalExtended' },
    { kind: 'pack', label: 'Nickname', id:'ModalNickname' },
    { kind: 'pack', label: 'Short', id:'ModalShort' },
    { kind: 'pack', label: 'Short-Nickname', id:'ModalShortNickname' },

    { kind: 'label', label: 'Addons' },
    { kind: 'pack', label: 'Regular Legend Crowns', id:'ModalLegendCrowns' },
    { kind: 'pack', label: 'Floating Legend Crowns', id:'ModalLegendCrownsFloating' },
    { kind: 'pack', label: 'Nickname Legend Crowns', id:'ModalLegendCrownsNickname' },
    { kind: 'pack', label: 'Universes Beyond Legend Crowns', id:'ModalLegendCrownsUB' },
    { kind: 'pack', label: 'Brawl Legend Crowns', id:'ModalLegendCrownsBrawl' },
    { kind: 'pack', label: 'Inner Crowns', id:'M15InnerCrowns' },
    { kind: 'pack', label: 'Holo Stamps', id:'M15HoloStamps' },
    { kind: 'pack', label: 'Dark Power/Toughness', id:'M15DarkPT' },
    { kind: 'pack', label: 'Colored Borders', id:'M15Borders' },
    { kind: 'pack', label: 'Color Identity Pips', id:'M15CIPips' },
    { kind: 'pack', label: '"The List" Stamp', id:'TheList' },

    { kind: 'label', label: 'Misc' },
    { kind: 'pack', label: 'Helper Cards', id:'ModalHelper' }
  ],
}

export default group
