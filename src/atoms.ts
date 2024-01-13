import { Getter, atom } from "jotai"
import { getCharacterSheet, getCharacterSheets, init } from "./pages/storage"
import { CharacterSheet } from "./types"

export function atomWithRefresh<T>(fn: (get: Getter) => T) {
  const refreshCounter = atom(0)

  return atom(
    (get) => {
      get(refreshCounter)
      return fn(get)
    },
    (_, set) => set(refreshCounter, (i) => i + 1),
  )
}

export const characterSheetsAtom = atomWithRefresh(() => getCharacterSheets())

export const characterIdAtom = atom<string | undefined>(undefined)

export const initAtom = atom(async () => {
  await init({})
})

export const characterSheetAtom = atomWithRefresh(async (get) => {
  const characterId = get(characterIdAtom)
  if (!characterId) throw new Promise(() => { })
  const sheet = await getCharacterSheet(characterId ?? '')
  if (!sheet) throw Error("Character sheet not found")
  return sheet
})

export const editModeAtom = atom(false)

const tempCharacterSheetAtom = atom<CharacterSheet | undefined>(undefined)

export const tempCharacterSheetReadWriteAtom = atom(
  (get) => get(tempCharacterSheetAtom),
  (_, set, update: CharacterSheet | undefined) => set(tempCharacterSheetAtom, update)
)
