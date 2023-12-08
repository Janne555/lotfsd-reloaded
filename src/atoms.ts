import { Getter, atom, useSetAtom } from "jotai"
import { getCharacterSheets } from "./pages/storage"
import { matchPath, useLocation } from 'react-router-dom'
import { useEffect } from "react"

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

export const characterSheetsAtom = atom(() => getCharacterSheets())

export const characterIdAtom = pathMatchAtom('/character-sheet/:id/*')

export const characterSheetAtom = atom(async (get) => {
  const characterId = get(characterIdAtom)
  const characterSheets = await get(characterSheetsAtom)
  const sheet = characterSheets.find((sheet) => sheet.id === characterId?.params.id)
  if (!sheet) throw Promise.resolve("Pending")
  return sheet
})

export const editModeAtom = atom(false)