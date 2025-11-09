import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Token-2',
  label: 'Tokens',
  packs: [
    { kind: 'pack', label:'Regular', id:'TokenRegular-1' },
    { kind: 'pack', label:'Textless', id:'TokenTextless-1' },
    { kind: 'pack', label:'Textless (Borderless)', id:'TokenTextlessBorderless' },
    { kind: 'pack', label:'Tall', id:'TokenTall-1' },
    { kind: 'pack', label:'Short', id:'TokenShort-1' },
    { kind: 'pack', label:'Monarch Token', id:'TokenMonarch' },
    { kind: 'pack', label:'Marker Card', id:'TokenMarker' },
    { kind: 'pack', label:'Initiative Token', id:'TokenInitiative' },
    { kind: 'pack', label:'Day/Night Marker', id:'TokenDayNight' },
    { kind: 'pack', label:'Planeswalker Emblems', id:'Emblem' },
    { kind: 'pack', label:'Jumpstart Front Cards', id:'JMPFront' },
    { kind: 'pack', label:'Jumpstart 2022 Front Cards', id:'J22Front' },

    { kind: 'label', label: 'Older Tokens' },
    { kind: 'pack', label:'Regular (Bordered M15)', id:'TokenRegularM15' },
    { kind: 'pack', label:'Textless (Bordered M15)', id:'TokenTextlessM15' },
    { kind: 'pack', label:'Original (Old Bordered)', id:'TokenOld' },
    { kind: 'pack', label:'Unglued', id:'TokenUnglued' },

    { kind: 'label', label:'Addons' },
    { kind: 'pack', label:'Floating Legend Crowns', id:'M15LegendCrownsFloating' },
    { kind: 'pack', label:'Inner Crowns', id:'M15InnerCrowns' },
    { kind: 'pack', label:'Holo Stamps', id:'M15HoloStamps' },
    { kind: 'pack', label:'Dark Power/Toughness', id:'M15DarkPT' },
    { kind: 'pack', label:'Colored Borders', id:'M15Borders' },
    { kind: 'pack', label:'"The List" Stamp', id:'TheList' },

    { kind: 'label', label:'Custom Addons' },
    { kind: 'pack', label:'Brawl Legend Crowns', id:'Brawl' }
  ],
}

export default group
