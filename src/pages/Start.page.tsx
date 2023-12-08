import { useAtomValue } from "jotai"
import { Page } from "../components/Layouts"
import { characterSheetsAtom } from "../atoms"
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FaceIcon from '@mui/icons-material/Face'
import Typography from '@mui/material/Typography'

export const StartPage = () => {
  const characterSheets = useAtomValue(characterSheetsAtom)
  const navigate = useNavigate()

  const handleAddNew = () => {
    navigate('/character-sheet/new')
  }

  return (
    <Page>
      <Typography variant="h1">Lamentations of the Fullstack Developer</Typography>
      <Box sx={{ minWidth: 120 }}>
        <List>
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
      </Box>
      <Button variant="outlined" onClick={handleAddNew} className="self-center">Add New Character</Button>
    </Page>
  )
}