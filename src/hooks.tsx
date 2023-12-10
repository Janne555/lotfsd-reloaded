import { useAtom, useAtomValue } from "jotai"
import { characterSheetAtom, editModeAtom, tempCharacterSheetReadWriteAtom } from "./atoms"
import { produce } from "immer"
import { CharacterSheet } from "./types"
import { saveCharacterSheet } from "./pages/storage"
import { collectEffects } from "./utils/effect.utils"

export function useMutateTempCharSheet() {
  const [tempCharacterSheet, setTempCharacterSheet] = useAtom(tempCharacterSheetReadWriteAtom)


  return (fn: (draft: CharacterSheet) => void) => {
    const newSheet = produce(tempCharacterSheet, fn)
    setTempCharacterSheet(newSheet)
  }
}

export function useMutateCharSheet() {
  const [_, refresh] = useAtom(characterSheetAtom)
  const characterSheet = useAtomValue(characterSheetAtom)

  return async (fn: (draft: CharacterSheet) => void) => {
    const newSheet = produce(characterSheet, fn)
    await saveCharacterSheet(newSheet)
    refresh()
  }
}

export function useEditMode() {
  const [isEditMode, setEditMode] = useAtom(editModeAtom)
  const characterSheet = useAtomValue(characterSheetAtom)
  const [tempCharacterSheet, setTempCharacterSheet] = useAtom(tempCharacterSheetReadWriteAtom)
  const [_, refresh] = useAtom(characterSheetAtom)

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

export function useEffects() {
  return collectEffects(useCharacterSheet())
}
