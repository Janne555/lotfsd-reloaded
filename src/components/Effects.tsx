import { List, ListItem, ListItemButton, ListItemText, Switch, Typography } from '@mui/material'
import { useEditMode, useEffects, useMutateTempCharSheet } from '../hooks/useStorage'
import { CharacterSheetComponent } from '../layouts/CharacterSheetComponent'
import { EffectForm } from '../forms/Effect.form'
import { useState } from 'react'

export function Effects() {
  const effects = useEffects()
  const handleChange = useMutateTempCharSheet()
  const { isEditMode } = useEditMode()
  const [effectId, setEffectId] = useState<string>()

  return (
    <CharacterSheetComponent>
      <div>
        <Typography variant="h3">Effects</Typography>
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
                onClick={() => setEffectId(effect.id)}
              >
                <ListItemText primary={effect.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {isEditMode && (
          <div key={effectId}>
            <Typography variant="h4">{effectId ? "Edit" : "Add"} Effect</Typography>
            <EffectForm
              defaultValues={effects.find((effect) => effect.id === effectId)}
              onClose={() => setEffectId(undefined)}
              onReset={() => setEffectId(undefined)}
            />
          </div>
        )}
      </div>
    </CharacterSheetComponent>
  )
}
