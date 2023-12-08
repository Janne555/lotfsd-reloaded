import { useAtomValue } from "jotai"
import React from "react"
import { characterSheetAtom, editModeAtom } from "../atoms"
import { deCamel } from "../utils"

export function InfoBar() {
  const { info } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (key: keyof typeof info, value: string) => {
    console.log(key, value)
  }

  return (
    <section id="infobar" className="ch-box p-2">
      <h1 className="text-center font-bold text-xl mb-4">Basic Info</h1>
      <div className="grid grid-cols-2 gap-2">
        {
          Object.entries(info).map(([key, value]) => (
            <React.Fragment key={key}>
              <span className="capitalize justify-self-end">{deCamel(key)}</span>
              {isEditMode
                ? <input value={value ?? ""} onChange={e => handleChange(key as any, e.target.value)} className="" />
                : <span className="justify-self-start">{value}</span>
              }
            </React.Fragment>
          ))
        }
      </div>
    </section>
  )
}
