export const CharacterSheetV0 = {
  id: 'v0-sheet',
  activities: [
    {
      id: '1',
      name: 'Climb',
      value: 3,
    },
    {
      id: '2',
      name: 'Stealth',
      value: 3,
    },
    {
      id: '3',
      name: 'Bushcraft',
      value: 3,
    },
    {
      id: '4',
      name: 'Languages',
      value: 3,
    },
    {
      id: '5',
      name: 'Open Doors',
      value: 3,
    },
    {
      id: '6',
      name: 'Search',
      value: 3,
    },
    {
      id: '7',
      name: 'Sneac Attack',
      value: 3,
    },
    {
      id: '8',
      name: 'Architecture',
      value: 3,
    }
  ],
  weapons: [
    {
      name: 'Sword',
      damage: '1d6',
      oversized: false,
      attackBonus: 1,
      id: '9',
    },
    {
      id: '10',
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
      id: '11',
      name: 'Greatsword',
      damage: '1d10',
      oversized: true,
      attackBonus: 1,
    },
    {
      id: '12',
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
      id: '13',
      name: 'Rope',
      oversized: false,
    },
    {
      id: '14',
      name: 'Torch',
      oversized: false,
    },
    {
      id: '15',
      name: 'Lantern',
      oversized: false,
    },
    {
      id: '16',
      name: 'Backpack',
      oversized: false,
    },
    {
      id: '17',
      name: 'Candle',
      oversized: false,
    },
    {
      id: '18',
      name: 'Flint & Steel',
      oversized: false,
    },
    {
      id: '19',
      name: 'Waterskin',
      oversized: false,
    },
    {
      id: '20',
      name: 'Rations',
      oversized: false,
    },
    {
      id: '21',
      name: 'Bedroll',
      oversized: false,
    },
    {
      id: '22',
      name: 'Tent',
      oversized: false,
    },
    {
      id: '23',
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
      id: '24',
      name: 'Strength +1',
    },
    {
      effect: 'add',
      targetCategory: 'attributeModifier',
      targetSubCategory: 'intelligence',
      value: "1",
      id: '25',
      name: 'Int +1',
    },
    {
      effect: 'add',
      targetCategory: 'savingThrows',
      targetSubCategory: 'paralyze',
      value: "1",
      id: '26',
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
      id: '28',
      name: 'Common',
      isKnown: true,
    },
    {
      id: '29',
      name: 'Kääpiötonttu',
      isKnown: false,
    },
    {
      id: '30',
      name: 'Käärmetonttu',
      isKnown: false,
    },
    {
      id: '31',
      name: 'Ancient common',
      isKnown: false,
    }
  ],
  nonEncumberingEquipment: [
    {
      id: '32',
      name: 'Locket',
      oversized: false
    }
  ],
  combatOptions: [
    {
      id: '33',
      name: 'Cleave',
    }
  ],
  encumbrance: {
    characterIsWearingChainMail: false,
    characterIsWearingPlateMail: false
  }
}