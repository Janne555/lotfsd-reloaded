import { Typography } from '@mui/material'
import { Attributes as AttributesType } from '../types'
import { characterSheetAtom, editModeAtom } from '../atoms'
import { useAtomValue } from 'jotai'

export function Attributes() {
  const { attributes } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (name: keyof AttributesType, key: keyof AttributesType[keyof AttributesType], value: number) => {
  }

  return (
    <section id="attributes" className="ch-box py-4 flex flex-col gap-y-4">
      <Typography variant='h2' className="text-center font-bold text-xl">Attributes</Typography>
      {
        Object.entries(attributes).map(([name, { value, modifier }]) => (
          <div key={name} className="grid grid-cols-12 items-center content-center">
            <span className="col-span-4 capitalize place-self-center">{name}</span>
            <div className="row-start-2 col-span-4 place-self-center border w-14 h-14 flex items-center justify-center">
              {isEditMode
                ? <input type="number" value={value ?? ""} onChange={e => handleChange(name as any, "value", e.target.valueAsNumber)} className="w-full m-2" />
                : <span>{value}</span>
              }
            </div>
            <div className="row-start-2 col-span-2 border rounded-full w-12 h-12 flex items-center justify-center">
              {isEditMode
                ? <input type="number" value={modifier ?? ""} onChange={e => handleChange(name as any, "modifier", e.target.valueAsNumber)} className="w-full m-2" />
                : <span>{modifier}</span>
              }
            </div>
            <span className="row-start-2 col-span-6">{descriptions[name]}</span>
          </div>
        ))
      }
    </section>
  )
}

const descriptions: Record<string, string> = {
  charisma: "Retainer Recruitment, Loyalty",
  constitution: "Hit Points, Daily Travel Distance",
  dexterity: "AC, Ranged AB, Initiative",
  intelligence: "Saves vs Magic Effects, Languages",
  strength: "Mêlée AB, Open Doors",
  wisdom: "Saves vs Non-Magic Effects"
}
