import { useAtomValue } from "jotai"
import React from "react"
import { editModeAtom } from "../atoms"
import { deCamel } from "../utils/utils"
import { Typography } from "@mui/material"
import { useMutateTempCharSheet, useCharacterSheet } from "../hooks"
import { Info } from "../types"

export function InfoBar() {
  const { info } = useCharacterSheet()
  const isEditMode = useAtomValue(editModeAtom)
  const updateCharacterSheet = useMutateTempCharSheet()

  const handleChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = k as keyof Info
    const value = typeMap[key] === 'number' ? e.target.valueAsNumber : e.target.value
    updateCharacterSheet(ch => {
      ch.info[key] = value as never
    })
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
                ? <input defaultValue={value ?? ""} type={typeMap[key]} onChange={handleChange(key)} className="" />
                : <span>{value}</span>
              }
            </React.Fragment>
          ))
        }
      </div>
    </section>
  )
}

const typeMap: Record<string, string> = {
  name: 'text',
  currentXp: 'number',
  xpForNextLevel: 'number',
  class: 'text',
  race: 'text',
  age: 'number',
  gender: 'text',
  alignment: 'text',
}
