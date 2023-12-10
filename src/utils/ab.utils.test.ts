import { describe, expect, test } from "vitest"
import { makeCustomCharacterSheet } from "./test.utils"
import { calculateAttackBonus } from "./ab.utils"

describe("ab.utils", () => {
  test.each([
    ['baseAB', 10],
    ['meleeAB', 10],
    ['rangedAB', 10],
  ])("calculate %s with attribute %s and base value %s equals 0", (name, attribute) => {
    const sheet = makeCustomCharacterSheet(ch => {
      ch.attributes.strength.value = attribute
      ch.attributes.dexterity.value = attribute
      ch.combatInfo.baseAB.value = 0
      ch.combatInfo.meleeAB.value = 0
      ch.combatInfo.rangedAB.value = 0
      ch.effects = []
    })
    const ab = calculateAttackBonus(name as any, sheet)
    expect(ab).toBe(0)
  })

  test.each([
    ['baseAB', 10],
    ['meleeAB', 10],
    ['rangedAB', 10],
  ])("with a replacement effect %s is 5", (name, attribute) => {
    const sheet = makeCustomCharacterSheet(ch => {
      ch.attributes.strength.value = attribute
      ch.attributes.dexterity.value = attribute
      ch.combatInfo.baseAB.value = 0
      ch.combatInfo.meleeAB.value = 0
      ch.combatInfo.rangedAB.value = 0
      ch.effects = [{
        effect: 'replace',
        targetCategory: 'combatInfo',
        targetSubCategory: name,
        value: '5',
        id: '1',
        name: 'test',
        active: true
      }]
    })
    const ab = calculateAttackBonus(name as any, sheet)
    expect(ab).toBe(5)
  })

  test.each([
    ['baseAB', 14, 1],
    ['meleeAB', 14, 2],
    ['rangedAB', 14, 2],
  ])("with a additive effect %s is 2", (name, attribute, expected) => {
    const sheet = makeCustomCharacterSheet(ch => {
      ch.attributes.strength.value = attribute
      ch.attributes.dexterity.value = attribute
      ch.combatInfo.baseAB.value = 0
      ch.combatInfo.meleeAB.value = 0
      ch.combatInfo.rangedAB.value = 0
      ch.effects = [{
        effect: 'add',
        targetCategory: 'combatInfo',
        targetSubCategory: name,
        value: '1',
        id: '1',
        name: 'test',
        active: true
      }]
    })
    const ab = calculateAttackBonus(name as any, sheet)
    expect(ab).toBe(expected)
  })

  test("with replaced baseAB and attribute 16", () => {
    const sheet = makeCustomCharacterSheet(ch => {
      ch.attributes.strength.value = 16
      ch.combatInfo.baseAB.value = 0
      ch.effects = [{
        effect: 'replace',
        targetCategory: 'combatInfo',
        targetSubCategory: 'baseAB',
        value: '5',
        id: '1',
        name: 'test',
        active: true
      }]
    })
    const ab = calculateAttackBonus('meleeAB', sheet)
    expect(ab).toBe(7)
  })
})
