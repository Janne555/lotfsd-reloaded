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
    },
    {
      id: Math.random().toString(),
      name: 'Hammer',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Spikes',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Shovel',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Pole',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Mirror',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Chalk',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Paper',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Ink',
      oversized: false,
    },
    {
      id: Math.random().toString(),
      name: 'Quill',
      oversized: false
    }
  ],
}))

export const mockData = {
  characterSheets,
}
