export type Info = {
  name: string
  currentXp: string
  XpForNextLevel: string
  class: string
  race: string
  age: string
  gender: string
  alignment: string
}

export type Attributes = {
  charisma: Attribute
  constitution: Attribute
  dexterity: Attribute
  intelligence: Attribute
  strength: Attribute
  wisdom: Attribute
}

export type Attribute = {
  value: number
  modifier: number
}

export type SavingThrows = {
  paralyze: SavingThrow
  poison: SavingThrow
  breathWeapon: SavingThrow
  magicalDevice: SavingThrow
  magic: SavingThrow
}

export type SavingThrow = {
  value: number
}

export type CombatInfo = {
  baseAB: AttackBonus
  meleeAB: AttackBonus
  rangedAB: AttackBonus
  maxHP: HitPoints
  currentHP: HitPoints
  surpriseChance: SurpriseChance
}

export type AttackBonus = {
  value: number
}

export type HitPoints = {
  value: number
}

export type SurpriseChance = {
  value: number
}

export type ArmorClasses = {
  melee: ArmorClass
  ranged: ArmorClass
  withoutShield: ArmorClass
  surprised: ArmorClass
}

export type ArmorClass = {
  value: number
}

export type Activities = {
  architecture: Activity
  bushcraft: Activity
  climbing: Activity
  languages: Activity
  openDoors: Activity
  search: Activity
  sleightOfHand: Activity
  sneakAttack: Activity
  stealth: Activity
  tinkering: Activity
  [name: string]: Activity
}

export type Activity = {
  value: number
}

export type Encumbrance = {
  value: number
  state: "unencumbered" | "lightlyEncumbered" | "heavilyEncumbered" | "severelyEncumbered" | "overencumbered"
}

export type Language = {
  type: "known" | "not-known"
  name: string
}

export type Item = {
  name: string
}

export type Weapon = {
  name: string
  attackBonus: number
  damage: string
  range?: {
    short?: string
    medium?: string
    long?: string
  }
}

export type Spell = {
  name: string
  prepared: boolean
  level: number
}

export type CombatOption = {
  name: string
}

export type CharacterSheet = {
  id: string
  version: number
  info: Info
  attributes: Attributes
  savingThrows: SavingThrows
  combatInfo: CombatInfo
  armorClasses: ArmorClasses
  activities: Activities
  encumbrance: Encumbrance
  languages: Language[]
  equipment: Item[]
  nonEncumberingEquipment: Item[]
  weapons: Weapon[]
  spells: Spell[]
  combatOptions: CombatOption[]
}
