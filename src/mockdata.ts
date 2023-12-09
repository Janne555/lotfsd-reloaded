import { generateMock } from '@anatine/zod-mock'
import { CharacterSheet, CharacterSheetSchema } from './types'

const characterSheets = Array.from({ length: 10 }, (_, i): CharacterSheet => ({
  ...generateMock(CharacterSheetSchema),
  id: i.toString(),
  activities: {
    sneackAttack: {
      value: 1
    },
    bushcraft: {
      value: 1
    },
    climb: {
      value: 1
    },
    languages: {
      value: 6
    },
  },
  weapons: [
    {
      name: 'Sword',
      damage: '1d6',
      oversized: false,
      attackBonus: 1,
      id: Math.random().toString(),
    },
    {
      id: Math.random().toString(),
      name: 'Bow',
      damage: '1d6',
      range: {
        short: '1',
        medium: '2',
        long: '3',
      },
      oversized: false,
      attackBonus: 1,
    },
    {
      id: Math.random().toString(),
      name: 'Greatsword',
      damage: '1d10',
      oversized: true,
      attackBonus: 1,
    },
    {
      id: Math.random().toString(),
      name: 'Greatbow',
      damage: '1d10',
      range: {
        short: '1',
        medium: '2',
        long: '3',
      },
      oversized: true,
      attackBonus: 1,
    }
  ],
  equipment: [
    {
      id: Math.random().toString(),
      name: 'Rope',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Torch',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Lantern',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Backpack',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Candle',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Flint & Steel',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Waterskin',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Rations',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Bedroll',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Tent',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Crowbar',
      oversized: false,
    }
  ],
  info: {
    age: 20,
    alignment: 'Neutral',
    class: 'Fighter',
    currentXp: 0,
    xpForNextLevel: 1000,
    gender: 'Male',
    name: 'John Doe',
    race: 'Human'
  },
  attributes: {
    strength: {
      value: 10
    },
    dexterity: {
      value: 10
    },
    constitution: {
      value: 10
    },
    intelligence: {
      value: 10
    },
    wisdom: {
      value: 10
    },
    charisma: {
      value: 10
    },
  },
  effects: [
    {
      effect: 'add',
      targetCategory: 'attributes',
      targetSubCategory: 'strength',
      valueNum: 1,
      id: Math.random().toString(),
      name: 'Strength +1',
    },
    {
      effect: 'add',
      targetCategory: 'attributeModifier',
      targetSubCategory: 'intelligence',
      valueNum: 1,
      id: Math.random().toString(),
      name: 'Int +1',
    }
  ],
  savingThrows: {
    paralyze: {
      value: 10
    },
    poison: {
      value: 10
    },
    breathWeapon: {
      value: 10
    },
    magicalDevice: {
      value: 10
    },
    magic: {
      value: 10
    },
  },
}))

export const mockData = {
  characterSheets,
}
