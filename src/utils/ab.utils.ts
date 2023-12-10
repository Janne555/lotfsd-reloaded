import { CharacterSheet } from "../types";
import { calculateAttributeModifier } from "./attributes.utils";
import { collectActiveEffects } from "./effect.utils";

export function calculateAttackBonus(name: 'meleeAB' | 'rangedAB' | 'baseAB', characterSheet: CharacterSheet) {
  const { combatInfo } = characterSheet
  const strength = calculateAttributeModifier('strength', characterSheet)
  const dexterity = calculateAttributeModifier('dexterity', characterSheet)
  const effects = collectActiveEffects(characterSheet)
    .filter(effect => effect.targetCategory === 'combatInfo' && ['baseAB', 'meleeAB', 'rangedAB'].includes(effect.targetSubCategory))

  let baseAB = combatInfo.baseAB
  const replaceBaseABEffect = effects.find(effect => effect.effect === 'replace' && effect.targetSubCategory === 'baseAB')
  if (replaceBaseABEffect) baseAB = { value: Number(replaceBaseABEffect.value) }

  const replaceEffect = effects.find(effect => effect.effect === 'replace' && effect.targetSubCategory === name)
  if (replaceEffect) return Number(replaceEffect.value)

  let value = baseAB.value

  effects.forEach(effect => {
    if (effect.effect === 'add' && effect.targetSubCategory === name) {
      value += Number(effect.value)
    }
  })

  if (name === 'meleeAB') {
    value += strength
  }
  if (name === 'rangedAB') {
    value += dexterity
  }

  return value
}
