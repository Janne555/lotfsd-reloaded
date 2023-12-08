import { Diamond } from './Diamond'
import { characterSheetAtom, editModeAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { deCamel } from '../utils'


export function SavingThrows() {
  const { savingThrows } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (key: keyof typeof savingThrows, value: number) => {
    console.log(key, value)
  }

  return (
    <section className="ch-box">
      <h1 className="text-center font-bold text-xl">Saving Throws</h1>
      <div className="flex flex-wrap justify-center">
        {
          Object.entries(savingThrows).map(([name, { value }]) => (
            <div key={name} className="flex flex-col w-32 m-4 gap-4 items-center">
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
