import { List, ListItem, ListItemButton, ListItemText, Switch, Typography } from '@mui/material'
import { useEffects, useMutateCharSheet } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { characterIdAtom } from '../atoms'
import { CharacterSheetComponent } from '../layouts/CharacterSheetComponent'

export function Effects() {
  const characterId = useAtomValue(characterIdAtom)
  const effects = useEffects()
  const handleChange = useMutateCharSheet()
  const navigate = useNavigate()

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Effects</Typography>
      <Link to={`/character-sheet/${characterId?.params.id}/info/add-effect`}>Add Effect</Link>
      <List>
        {effects.map((effect, index) => (
          <ListItem
            disablePadding
            disableGutters
            key={index}
            secondaryAction={
              <Switch
                edge="end"
                onChange={(e) => {
                  handleChange((draft) => {
                    draft.effects[index].active = e.target.checked
                  })
                }}
                checked={effect.active ?? false}
              />}
          >
            <ListItemButton
              dense
              onClick={() => navigate(`/character-sheet/${characterId?.params.id}/info/effects/${effect.id}`)}
            >
              <ListItemText primary={effect.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </CharacterSheetComponent>
  )
}
