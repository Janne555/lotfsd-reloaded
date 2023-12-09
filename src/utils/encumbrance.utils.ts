import { CharacterSheet } from "../types";

export function calculateEncumbrance(characterSheet: CharacterSheet) {
  const { encumbrance, equipment, weapons } = characterSheet
  let total = 0
  if (encumbrance.characterIsWearingChainMail) {
    total += 1
  }
  if (encumbrance.characterIsWearingPlateMail) {
    total += 1
  }

  equipment.forEach(item => {
    if (item.oversized) {
      total += 1
    } else {
      total += 0.2
    }
  })

  weapons.forEach(weapon => {
    if (weapon.oversized) {
      total += 1
    } else {
      total += 0.2
    }
  })

  return Math.floor(total)
}

export function encumbranceValueToState(value: number) {
  if (value <= 1) {
    return "unencumbered"
  }
  if (value <= 2) {
    return "lightlyEncumbered"
  }
  if (value <= 3) {
    return "heavilyEncumbered"
  }
  if (value <= 4) {
    return "severelyEncumbered"
  }
  return "overEncumbered"
}
