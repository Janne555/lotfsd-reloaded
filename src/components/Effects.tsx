import { List, ListItem, ListItemText, Switch, Typography } from '@mui/material'
import { useEffects, useMutateCharSheet } from '../hooks'

export function Effects() {
  const effects = useEffects()
  const handleChange = useMutateCharSheet()

  return (
    <section id="effects" className="ch-box">
      <Typography variant="h2">Effects</Typography>
      <button>Add Effect</button>
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
              checked={effect.active}
            />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
