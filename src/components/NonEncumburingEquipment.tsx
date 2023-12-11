import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { List, ListItem, Typography } from "@mui/material"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"

export function NonEncumburingEquipment() {
  const { nonEncumberingEquipment } = useAtomValue(characterSheetAtom)
  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Non-Encumbering Equipment</Typography>
      <List className="list-disc">
        {nonEncumberingEquipment.map((item, i) => (
          <ListItem key={i} className="">
            <span>{item.name}</span>
          </ListItem>
        ))}
      </List>
    </CharacterSheetComponent>
  )
}
