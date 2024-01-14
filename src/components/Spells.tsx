import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"
import { Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { Add, Close, Delete, Edit, Info } from "@mui/icons-material"
import React, { useState } from "react"
import { nanoid } from "nanoid"
import { SpellForm } from "../forms/Spell.form"
import { useCharacterSheet, useEditMode, useMutateTempCharSheet } from "../hooks/useStorage"

export function Spells() {
  const { spells } = useCharacterSheet()
  const [openRows, setOpenRows] = useState<string[]>([])
  const [spellIdInEdit, setSpellIdInEdit] = useState<string>()
  const { isEditMode } = useEditMode()
  const spellInEdit = spells.find((spell) => spell.id === spellIdInEdit) ?? { id: spellIdInEdit ? spellIdInEdit : undefined }
  const mutateCharSheet = useMutateTempCharSheet()

  const handleRowClick = (id: string) => {
    if (openRows.includes(id)) {
      setOpenRows(openRows.filter((rowId) => rowId !== id))
    } else {
      setOpenRows([...openRows, id])
    }
  }

  const handleDelete = (id: string) => {
    mutateCharSheet((draft) => {
      draft.spells = draft.spells.filter((spell) => spell.id !== id)
    })
  }

  return (
    <CharacterSheetComponent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spells.map((spell) => (
            <React.Fragment key={spell.id}>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{spell.name}</TableCell>
                <TableCell>{spell.level}</TableCell>
                <TableCell>
                  {!isEditMode && (
                    <IconButton onClick={() => handleRowClick(spell.id)}>
                      {openRows.includes(spell.id) ? <Close /> : <Info />}
                    </IconButton>
                  )}
                  {isEditMode && (
                    <IconButton onClick={() => setSpellIdInEdit(spell.id)}>
                      <Edit />
                    </IconButton>
                  )}
                </TableCell>
                {isEditMode && (
                  <TableCell>
                    <IconButton onClick={() => handleDelete(spell.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={openRows.includes(spell.id)} timeout="auto">
                    <Typography variant="body2">
                      {spell.description}
                    </Typography>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          {isEditMode && (
            <>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell colSpan={3}><span className="font-bold">{spellIdInEdit ? "Edit" : "Add"} Spell</span></TableCell>
                <TableCell>
                  {spellIdInEdit
                    ? <IconButton onClick={() => setSpellIdInEdit(undefined)}><Close /></IconButton>
                    : <IconButton onClick={() => setSpellIdInEdit(nanoid())}><Add /></IconButton>
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={Boolean(spellIdInEdit)} timeout="auto">
                    <SpellForm
                      key={spellIdInEdit}
                      onClose={() => setSpellIdInEdit(undefined)}
                      defaultValues={spellInEdit}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </CharacterSheetComponent>
  )
}
