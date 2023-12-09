import { z } from "zod"

const AttributeSchema = z.object({
  value: z.number()
})

const SavingThrowSchema = z.object({
  value: z.number()
})

const AttackBonusSchema = z.object({
  value: z.number()
})

const HitPointsSchema = z.object({
  value: z.number()
})

const SurpriseChanceSchema = z.object({
  value: z.number().min(0).max(6),
})

const ArmorClassSchema = z.object({
  value: z.number()
})

const ActivitySchema = z.object({
  value: z.number().min(0).max(6),
})

const EncumbranceSchema = z.object({
  characterIsWearingChainMail: z.boolean(),
  characterIsWearingPlateMail: z.boolean()
})

const LanguageSchema = z.object({
  isKnown: z.boolean(),
  name: z.string(),
  id: z.string(),
})

const ItemSchema = z.object({
  name: z.string(),
  oversized: z.boolean(),
  id: z.string(),
})

const WeaponSchema = z.object({
  name: z.string(),
  attackBonus: z.number(),
  damage: z.string(),
  oversized: z.boolean(),
  id: z.string(),
  range: z
    .object({
      short: z.string().optional(),
      medium: z.string().optional(),
      long: z.string().optional(),
    })
    .optional(),
})

const SpellSchema = z.object({
  name: z.string(),
  description: z.string(),
  prepared: z.boolean(),
  level: z.number(),
  id: z.string(),
})

const CombatOptionSchema = z.object({
  name: z.string(),
})

const InfoSchema = z.object({
  name: z.string(),
  currentXp: z.number(),
  xpForNextLevel: z.number(),
  class: z.string(),
  race: z.string(),
  age: z.number(),
  gender: z.string(),
  alignment: z.string()
})

const AttributesSchema = z.object({
  charisma: AttributeSchema,
  constitution: AttributeSchema,
  dexterity: AttributeSchema,
  intelligence: AttributeSchema,
  strength: AttributeSchema,
  wisdom: AttributeSchema,
})

const SavingThrowsSchema = z.object({
  paralyze: SavingThrowSchema,
  poison: SavingThrowSchema,
  breathWeapon: SavingThrowSchema,
  magicalDevice: SavingThrowSchema,
  magic: SavingThrowSchema,
})

const CombatInfoSchema = z.object({
  baseAB: AttackBonusSchema,
  meleeAB: AttackBonusSchema,
  rangedAB: AttackBonusSchema,
  maxHP: HitPointsSchema,
  currentHP: HitPointsSchema,
  surpriseChance: SurpriseChanceSchema,
})

const ArmorClassesSchema = z.object({
  melee: ArmorClassSchema,
  ranged: ArmorClassSchema,
  withoutShield: ArmorClassSchema,
  surprised: ArmorClassSchema,
})

const ActivitiesSchema = z.record(ActivitySchema)

const EffectSchema = z.object({
  effect: z.enum(["add", "replace", "unknown"]),
  targetCategory: z.enum(["attributes", "attributeModifier", "savingThrows", "combatInfo", "armorClasses", "encumbrance"]),
  targetSubCategory: z.string(),
  valueNum: z.number().optional(),
  valueStr: z.string().optional(),
  id: z.string(),
  name: z.string(),
  active: z.boolean().optional(),
})

const SpellSlotSchema = z.object({
  level: z.number(),
  count: z.number(),
  usedCount: z.number()
})

const CharacterSheetSchema = z.object({
  id: z.string(),
  version: z.number(),
  info: InfoSchema,
  attributes: AttributesSchema,
  savingThrows: SavingThrowsSchema,
  combatInfo: CombatInfoSchema,
  armorClasses: ArmorClassesSchema,
  activities: ActivitiesSchema,
  encumbrance: EncumbranceSchema,
  languages: z.array(LanguageSchema),
  equipment: z.array(ItemSchema),
  nonEncumberingEquipment: z.array(ItemSchema),
  weapons: z.array(WeaponSchema),
  spells: z.array(SpellSchema),
  spellSlots: z.array(SpellSlotSchema),
  combatOptions: z.array(CombatOptionSchema),
  effects: z.array(EffectSchema)
})

export {
  AttributeSchema,
  SavingThrowSchema,
  AttackBonusSchema,
  HitPointsSchema,
  SurpriseChanceSchema,
  ArmorClassSchema,
  ActivitySchema,
  EncumbranceSchema,
  LanguageSchema,
  ItemSchema,
  WeaponSchema,
  SpellSchema,
  CombatOptionSchema,
  InfoSchema,
  AttributesSchema,
  SavingThrowsSchema,
  CombatInfoSchema,
  ArmorClassesSchema,
  ActivitiesSchema,
  CharacterSheetSchema,
  EffectSchema,
  SpellSlotSchema,
}

export type Attribute = z.infer<typeof AttributeSchema>
export type SavingThrow = z.infer<typeof SavingThrowSchema>
export type AttackBonus = z.infer<typeof AttackBonusSchema>
export type HitPoints = z.infer<typeof HitPointsSchema>
export type SurpriseChance = z.infer<typeof SurpriseChanceSchema>
export type ArmorClass = z.infer<typeof ArmorClassSchema>
export type Activity = z.infer<typeof ActivitySchema>
export type Encumbrance = z.infer<typeof EncumbranceSchema>
export type Language = z.infer<typeof LanguageSchema>
export type Item = z.infer<typeof ItemSchema>
export type Weapon = z.infer<typeof WeaponSchema>
export type Spell = z.infer<typeof SpellSchema>
export type CombatOption = z.infer<typeof CombatOptionSchema>
export type Info = z.infer<typeof InfoSchema>
export type Attributes = z.infer<typeof AttributesSchema>
export type SavingThrows = z.infer<typeof SavingThrowsSchema>
export type CombatInfo = z.infer<typeof CombatInfoSchema>
export type ArmorClasses = z.infer<typeof ArmorClassesSchema>
export type Activities = z.infer<typeof ActivitiesSchema>
export type CharacterSheet = z.infer<typeof CharacterSheetSchema>
export type Effect = z.infer<typeof EffectSchema>
export type SpellSlot = z.infer<typeof SpellSlotSchema>
