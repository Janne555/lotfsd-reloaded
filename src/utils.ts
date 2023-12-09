import { Attributes, CharacterSheet } from "./types"

export function deCamel(text: string) {
  return text.replace(/(?<=[a-z])[A-Z]/gm, value => ` ${value}`)
}

export function range(range: number) {
  return [...Array(range)].map((_, i) => i)
}

export function partition<T>(array: T[], filter: (value: T) => boolean): [T[], T[]] {
  return array.reduce((items, current) => {
    if (filter(current)) {
      items[0].push(current)
    } else {
      items[1].push(current)
    }
    return items
  }, [[], []] as [T[], T[]])
}

export function chunk<T>(arr: T[], size: number): T[][] {
  let chunks: T[][] = []
  let current: T[] = []
  chunks.push(current)

  arr.forEach(item => {
    if (current.length >= size) {
      current = []
      chunks.push(current)
    }
    current.push(item)
  })

  return chunks
}

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

export function calculateAttributeValue(name: keyof Attributes, characterSheet: CharacterSheet) {
  const attributeValue = characterSheet.attributes[name]
  const valueEffects = characterSheet.effects.filter(effect =>
    effect.targetCategory === "attributes"
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

export function calculateAttributeModifier(name: keyof Attributes, characterSheet: CharacterSheet) {
  const modifierEffects = characterSheet.effects.filter(effect =>
    effect.targetCategory === "attributeModifier"
    && effect.targetSubCategory === name
    && effect.active
  )

  if (modifierEffects.find(effect => effect.effect === "replace")) {
    return modifierEffects.find(effect => effect.effect === "replace")?.valueNum ?? 0
  }

  const attributeValue = calculateAttributeValue(name, characterSheet)

  let modifier = 0

  if (attributeValue >= 18) {
    modifier = 3
  } else if (attributeValue >= 16) {
    modifier = 2
  } else if (attributeValue >= 13) {
    modifier = 1
  } else if (attributeValue >= 9) {
    modifier = 0
  } else if (attributeValue >= 6) {
    modifier = -1
  } else if (attributeValue >= 4) {
    modifier = -2
  } else {
    modifier = -3
  }

  modifierEffects.forEach(effect => {
    if (effect.effect === "add") {
      modifier += (effect.valueNum ?? 0)
    }
  })

  return modifier
}
