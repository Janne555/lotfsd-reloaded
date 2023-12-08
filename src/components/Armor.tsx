import { useAtomValue } from 'jotai'
import { characterSheetAtom } from '../atoms'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'

export const Armor = () => {
  const { encumbrance } = useAtomValue(characterSheetAtom)

  const handleChainMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement logic for handling chain mail checkbox change
  }

  const handlePlateMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement logic for handling plate mail checkbox change
  }

  return (
    <section id="armor" className="ch-box p-2 py-4">
      <Typography variant="h2">Armor</Typography>
      <FormControlLabel
        control={<Checkbox checked={encumbrance.characterIsWearingChainMail} onChange={handleChainMailChange} />}
        label="Wearing Chain Mail"
      />
      <FormControlLabel
        control={<Checkbox checked={encumbrance.characterIsWearingPlateMail} onChange={handlePlateMailChange} />}
        label="Wearing Plate Mail"
      />
    </section>
  )
}
