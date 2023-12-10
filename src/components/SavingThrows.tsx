import { Diamond } from './Diamond'
import { characterSheetAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { deCamel } from '../utils/utils'
import { Typography } from '@mui/material'
import { useEditMode, useMutateTempCharSheet } from '../hooks'
import { SavingThrows as SavingThrowsType } from '../types'
import { calculateSavingThrow } from '../utils/savingThrows.utils'


export function SavingThrows() {
  const characterSheet = useAtomValue(characterSheetAtom)
  const { isEditMode } = useEditMode()
  const mutateCharSheet = useMutateTempCharSheet()

  const handleChange = (key: keyof SavingThrowsType, value: number) => {
    mutateCharSheet(draft => {
      draft.savingThrows[key].value = value
    })
  }

  return (
    <section id="savingthrows" className="ch-box">
      <Typography variant='h2'>Saving Throws</Typography>
      <div className="flex flex-wrap justify-center gap-4">
        {
          Object.entries(characterSheet.savingThrows).map(([name, { value }]) => (
            <div key={name} className="flex flex-col w-32 gap-4 items-center">
              <span className="capitalize font-bold text-center whitespace-nowrap">{deCamel(name)}</span>
              <Diamond>
                {isEditMode
                  ? <input type="number" defaultValue={value} onChange={e => handleChange(name as any, e.target.valueAsNumber)} className="w-full" />
                  : <span>{calculateSavingThrow(name as any, characterSheet)}</span>
                }
              </Diamond>
              <span className="text-center">{descriptions[name]}</span>
            </div>
          ))
        }
      </div>
    </section>
  )
}

const descriptions: Record<string, string> = {
  paralyze: "Mobility Hazards (Petrification, Hold, Etc.)",
  poison: "Instant Death/KO Situations",
  breathWeapon: "Area Effects",
  magicalDevice: "Spell-Like Effects from Items",
  magic: "Spells or Innate Abilities"
}
