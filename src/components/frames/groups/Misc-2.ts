import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Misc-2',
  label: 'Old/Misc',
  packs: [
    { kind: 'label', label: 'Old' },
    { kind: 'pack', label: 'Future Shifted', id:'FutureRegular' },
    { kind: 'pack', label: 'Colorshifted', id:'8thColorshifted' },
    { kind: 'pack', label: '8th Edition', id:'8th' },
    { kind: 'pack', label: 'Seventh Edition', id:'Seventh' },
    { kind: 'pack', label: 'Fifth Edition', id:'SeventhButFifth' },
    { kind: 'pack', label: 'Fourth Edition', id:'Fourth' },
    { kind: 'pack', label: 'Legends Multicolored', id:'Legends' },
    { kind: 'pack', label: 'Alpha/Beta/Unlimited', id:'ABU' },

    { kind: 'label', label: 'Misc' },
    { kind: 'pack', label: '8th Edition Playtest Cards', id:'8thPlaytest' },
    { kind: 'pack', label: 'Playtest Cards', id:'Playtest' },
    { kind: 'pack', label: 'Dungeon (AFR)', id:'Dungeon' },
    { kind: 'pack', label: 'Planechase', id:'Planechase' },
    { kind: 'pack', label: 'Vanguard', id:'Vanguard' },
    { kind: 'pack', label: 'Cardback', id:'Cardback' }
  ],
}

export default group
