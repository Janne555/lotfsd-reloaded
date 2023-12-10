import { calculateAttributeModifier } from "./attributes.utils"
import { describe, expect, test } from 'vitest'
import { CharacterSheet } from '../types'
import { makeCustomCharacterSheet } from "./test.utils"

describe('calculateAttributeModifier', () => {
  test.each([
    ['charisma', 0],
    ['constitution', 0],
    ['dexterity', 0],
    ['intelligence', 0],
    ['strength', 0],
    ['wisdom', 0],
  ])('returns 0 for %s when value is 10', (attribute, expected) => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes[attribute as keyof CharacterSheet['attributes']].value = 10
      ch.effects = []
    })
    const result = calculateAttributeModifier(attribute as keyof CharacterSheet['attributes'], mockSheet)
    expect(result).toEqual(expected)
  })

  test.each([
    ['charisma', 1, -3],
    ['charisma', 2, -3],
    ['charisma', 3, -3],
    ['charisma', 4, -2],
    ['charisma', 5, -2],
    ['charisma', 6, -1],
    ['charisma', 7, -1],
    ['charisma', 8, -1],
    ['charisma', 9, 0],
    ['charisma', 10, 0],
    ['charisma', 11, 0],
    ['charisma', 12, 0],
    ['charisma', 13, 1],
    ['charisma', 14, 1],
    ['charisma', 15, 1],
    ['charisma', 16, 2],
    ['charisma', 17, 2],
    ['charisma', 18, 3],
    ['charisma', 19, 3],
    ['charisma', 20, 3],
  ])('for %s, when the value is %d it returns %d', (attribute, value, expected) => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes[attribute as keyof CharacterSheet['attributes']].value = value
      ch.effects = []
    })
    const result = calculateAttributeModifier(attribute as keyof CharacterSheet['attributes'], mockSheet)
    expect(result).toEqual(expected)
  })

  test('replace effect returns the effects value', () => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes.charisma.value = 10
      ch.effects = [{
        name: 'Cha + 1',
        targetCategory: 'attributeModifier',
        targetSubCategory: 'charisma',
        value: "420",
        effect: 'replace',
        id: '1',
        active: true,
      }]
    })
    const result = calculateAttributeModifier('charisma', mockSheet)
    expect(result).toEqual(420)
  })

  test('add effect adds to the effects value', () => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes.charisma.value = 18
      ch.effects = [{
        name: 'Cha + 1',
        targetCategory: 'attributeModifier',
        targetSubCategory: 'charisma',
        value: "1",
        effect: 'add',
        id: '1',
        active: true,
      }]
    })
    const result = calculateAttributeModifier('charisma', mockSheet)
    expect(result).toEqual(4)
  })
})

describe('calculateAttributeValue', () => {
  test.each([
    ['charisma', 0],
    ['constitution', 0],
    ['dexterity', 0],
    ['intelligence', 0],
    ['strength', 0],
    ['wisdom', 0],
  ])('returns 0 for %s when value is 10', (attribute, expected) => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes[attribute as keyof CharacterSheet['attributes']].value = 10
    })
    const result = calculateAttributeModifier(attribute as keyof CharacterSheet['attributes'], mockSheet)
    expect(result).toEqual(expected)
  })

  test.each([
    ['charisma', 1, -3],
    ['charisma', 2, -3],
    ['charisma', 3, -3],
    ['charisma', 4, -2],
    ['charisma', 5, -2],
    ['charisma', 6, -1],
    ['charisma', 7, -1],
    ['charisma', 8, -1],
    ['charisma', 9, 0],
    ['charisma', 10, 0],
    ['charisma', 11, 0],
    ['charisma', 12, 0],
    ['charisma', 13, 1],
    ['charisma', 14, 1],
    ['charisma', 15, 1],
    ['charisma', 16, 2],
    ['charisma', 17, 2],
    ['charisma', 18, 3],
    ['charisma', 19, 3],
    ['charisma', 20, 3],
  ])('for %s, when the value is %d it returns %d', (attribute, value, expected) => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes[attribute as keyof CharacterSheet['attributes']].value = value
    })
    const result = calculateAttributeModifier(attribute as keyof CharacterSheet['attributes'], mockSheet)
    expect(result).toEqual(expected)
  })

  test('replace effect returns the effects value', () => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes.charisma.value = 10
      ch.effects = [{
        name: 'Cha + 1',
        targetCategory: 'attributeModifier',
        targetSubCategory: 'charisma',
        value: "420",
        effect: 'replace',
        id: '1',
        active: true,
      }]
    })
    const result = calculateAttributeModifier('charisma', mockSheet)
    expect(result).toEqual(420)
  })

  test('add effect adds to the effects value', () => {
    const mockSheet = makeCustomCharacterSheet(ch => {
      ch.attributes.charisma.value = 18
      ch.effects = [{
        name: 'Cha + 1',
        targetCategory: 'attributeModifier',
        targetSubCategory: 'charisma',
        value: "1",
        effect: 'add',
        id: '1',
        active: true,
      }]
    })
    const result = calculateAttributeModifier('charisma', mockSheet)
    expect(result).toEqual(4)
  })
})
