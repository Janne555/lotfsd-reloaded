import { List, ListItem, ListItemText, Switch, Typography } from '@mui/material'
import { useEffects, useMutateCharSheet } from '../hooks'
import { Link } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { characterIdAtom } from '../atoms'

export function Effects() {
  const characterId = useAtomValue(characterIdAtom)
  const effects = useEffects()
  const handleChange = useMutateCharSheet()

  return (
    <section id="effects" className="ch-box">
      <Typography variant="h2">Effects</Typography>
      <Link to={`/character-sheet/${characterId?.params.id}/info/add-effect`}>Add Effect</Link>
      <List>
        {effects.map((effect, index) => (
          <ListItem key={index}>
            <ListItemText primary={effect.name} />
            <Switch
              edge="end"
              onChange={(e) => {
                handleChange((draft) => {
                  draft.effects[index].active = e.target.checked
                })
              }}
              checked={effect.active ?? false}
            />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
