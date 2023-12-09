import { useAtom, useAtomValue } from "jotai"
import { characterSheetAtom, characterSheetsAtom, editModeAtom, tempCharacterSheetReadWriteAtom } from "./atoms"
import { produce } from "immer"
import { CharacterSheet } from "./types"
import { saveCharacterSheet } from "./pages/storage"

export function useChangeHandler() {
  const [tempCharacterSheet, setTempCharacterSheet] = useAtom(tempCharacterSheetReadWriteAtom)

  return (fn: (draft: CharacterSheet) => void) => {
    const newSheet = produce(tempCharacterSheet, fn)
    setTempCharacterSheet(newSheet)
  }
}

export function useEditMode() {
  const [isEditMode, setEditMode] = useAtom(editModeAtom)
  const characterSheet = useAtomValue(characterSheetAtom)
  const [tempCharacterSheet, setTempCharacterSheet] = useAtom(tempCharacterSheetReadWriteAtom)
  const [__, refresh] = useAtom(characterSheetsAtom)

  return {
    isEditMode,
    setEditModeOn: () => {
      setTempCharacterSheet(characterSheet)
      setEditMode(true)
    },
    setEditModeOff: async () => {
      setEditMode(false)
      if (tempCharacterSheet) {
        await saveCharacterSheet(tempCharacterSheet)
        refresh()
      }
    }
  }
}

export function useCharacterSheet() {
  const [isEditMode] = useAtom(editModeAtom)
  const [characterSheet] = useAtom(characterSheetAtom)
  const [tempCharacterSheet] = useAtom(tempCharacterSheetReadWriteAtom)

  return isEditMode && tempCharacterSheet ? tempCharacterSheet : characterSheet
}
