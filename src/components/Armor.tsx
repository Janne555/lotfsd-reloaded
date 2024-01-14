import { useAtomValue } from 'jotai'
import { characterSheetAtom } from '../atoms'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { useMutateCharSheet } from '../hooks/useStorage'
import { CharacterSheetComponent } from '../layouts/CharacterSheetComponent'

export const Armor = () => {
  const { encumbrance } = useAtomValue(characterSheetAtom)
  const mutateCharSheet = useMutateCharSheet()

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Armor</Typography>
      <FormControlLabel
        control={<Checkbox checked={encumbrance.characterIsWearingChainMail} onChange={(e) =>
          mutateCharSheet(draft => {
            draft.encumbrance.characterIsWearingChainMail = e.target.checked
          })
        } />}
        label="Wearing Chain Mail"
      />
      <FormControlLabel
        control={<Checkbox checked={encumbrance.characterIsWearingPlateMail} onChange={(e) =>
          mutateCharSheet(draft => {
            draft.encumbrance.characterIsWearingPlateMail = e.target.checked
          })
        } />}
        label="Wearing Plate Mail"
      />
    </CharacterSheetComponent>
  )
}
