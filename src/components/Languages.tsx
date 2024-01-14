import { partition } from "../utils/utils"
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useCharacterSheet, useEditMode, useMutateTempCharSheet } from "../hooks/useStorage"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"
import { LanguageForm } from "../forms/Language.form"
import { useEffect, useState } from "react"

export function Languages() {
  const { languages } = useCharacterSheet()
  const [known, notKnown] = partition(languages, lang => lang.isKnown)
  const mutateCharSheet = useMutateTempCharSheet()
  const { isEditMode } = useEditMode()
  const [formKey, setFormKey] = useState(Date.now())

  const handleDelete = (name: string) => async () => {
    mutateCharSheet(draft => {
      draft.languages = draft.languages.filter(lang => lang.name !== name)
    })
  }

  useEffect(() => {
    setFormKey(Date.now())
  }, [languages.length])

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Languages</Typography>
      <Typography variant="h4">Known</Typography>
      <List>
        {known.map(lang => (
          <ListItem key={lang.id} secondaryAction={isEditMode && <IconButton onClick={handleDelete(lang.name)}><DeleteIcon /></IconButton>}>
            <ListItemText primary={lang.name} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h4">Not Known</Typography>
      <List>
        {notKnown.map(lang => (
          <ListItem key={lang.id} secondaryAction={isEditMode && <IconButton onClick={handleDelete(lang.name)}><DeleteIcon /></IconButton>}>
            <ListItemText primary={lang.name} />
          </ListItem>
        ))}
      </List>
      {isEditMode && <LanguageForm key={formKey} />}
    </CharacterSheetComponent>
  )
}
