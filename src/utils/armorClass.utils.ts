import { ArmorClasses, CharacterSheet } from "../types"
import { calculateAttributeModifier } from "./attributes.utils"
import { collectActiveEffects } from "./effect.utils"

export function calculateArmorClass(name: keyof ArmorClasses, characterSheet: CharacterSheet) {
  const { armorClasses } = characterSheet
  const dexterity = calculateAttributeModifier('dexterity', characterSheet)

  const effects = collectActiveEffects(characterSheet)
    .filter(effect => effect.targetCategory === 'combatInfo' && effect.targetSubCategory === 'armorClass')

  let baseAC = armorClasses[name]
  const replacementEffect = effects.find(effect => effect.effect === 'replace' && effect.targetSubCategory === name)
  if (replacementEffect) {
    baseAC = { value: Number(replacementEffect.value) }
  }

  let value = baseAC.value

  effects.forEach(effect => {
    if (effect.effect === 'add' && effect.targetSubCategory === name) {
      value += Number(effect.value)
    }
  })

  if (name !== 'surprised') {
    value += dexterity
  }
  return value
}
