import { Diamond } from './Diamond'
import { characterSheetAtom, editModeAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { deCamel } from '../utils'
import { Typography } from '@mui/material'


export function SavingThrows() {
  const { savingThrows } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (key: keyof typeof savingThrows, value: number) => {
    console.log(key, value)
  }

  return (
    <section id="savingthrows" className="ch-box">
      <Typography variant='h2'>Saving Throws</Typography>
      <div className="flex flex-wrap justify-center gap-4">
        {
          Object.entries(savingThrows).map(([name, { value }]) => (
            <div key={name} className="flex flex-col w-32 gap-4 items-center">
              <span className="capitalize font-bold text-center whitespace-nowrap">{deCamel(name)}</span>
              <Diamond>
                {isEditMode
                  ? <input type="number" value={value} onChange={e => handleChange(name as any, e.target.valueAsNumber)} className="w-full" />
                  : <span>{value}</span>
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
