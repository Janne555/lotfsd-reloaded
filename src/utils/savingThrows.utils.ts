import { CharacterSheet, SavingThrows } from "../types"

export function calculateSavingThrow(name: keyof SavingThrows, characterSheet: CharacterSheet) {
  const attributeValue = characterSheet.savingThrows[name]
  const valueEffects = characterSheet.effects.filter(
    effect => effect.targetCategory === "savingThrows"
      && effect.targetSubCategory === name
      && effect.active
  )
  if (valueEffects.find(effect => effect.effect === "replace")) {
    return valueEffects.find(effect => effect.effect === "replace")?.valueNum ?? 0
  }

  return valueEffects.reduce((total, effect) => {
    if (effect.effect === "add") {
      return total + (effect.valueNum ?? 0)
    }
    return total
  }, attributeValue.value)
}
