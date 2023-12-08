import { useAtomValue } from "jotai"
import { characterSheetAtom, editModeAtom } from "../atoms"
import { Typography } from "@mui/material"

export function ArmorClass() {
  const { armorClasses } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (key: keyof typeof armorClasses, value: number) => {
    console.log(key, value)
  }

  return (
    <section id="armorclass" className="ch-box">
      <Typography variant='h2'>Armor Class</Typography>
      <div className="flex">
        <div className="flex flex-col items-center w-24">
          {isEditMode
            ? <input
              type="number"
              value={armorClasses.melee.value}
              onChange={e => handleChange("melee", e.target.valueAsNumber)}
              className="border p-4 box-content h-6 w-6 flex items-center justify-center" />
            : <span className="border p-4 box-content h-6 w-6 flex items-center justify-center">{armorClasses.melee.value}</span>
          }
          <span className="text-center">Mêlée</span>
        </div>
        <div className="flex flex-col items-center w-24">
          {isEditMode
            ? <input
              type="number"
              value={armorClasses.ranged.value}
              onChange={e => handleChange("ranged", e.target.valueAsNumber)}
              className="border p-4 box-content h-6 w-6 flex items-center justify-center" />
            : <span className="border p-4 box-content h-6 w-6 flex items-center justify-center">{armorClasses.ranged.value}</span>
          }
          <span className="text-center">Ranged</span>
        </div>
        <div className="flex flex-col items-center w-24">
          {isEditMode
            ? <input
              type="number"
              value={armorClasses.withoutShield.value}
              onChange={e => handleChange("withoutShield", e.target.valueAsNumber)}
              className="border p-4 box-content h-6 w-6 flex items-center justify-center" />
            : <span className="border p-4 box-content h-6 w-6 flex items-center justify-center">{armorClasses.withoutShield.value}</span>
          }
          <span className="text-center">Without<br />Shield</span>
        </div>
        <div className="flex flex-col items-center w-24">
          {isEditMode
            ? <input
              type="number"
              value={armorClasses.surprised.value}
              onChange={e => handleChange("surprised", e.target.valueAsNumber)}
              className="border p-4 box-content h-6 w-6 flex items-center justify-center" />
            : <span className="border p-4 box-content h-6 w-6 flex items-center justify-center">{armorClasses.surprised.value}</span>
          }
          <span className="text-center">Surprised</span>
        </div>
      </div>
    </section>
  )
}
