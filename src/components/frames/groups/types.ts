export type GroupEntry =
  | { kind: 'label'; label: string }
  | { kind: 'pack'; id: string; label: string }

export type LegacyGroup = {
  id: string
  label: string
  // Optional toast message to show when this group is selected
  notice?: string
  packs: GroupEntry[]
}
