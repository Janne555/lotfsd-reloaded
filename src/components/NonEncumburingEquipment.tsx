import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { Typography } from "@mui/material"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"

export function NonEncumburingEquipment() {
  const { nonEncumberingEquipment } = useAtomValue(characterSheetAtom)
  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Non-Encumbering Equipment</Typography>
      <ul className="list-disc">
        {nonEncumberingEquipment.map((item, i) => (
          <li key={i} className="">
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </CharacterSheetComponent>
  )
}
