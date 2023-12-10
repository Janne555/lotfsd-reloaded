import { Attributes, CharacterSheet } from "../types"

export function calculateAttributeValue(name: keyof Attributes, characterSheet: CharacterSheet) {
  const attributeValue = characterSheet.attributes[name]
  const valueEffects = characterSheet.effects.filter(effect => effect.targetCategory === "attributes"
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

export function calculateAttributeModifier(name: keyof Attributes, characterSheet: CharacterSheet) {
  const modifierEffects = characterSheet.effects.filter(effect => effect.targetCategory === "attributeModifier"
    && effect.targetSubCategory === name
    && effect.active
  )

  if (modifierEffects.find(effect => effect.effect === "replace")) {
    return Number(modifierEffects.find(effect => effect.effect === "replace")?.value ?? 0)
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
      modifier += Number((effect.value ?? 0))
    }
  })

  return modifier
}

