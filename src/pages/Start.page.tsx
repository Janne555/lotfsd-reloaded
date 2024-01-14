import { useAtomValue } from "jotai"
import { characterSheetsAtom } from "../atoms"
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FaceIcon from '@mui/icons-material/Face'
import Typography from '@mui/material/Typography'
import { createCharacterSheet, resetStorage } from "./storage"
import { Page } from "../layouts/Page"

export const StartPage = () => {
  const characterSheets = useAtomValue(characterSheetsAtom)
  const navigate = useNavigate()

  const handleAddNew = async () => {
    const characterSheet = await createCharacterSheet()
    navigate(`/character-sheet/${characterSheet.id}`)
  }

  return (
    <Page>
      <Typography variant="h1">Lamentations of the Fullstack Developer</Typography>
      <Typography variant="h2">Character Sheets</Typography>
      <List className="flex flex-col items-start">
        {characterSheets.map((characterSheet) => (
          <ListItem key={characterSheet.id} disablePadding>
            <ListItemButton onClick={() => navigate(`/character-sheet/${characterSheet.id}/info`)}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={characterSheet.info.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="outlined" onClick={handleAddNew} className="self-start">Add New Character</Button>
      <Button onClick={() => resetStorage()}>Reset App</Button>
    </Page>
  )
}
