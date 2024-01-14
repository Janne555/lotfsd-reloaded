import { useAtom } from "jotai"
import { characterSheetsAtom } from "../atoms"
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FaceIcon from '@mui/icons-material/Face'
import Typography from '@mui/material/Typography'
import { createCharacterSheet, exportDatabase, resetStorage } from "./storage"
import { Page } from "../layouts/Page"
import { useDialog } from "../hooks/useDialog"

export const StartPage = () => {
  const { getConfirmation } = useDialog()
  const [characterSheets, refresh] = useAtom(characterSheetsAtom)
  const navigate = useNavigate()

  const handleAddNew = async () => {
    const characterSheet = await createCharacterSheet()
    refresh()
    navigate(`/character-sheet/${characterSheet.id}`)
  }

  const handleReset = async () => {
    if (await getConfirmation({
      title: 'Reset app',
      content: 'Are you sure you want to reset the app? This will delete all your data.'
    })) {
      resetStorage()
      window.location.reload()
    }
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
      <Button onClick={() => exportDatabase()}>Export Data</Button>
      <Button onClick={handleReset}>Reset app</Button>
    </Page>
  )
}
