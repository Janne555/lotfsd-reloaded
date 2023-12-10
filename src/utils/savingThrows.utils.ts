import { CharacterSheet, SavingThrows } from "../types"

export function calculateSavingThrow(name: keyof SavingThrows, characterSheet: CharacterSheet) {
  const attributeValue = characterSheet.savingThrows[name]
  const valueEffects = characterSheet.effects.filter(
    effect => effect.targetCategory === "savingThrows"
      && effect.targetSubCategory === name
      && effect.active
  )
  if (valueEffects.find(effect => effect.effect === "replace")) {
    return Number(valueEffects.find(effect => effect.effect === "replace")?.value ?? 0)
  }

  return valueEffects.reduce((total, effect) => {
    if (effect.effect === "add") {
      return total + Number((effect.value ?? 0))
    }
    return total
  }, attributeValue.value)
}
