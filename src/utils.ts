import { CharacterSheet } from "./types"

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

