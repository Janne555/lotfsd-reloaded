import { generateMock } from '@anatine/zod-mock'
import { CharacterSheet, CharacterSheetSchema } from './types'

const characterSheets = Array.from({ length: 1 }, (_, i): CharacterSheet => ({
  ...generateMock(CharacterSheetSchema),
  id: i.toString(),
  activities: [
    {
      id: Math.random().toString(),
      name: 'Climb',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Stealth',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Bushcraft',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Languages',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Open Doors',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Search',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Sneac Attack',
      value: Math.ceil(Math.random() * 6),
    },
    {
      id: Math.random().toString(),
      name: 'Architecture',
      value: Math.ceil(Math.random() * 6),
    }
  ],
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
      value: "1",
      id: Math.random().toString(),
      name: 'Strength +1',
    },
    {
      effect: 'add',
      targetCategory: 'attributeModifier',
      targetSubCategory: 'intelligence',
      value: "1",
      id: Math.random().toString(),
      name: 'Int +1',
    },
    {
      effect: 'add',
      targetCategory: 'savingThrows',
      targetSubCategory: 'paralyze',
      value: "1",
      id: Math.random().toString(),
      name: 'Paralyze +1',
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
  combatInfo: {
    baseAB: {
      value: 10
    },
    meleeAB: {
      value: 10
    },
    rangedAB: {
      value: 10
    },
    maxHP: {
      value: 10
    },
    currentHP: {
      value: 10
    },
    tempHP: {
      value: 10
    },
    surpriseChance: {
      value: 6
    },
  },
  armorClasses: {
    melee: {
      value: 12
    },
    ranged: {
      value: 12
    },
    withoutShield: {
      value: 12
    },
    surprised: {
      value: 12
    },
  },
  spells: [
    {
      name: 'Magic Missile',
      level: "1",
      description: 'A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d6+1 points of force damage.',
      id: 'spell-1'
    },
    {
      name: 'Fireball',
      level: "3",
      description: 'A fireball spell generates a searing explosion of flame that detonates with a low roar and deals 1d6 points of fire damage per caster level (maximum 10d6) to every creature within the area.',
      id: 'spell-2'
    },
    {
      name: 'Phantasamal Force',
      level: "2",
      description: 'You tap into the nightmares of a creature you can see within range and create an illusory manifestation of its deepest fears, visible only to that creature.',
      id: 'spell-3'
    }
  ],
  spellSlots: [
    {
      level: "1",
      preparedSpellId: 'spell-1',
      id: 'spell-slot-1',
      used: true
    },
    {
      level: "1",
      preparedSpellId: 'spell-1',
      id: 'spell-slot-2',
      used: false
    },
    {
      level: "1",
      id: 'spell-slot-3',
      used: false
    },
    {
      level: "2",
      preparedSpellId: 'spell-3',
      id: 'spell-slot-4',
      used: false
    },
    {
      level: "2",
      preparedSpellId: 'spell-3',
      id: 'spell-slot-5',
      used: false
    },
    {
      level: "3",
      preparedSpellId: 'spell-2',
      id: 'spell-slot-6',
      used: false
    },
    {
      level: "3",
      preparedSpellId: 'spell-2',
      id: 'spell-slot-7',
      used: false
    },
    {
      level: "3",
      id: 'spell-slot-8',
      used: false
    },
  ],
  languages: [
    {
      id: Math.random().toString(),
      name: 'Common',
      isKnown: true,
    },
    {
      id: Math.random().toString(),
      name: 'Kääpiötonttu',
      isKnown: false,
    },
    {
      id: Math.random().toString(),
      name: 'Käärmetonttu',
      isKnown: false,
    },
    {
      id: Math.random().toString(),
      name: 'Ancient common',
      isKnown: false,
    }
  ],
  nonEncumberingEquipment: [
    {
      id: Math.random().toString(),
      name: 'Locket',
      oversized: false
    }
  ],
  combatOptions: [
    {
      id: Math.random().toString(),
      name: 'Cleave',
    }
  ]
}))

export const mockData = {
  characterSheets,
  database: {
    version: 1,
    characterSheets
  }
}
