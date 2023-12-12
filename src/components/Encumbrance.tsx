import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { deCamel } from "../utils/utils"
import { encumbranceValueToState } from "../utils/encumbrance.utils"
import { calculateEncumbrance } from "../utils/encumbrance.utils"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"

export function Encumbrance() {
  const characterSheet = useAtomValue(characterSheetAtom)
  const value = calculateEncumbrance(characterSheet)
  const state = encumbranceValueToState(value)
  const description = descriptions[state]

  return (
    <CharacterSheetComponent>
      <div className="grid grid-cols-2 gap-x-4">
        <span className="">State</span>
        <span className="capitalize">{deCamel(state)}</span>
        <span className="">Points</span>
        <span>{value}</span>
        <span className="">Explore</span>
        <span>{description.explore}</span>
        <span className="">Combat</span>
        <span>{description.combat}</span>
        <span className="">Running</span>
        <span>{description.running}</span>
        <span className="">Per Day</span>
        <span>{description.perDay}</span>
      </div>
    </CharacterSheetComponent>
  )
}

const descriptions = {
  unencumbered: {
    explore: "120 ft/turn",
    combat: "40 ft/round",
    running: "120 ft/round",
    perDay: "24 miles"
  },
  lightlyEncumbered: {
    explore: "90 ft/turn",
    combat: "30 ft/round",
    running: "90 ft/round",
    perDay: "18 miles"
  },
  heavilyEncumbered: {
    explore: "60 ft/turn",
    combat: "20 ft/round",
    running: "60 ft/round",
    perDay: "12 miles"
  },
  severelyEncumbered: {
    explore: "30 ft/turn",
    combat: "10 ft/round",
    running: "30 ft/round",
    perDay: "6 miles"
  },
  overEncumbered: {
    explore: "0 ft/turn",
    combat: "0 ft/round",
    running: "0 ft/round",
    perDay: "0 miles"
  }
}
