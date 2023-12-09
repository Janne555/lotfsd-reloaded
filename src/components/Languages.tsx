import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { partition } from "../utils/utils"
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useMutateCharSheet } from "../hooks"

export function Languages() {
  const { languages } = useAtomValue(characterSheetAtom)
  const [known, notKnown] = partition(languages, lang => lang.isKnown)
  const mutateCharSheet = useMutateCharSheet()

  const handleDelete = (name: string) => async () => {
    await mutateCharSheet(draft => {
      draft.languages = draft.languages.filter(lang => lang.name !== name)
    })
  }

  return (
    <section id="languages" className="ch-box">
      <Typography variant="h2">Languages</Typography>
      <Typography variant="h3">Known</Typography>
      <List>
        {known.map(lang => (
          <ListItem key={lang.name} secondaryAction={<IconButton onClick={handleDelete(lang.name)}><DeleteIcon /></IconButton>}>
            <ListItemText primary={lang.name} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h3">Not Known</Typography>
      <List>
        {notKnown.map(lang => (
          <ListItem key={lang.name} secondaryAction={<IconButton onClick={handleDelete(lang.name)}><DeleteIcon /></IconButton>}>
            <ListItemText primary={lang.name} />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
