import { describe, expect, test } from "vitest"
import { makeCustomCharacterSheet } from "./test.utils"
import { calculateSpellSlots } from "./spellSlot.utils"

describe('spellSlot.utils', () => {
  test('calculateSpellSlots', () => {
    const sheet = makeCustomCharacterSheet(ch => {
      ch.spellSlots = [
        { id: '1', level: 1, preparedSpellId: '1', used: true },
        { id: '2', level: 1, preparedSpellId: '2', used: false },
        { id: '3', level: 1, preparedSpellId: '3', used: false },
        { id: '4', level: 2, preparedSpellId: '4', used: false },
        { id: '5', level: 2, preparedSpellId: '5', used: false },
        { id: '6', level: 3, preparedSpellId: '6', used: false },
        { id: '7', level: 3, preparedSpellId: '7', used: true }
      ]
    })

    const result = calculateSpellSlots(sheet.spellSlots)

    expect(result).toEqual({
      1: { count: 3, remaining: 2 },
      2: { count: 2, remaining: 2 },
      3: { count: 2, remaining: 1 }
    })
  })
})