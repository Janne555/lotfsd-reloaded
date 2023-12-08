import { useAtomValue } from "jotai"
import React from "react"
import { characterSheetAtom, editModeAtom } from "../atoms"
import { deCamel } from "../utils"
import { Typography } from "@mui/material"

export function InfoBar() {
  const { info } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (key: keyof typeof info, value: string) => {
    console.log(key, value)
  }

  return (
    <section id="infobar" className="ch-box">
      <Typography variant="h2">Basic Info</Typography>
      <div className="grid grid-cols-2 gap-2">
        {
          Object.entries(info).map(([key, value]) => (
            <React.Fragment key={key}>
              <span className="capitalize  items-start">{deCamel(key)}</span>
              {isEditMode
                ? <input value={value ?? ""} onChange={e => handleChange(key as any, e.target.value)} className="" />
                : <span>{value}</span>
              }
            </React.Fragment>
          ))
        }
      </div>
    </section>
  )
}
