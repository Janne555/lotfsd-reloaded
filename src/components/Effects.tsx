import { List, ListItem, ListItemButton, ListItemText, Switch, Typography } from '@mui/material'
import { useChangeHandler, useCharacterSheet, useEditMode } from '../hooks'

export function Effects() {
  const { effects } = useCharacterSheet()
  const handleChange = useChangeHandler()
  const { isEditMode } = useEditMode()

  const handleDeleteEffect = (id: string) => {
    handleChange((draft) => {
      const index = draft.effects.findIndex((effect) => effect.id === id)
      if (index === -1) return
      delete draft.effects[index]
    })
  }

  return (
    <section id="effects" className="ch-box">
      <Typography variant="h2">Effects</Typography>
      <button>Add Effect</button>
      <List>
        {effects.map((effect, index) => (
          <ListItem key={index}>
            <ListItemText primary={effect.name} />
            <Switch
              disabled={!isEditMode}
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
  );
}
