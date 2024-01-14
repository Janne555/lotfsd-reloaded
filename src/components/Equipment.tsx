import { chunk, range } from "../utils/utils"
import { IconButton, Typography } from "@mui/material"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"
import { useCharacterSheet, useEditMode, useMutateTempCharSheet } from "../hooks/useStorage"
import React from "react"
import { Delete } from "@mui/icons-material"

export function Equipment() {
  const { equipment } = useCharacterSheet()
  const { isEditMode } = useEditMode()
  const mutateCharSheet = useMutateTempCharSheet()
  const chunks = chunk(equipment, 5)
  let num = 0

  function getNext() {
    num++
    return num
  }

  const handleDeleteEquipment = (id: string) => () => {
    mutateCharSheet(draft => {
      draft.equipment = draft.equipment.filter(item => item.id !== id)
    })
  }

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Equipment</Typography>
      {chunks.map((chunk, i) => (
        <div key={i} className="grid grid-cols-8">
          <div className="col-start-8 row-start-1 row-end-6 border relative">
            {i > 0 && <div className="whitespace-nowrap truncate">+1 Enc</div>}
          </div>
          {range(5).map(i => chunk[i]).map(item => (
            <React.Fragment key={num}>
              <div className="col-span-6 border border-l-0 pl-2 truncate h-10 flex items-center">
                {isEditMode && item && <IconButton onClick={handleDeleteEquipment(item.id)}><Delete /></IconButton>}
                <span>{item?.name}</span>
              </div>
              <span className="text-center border">{getNext()}</span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </CharacterSheetComponent>
  )
}
