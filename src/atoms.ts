import { Getter, atom, useSetAtom } from "jotai"
import { getCharacterSheet, getCharacterSheets } from "./pages/storage"
import { matchPath, useLocation } from 'react-router-dom'
import { useEffect } from "react"
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

function pathMatchAtom<Path extends string>(path: Path) {
  return atom((get) => {
    const pathname = get(pathAtom)
    return matchPath(path, pathname)
  })
}

export function useSyncPathToAtom() {
  const setPathname = useSetAtom(pathAtom)
  const location = useLocation()
  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])
}

const pathAtom = atom(window.location.pathname)

export const characterSheetsAtom = atomWithRefresh(() => getCharacterSheets())

export const characterIdAtom = pathMatchAtom('/character-sheet/:id/*')

export const characterSheetAtom = atom(async (get) => {
  const characterId = get(characterIdAtom)
  const sheet = await getCharacterSheet(characterId?.params.id ?? '')
  if (!sheet) throw Error("Character sheet not found")
  return sheet
})

export const editModeAtom = atom(false)

const tempCharacterSheetAtom = atom<CharacterSheet | undefined>(undefined)

export const tempCharacterSheetReadWriteAtom = atom(
  (get) => get(tempCharacterSheetAtom),
  (_, set, update: CharacterSheet | undefined) => set(tempCharacterSheetAtom, update)
)
