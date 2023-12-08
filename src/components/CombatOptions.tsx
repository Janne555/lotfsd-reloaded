import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { Typography } from "@mui/material"

export function CombatOptions() {
  const { combatOptions } = useAtomValue(characterSheetAtom)

  return (
    <section id="combatoptions" className="ch-box">
      <Typography variant='h2'>Combat Options</Typography>
      <ul className="list-disc">
        {combatOptions.map((combatOption, i) => (
          <li key={i} className="">
            <span>{combatOption.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
