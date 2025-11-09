import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Other',
  label: 'Other Frames',
  packs: [
    { kind: 'label', label: 'Other Frames' },
    { kind: 'pack', id: 'Custom', label: 'Custom' },
    { kind: 'pack', id: 'Misc-2', label: 'Old/Misc' },
    { kind: 'pack', id: 'Accurate', label: 'Accurate Frames' },
    { kind: 'pack', id: 'Margin', label: '1/8th Inch Margin' },
  ],
}

export default group
