import { Attributes as AttributesType } from '../types'
import { editModeAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { useMutateTempCharSheet, useCharacterSheet } from '../hooks/useStorage'
import { calculateAttributeModifier } from "../utils/attributes.utils"
import { calculateAttributeValue } from "../utils/attributes.utils"
import { CharacterSheetComponent } from '../layouts/CharacterSheetComponent'

export function Attributes() {
  const characterSheet = useCharacterSheet()
  const isEditMode = useAtomValue(editModeAtom)
  const updateCharacterSheet = useMutateTempCharSheet()
  3
  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    updateCharacterSheet(ch => {
      ch.attributes[key as keyof AttributesType].value = value
    })
  }

  return (
    <CharacterSheetComponent>
      {
        Object.entries(characterSheet.attributes).map(([name, { value }]) => (
          <div key={name} className="grid grid-cols-12 items-center gap-x-4">
            <span className="col-span-12 capitalize">{name}</span>
            <div className="row-start-2 col-span-4 border w-14 h-14 flex items-center justify-center">
              {isEditMode
                ? <input type="number" defaultValue={value ?? ""} onChange={handleChange(name)} className="w-full m-2 text-center" />
                : <span>{calculateAttributeValue(name as any, characterSheet)}</span>
              }
            </div>
            <div className="row-start-2 col-span-3 border rounded-full w-12 h-12 flex items-center justify-center">
              <span>{calculateAttributeModifier(name as any, characterSheet)}</span>
            </div>
            <span className="row-start-2 col-span-5">{descriptions[name]}</span>
          </div>
        ))
      }
    </CharacterSheetComponent>
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
