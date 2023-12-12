import { Checkbox, FormControl, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { calculateSpellSlots } from "../utils/spellSlot.utils";
import { useCharacterSheet, useEditMode, useMutateTempCharSheet } from "../hooks";
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent";
import { SpellSlotForm } from "../forms/SpellSlot.form";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";

export function SpellSlots() {
  const { spellSlots, spells } = useCharacterSheet()
  const mutateCharSheet = useMutateTempCharSheet()
  const sorted = [...spellSlots].sort((a, b) => Number(a.level) - Number(b.level))
  const spellSlotCountsAndRemainingSpellSlots = calculateSpellSlots(spellSlots)
  const [key, setKey] = useState(Date.now())
  const { isEditMode } = useEditMode()

  useEffect(() => {
    setKey(Date.now())
  }, [spellSlots])

  const handleDelete = (id: string) => () => {
    mutateCharSheet((draft) => {
      draft.spellSlots = draft.spellSlots.filter((slot) => slot.id !== id)
    })
  }

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Spell Slots</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.entries(spellSlotCountsAndRemainingSpellSlots).map(([level]) => (
                <TableCell key={level} align="center">Lvl {level}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.entries(spellSlotCountsAndRemainingSpellSlots).map(([level, { count, remaining }]) => (
                <TableCell key={level} align="center">{remaining}/{count}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4">Prepared spells</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>{isEditMode ? "Delete" : "Used"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((spellSlot) => (
              <TableRow key={spellSlot.id}>
                <TableCell>
                  <div className="w-40">
                    <FormControl fullWidth>
                      <Select
                        value={spellSlot.preparedSpellId ?? 'none'}
                        onChange={(e) => {
                          mutateCharSheet((ch) => {
                            const slot = ch.spellSlots.find((s) => s.id === spellSlot.id)
                            if (slot) {
                              slot.preparedSpellId = e.target.value
                            }
                          })
                        }}
                      >
                        <MenuItem value="none">{"<not prepared>"}</MenuItem>
                        {spells.filter((spell) => Number(spell.level) <= Number(spellSlot.level)).map((spell) => (
                          <MenuItem key={spell.id} value={spell.id}>{spell.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </TableCell>
                <TableCell>{spellSlot.level}</TableCell>
                <TableCell>
                  {isEditMode
                    ? <IconButton onClick={handleDelete(spellSlot.id)}><Delete /></IconButton>
                    : <Checkbox
                      checked={spellSlot.used}
                      onChange={(e) => {
                        mutateCharSheet((ch) => {
                          const slot = ch.spellSlots.find((s) => s.id === spellSlot.id)
                          if (slot) {
                            slot.used = e.target.checked
                          }
                        })
                      }}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
            {isEditMode && (
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell colSpan={3}>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">Add Spellslot</span>
                    <SpellSlotForm key={key} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </CharacterSheetComponent >
  )
}
