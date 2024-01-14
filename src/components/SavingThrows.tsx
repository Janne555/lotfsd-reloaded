import { characterSheetAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { deCamel } from '../utils/utils'
import { IconButton, Snackbar, Typography } from '@mui/material'
import { useEditMode, useMutateTempCharSheet } from '../hooks/useStorage'
import { Attributes, SavingThrows as SavingThrowsType } from '../types'
import { calculateSavingThrow } from '../utils/savingThrows.utils'
import { Close, QuestionMark } from '@mui/icons-material'
import { useState } from 'react'
import { calculateAttributeModifier } from '../utils/attributes.utils'
import { CharacterSheetComponent } from '../layouts/CharacterSheetComponent'


export function SavingThrows() {
  const characterSheet = useAtomValue(characterSheetAtom)
  const { isEditMode } = useEditMode()
  const mutateCharSheet = useMutateTempCharSheet()
  const [showSnackbarFor, setShowSnackbarFor] = useState<string>()

  const handleChange = (key: keyof SavingThrowsType, value: number) => {
    mutateCharSheet(draft => {
      draft.savingThrows[key].value = value
    })
  }

  return (
    <CharacterSheetComponent>
      <Typography variant='h3'>Saving Throws</Typography>
      <div className="flex flex-col gap-4">
        {
          Object.entries(characterSheet.savingThrows).map(([name, { value }]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="col-span-4 capitalize font-bold text-center whitespace-nowrap">{deCamel(name)}</span>

              <div className="ml-auto col-span-4 border w-14 h-14 flex items-center justify-center aspect-square">
                {isEditMode
                  ? <input type="number" defaultValue={value} onChange={e => handleChange(name as any, e.target.valueAsNumber)} className="w-full m-2 text-center" />
                  : <span>{calculateSavingThrow(name as any, characterSheet)}</span>
                }
              </div>
              <div className="row-start-2 col-span-3 border rounded-full w-12 h-12 flex items-center justify-center">
                <span>{calculateAttributeModifier(appliedModifier[name as keyof SavingThrowsType], characterSheet)}</span>
              </div>
              <IconButton
                onClick={() => setShowSnackbarFor(name)}
              >
                <QuestionMark />
              </IconButton>
            </div>
          ))
        }
        <Snackbar
          key={showSnackbarFor}
          open={Boolean(showSnackbarFor)}
          onClose={() => setShowSnackbarFor(undefined)}
          autoHideDuration={6000}
          message={descriptions[showSnackbarFor ?? ""]}
          action={
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => setShowSnackbarFor(undefined)}
            >
              <Close htmlColor='white' />
            </IconButton>
          }
        />
      </div>
    </CharacterSheetComponent>
  )
}

const appliedModifier: Record<keyof SavingThrowsType, keyof Attributes> = {
  paralyze: "wisdom",
  poison: "wisdom",
  breathWeapon: "wisdom",
  magicalDevice: "wisdom",
  magic: "intelligence"
}

const descriptions: Record<string, string> = {
  paralyze: "Mobility Hazards (Petrification, Hold, Etc.) Add wisdom modifier.",
  poison: "Instant Death/KO Situations. Add wisdom modifier.",
  breathWeapon: "Area Effects. Add wisdom modifier.",
  magicalDevice: "Spell-Like Effects from Items. Add wisdom modifier.",
  magic: "Spells or Innate Abilities. Add intelligence modifier."
}
