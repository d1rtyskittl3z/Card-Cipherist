import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'FleshAndBlood',
  label: 'Flesh and Blood',
  notice: 'More work need to be done for this group',
  packs: [
	{ kind: 'pack', label: 'Generic Frames', id:'FABRegular' },
	{ kind: 'pack', label: 'Class Frames', id:'FABClasses' },
	{ kind: 'pack', label: 'Hero Frames', id:'FABHeroes' },
	{ kind: 'pack', label: 'Fabled Frame', id:'FABFabled' },
	{ kind: 'pack', label: 'Talents', id:'disabled' },
	{ kind: 'pack', label: 'Light Frames', id:'FABLight' },
	{ kind: 'pack', label: 'Shadow Frames', id:'FABShadow' },
	{ kind: 'pack', label: 'Elemental Frames', id:'FABElemental' }
  ],
}

export default group
