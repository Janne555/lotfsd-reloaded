import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"
import { Typography } from "@mui/material"

export function Spells() {
  const { spells } = useAtomValue(characterSheetAtom)

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Spells</Typography>
      <div className="grid grid-cols-9">
        <span className="col-span-7 font-bold">Name</span>
        <span className="col-span-2 font-bold text-center">Level</span>
      </div>
      {spells.map((spell, i) => (
        <div key={i} className="grid grid-cols-9">
          <span className="col-span-7 truncate">{spell.name}</span>
          <span className="col-span-2 truncate text-center">{spell.level}</span>
        </div>
      ))}
    </CharacterSheetComponent>
  )
}
