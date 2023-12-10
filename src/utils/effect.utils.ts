import { CharacterSheet } from "../types"

export function collectEffects(characterSheet: CharacterSheet) {
  const { effects } = characterSheet
  return effects
}

export function collectActiveEffects(characterSheet: CharacterSheet) {
  return collectEffects(characterSheet).filter(effect => effect.active)
}
