import { useAtomValue } from 'jotai'
import { characterSheetAtom } from '../atoms'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { useMutateCharSheet } from '../hooks'

export const Armor = () => {
  const { encumbrance } = useAtomValue(characterSheetAtom)
  const mutateCharSheet = useMutateCharSheet()

  return (
    <section id="armor" className="ch-box p-2 py-4">
      <Typography variant="h2">Armor</Typography>
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
    </section>
  )
}
