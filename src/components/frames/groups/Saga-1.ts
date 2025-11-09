import type { LegacyGroup } from './types'

const group: LegacyGroup = {
  id: 'Saga-1',
  label: 'Sagas',
  // notice: 'More work need to be done for this group',
  packs: [
    { kind: 'pack', label: 'Nyx Frames', id:'SagaNyx' },
    { kind: 'pack', label: 'Regular Frames', id:'SagaRegular' },
    { kind: 'pack', label: 'Universes Beyond Frames', id:'SagaUB' },

    { kind: 'label', label: 'Saga Creatures (Summons)' },
    { kind: 'pack', label: 'Saga Creature Frames', id: 'SagaCreature' },
    { kind: 'pack', label: 'Universes Beyond Saga Creature Frames', id: 'SagaCreatureUB' },

    { kind: 'label', label: 'Showcase Frames' },
    { kind: 'pack', label: 'Scrolls of Middle-earth (LTR)', id:'SagaLTR' },

    { kind: 'label', label: 'Addons' },
    { kind: 'pack', label: 'Legend Crowns', id:'M15LegendCrowns' },
    { kind: 'pack', label: 'Legend Crowns (Universes Beyond)', id:'UBLegendCrowns' },
    { kind: 'pack', label: 'Inner Crowns', id:'M15InnerCrowns' },
    { kind: 'pack', label: 'Holo Stamps', id:'M15HoloStamps' },
    { kind: 'pack', label: 'Colored Borders', id:'M15Borders' },
    { kind: 'pack', label: '"The List" Stamp', id:'TheList' },

    { kind: 'label', label: 'Custom Addons' },
    { kind: 'pack', label: 'Brawl Legend Crowns', id:'Brawl' }
  ],
}

export default group
