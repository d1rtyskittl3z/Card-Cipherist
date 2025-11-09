import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Promo-2',
  label: 'Promos (Tall Art)',
  packs: [
    { kind: 'pack', label: 'Regular Frames', id:'PromoOpenHouse' },
    { kind: 'pack', label: 'Borderless Frames', id:'PromoRegular-1' },
    { kind: 'pack', label: 'Borderless Frames (Extra Short)', id:'IkoShort' },
    { kind: 'pack', label: 'Nyx Frames', id:'PromoNyx' },
    { kind: 'pack', label: 'Extended Art Frames', id:'PromoExtended' },
    { kind: 'pack', label: 'Nickname Frames', id:'PromoNickname' },
    { kind: 'pack', label: 'Generic Showcase', id:'PromoGenericShowcase' },

    { kind: 'label', label: 'Addons' },
    { kind: 'pack', label: 'Legend Crowns', id:'M15LegendCrowns' },
    { kind: 'pack', label: 'Floating Legend Crowns', id:'M15LegendCrownsFloating' },
    { kind: 'pack', label: 'Smooth Nickname Legend Crowns', id:'M15SmoothNickname' },    
    { kind: 'pack', label: 'Inner Crowns', id:'M15InnerCrowns' },
    { kind: 'pack', label: 'Holo Stamps', id:'M15HoloStamps' },
    { kind: 'pack', label: 'Dark Power/Toughness', id:'M15DarkPT' },
    { kind: 'pack', label: 'Colored Borders', id:'M15Borders' },
    { kind: 'pack', label: '"The List" Stamp', id:'TheList' },

    { kind: 'label', label: 'Custom Addons' },
    { kind: 'pack', label: 'Brawl Legend Crowns', id:'Brawl' }
  ],
}

export default group
