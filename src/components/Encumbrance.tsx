import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { calculateEncumbrance, deCamel, encumbranceValueToState } from "../utils"
import { Typography } from "@mui/material"

export function Encumbrance() {
  const characterSheet = useAtomValue(characterSheetAtom)
  const value = calculateEncumbrance(characterSheet)
  const state = encumbranceValueToState(value)
  const description = descriptions[state]

  return (
    <section id="encumbrance" className="ch-box">
      <Typography variant='h2'>Encumbrance</Typography>
      <div className="grid grid-cols-2 gap-x-4">
        <span className="justify-self-end">State</span>
        <span className="capitalize">{deCamel(state)}</span>
        <span className="justify-self-end">Points</span>
        <span>{value}</span>
        <span className="justify-self-end">Explore</span>
        <span>{description.explore}</span>
        <span className="justify-self-end">Combat</span>
        <span>{description.combat}</span>
        <span className="justify-self-end">Running</span>
        <span>{description.running}</span>
        <span className="justify-self-end">Per Day</span>
        <span>{description.perDay}</span>
      </div>
    </section>
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
