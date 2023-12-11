import { Box, IconButton, Typography } from '@mui/material'
import { deCamel } from '../utils/utils'
import { DieFace } from './DieFace'
import { useCharacterSheet, useEditMode, useMutateTempCharSheet } from '../hooks'
import { Add, Delete } from '@mui/icons-material'
import { nanoid } from 'nanoid'
import { CharacterSheetComponent } from '../layouts/CharacterSheetComponent'

export function Activities() {
  const { activities } = useCharacterSheet()
  const mutateTempCharacterSheet = useMutateTempCharSheet()
  const { isEditMode } = useEditMode()

  const handleDelete = (id: string) => {
    mutateTempCharacterSheet(draft => {
      draft.activities = draft.activities.filter(act => act.id !== id)
    })
  }

  const handleValueChange = (id: string, value: number) => {
    mutateTempCharacterSheet(draft => {
      const index = draft.activities.findIndex(act => act.id === id)
      draft.activities[index].value = value
    })
  }

  const handleNameChange = (id: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    mutateTempCharacterSheet(draft => {
      const index = draft.activities.findIndex(act => act.id === id)
      draft.activities[index].name = e.target.value
    })
  }

  const handleAddActivity = () => {
    mutateTempCharacterSheet(draft => {
      draft.activities.push({ id: nanoid(), name: 'change name', value: 0 })
    })
  }

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Common Activities</Typography>
      <Box className="flex flex-wrap gap-4">
        {activities.map(({ value, name, id }) => (
          <Box key={id} className="w-24 flex flex-col items-center justify-items-center">
            {isEditMode && <IconButton onClick={() => handleDelete(id)}><Delete /></IconButton>}
            <DieFace value={value} name={name} isEditMode={isEditMode} onChange={(val) => handleValueChange(id, val)} />
            {isEditMode
              ? <textarea className="w-full text-center" defaultValue={name} onChange={handleNameChange(id)} />
              : <Typography className="w-full capitalize font-bold text-center">{deCamel(name)}</Typography>
            }
          </Box>
        ))}
        {isEditMode && (
          <Box className="w-24 h-24 place-self-center flex flex-col place-content-center items-center justify-items-center border">
            <IconButton onClick={handleAddActivity}><Add /></IconButton>
            <Typography className="font-bold text-center">Add Activity</Typography>
          </Box>
        )}
      </Box>
    </CharacterSheetComponent>
  )
}
