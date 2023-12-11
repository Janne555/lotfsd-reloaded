import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { Typography } from "@mui/material"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"

export function CombatOptions() {
  const { combatOptions } = useAtomValue(characterSheetAtom)

  return (
    <CharacterSheetComponent>
      <Typography variant='h3'>Combat Options</Typography>
      <ul className="list-disc">
        {combatOptions.map((combatOption, i) => (
          <li key={i} className="">
            <span>{combatOption.name}</span>
          </li>
        ))}
      </ul>
    </CharacterSheetComponent>
  )
}
