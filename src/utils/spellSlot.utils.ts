import { CharacterSheet } from "../types"

export function calculateSpellSlots(spellSlots: CharacterSheet['spellSlots']) {
  const spellSlotCountByLevel = spellSlots.reduce((acc, curr) => {
    acc[Number(curr.level)] = acc[Number(curr.level)] ? acc[Number(curr.level)] + 1 : 1
    return acc
  }, {} as Record<number, number>)

  const spellSlotCountsAndRemainingSpellSlots = Object.entries(spellSlotCountByLevel).reduce((acc, [level, count]) => {
    const remaining = spellSlots.filter(s => Number(s.level) === Number(level) && !s.used).length
    acc[Number(level)] = { count, remaining }
    return acc
  }, {} as Record<number, { count: number, remaining: number }>)

  return spellSlotCountsAndRemainingSpellSlots
}
