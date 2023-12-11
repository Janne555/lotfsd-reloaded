import { useAtomValue } from "jotai";
import { characterSheetAtom } from "../atoms";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { calculateSpellSlots } from "../utils/spellSlot.utils";
import { useMutateCharSheet } from "../hooks";
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent";

export function SpellSlots() {
  const { spellSlots, spells } = useAtomValue(characterSheetAtom)
  const mutateCharSheet = useMutateCharSheet()
  const sorted = [...spellSlots].sort((a, b) => a.level - b.level)
  const spellSlotCountsAndRemainingSpellSlots = calculateSpellSlots(spellSlots)

  const findSpellForSlot = (spellId?: string) => {
    const spell = spells.find((s) => s.id === spellId)
    return spell ? spell.name : "<Not prepared>"
  }

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Spell Slots</Typography>
      <Typography variant="h4">Totals</Typography>
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
              <TableCell>Used</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((spellSlot) => (
              <TableRow key={spellSlot.id}>
                <TableCell>{findSpellForSlot(spellSlot.preparedSpellId)}</TableCell>
                <TableCell>{spellSlot.level}</TableCell>
                <TableCell>
                  <Checkbox
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CharacterSheetComponent>
  )
}
