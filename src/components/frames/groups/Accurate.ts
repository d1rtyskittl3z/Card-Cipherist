import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Accurate',
  label: 'Accurate Frames',
  packs: [
    { kind: 'pack', label: 'Regular Frames', id:'M15RegularNew' },
    { kind: 'pack', label: 'Extended Art Frames', id:'M15ExtendedArtNew' },

    { kind: 'label', label: 'Addons' },
    { kind: 'pack', label: 'Legend Crowns', id:'M15LegendCrownsNew' },
    { kind: 'pack', label: 'Inner Crowns', id:'M15InnerCrownsNew' },
    { kind: 'pack', label: 'Dark Power/Toughness', id:'M15DarkPT' },
    { kind: 'pack', label: '"The List" Stamp', id:'TheList' },

    { kind: 'label', label: 'Other Frames' },
    { kind: 'pack', label: 'Full Art', id:'FullArtNew' },
    { kind: 'pack', label: 'Snow (Kaldheim)', id:'SnowNew' },
    { kind: 'pack', label: 'Nyx (Theros)', id:'M15NyxNew' },

    {kind: 'label', label: 'Universes Beyond Frames' },
    { kind: 'pack', label: 'Universes Beyond', id:'UBNew' },
    { kind: 'pack', label: 'Legend Crowns (Universes Beyond)', id:'UBLegendCrownsNew' }
  ],
}

export default group
