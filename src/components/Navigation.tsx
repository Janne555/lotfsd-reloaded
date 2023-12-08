import { useAtom, useAtomValue } from "jotai"
import { characterIdAtom, editModeAtom } from "../atoms"
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const characterId = useAtomValue(characterIdAtom)
  const [isEditMode, setIsEditMode] = useAtom(editModeAtom)

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <nav className="ch-box p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-center mb-4">Charactersheet Sections</h1>
      <div className="flex justify-center gap-4">
        <NavLink to={`/character-sheet/${characterId?.params.id}/info`} className="p-1">Info</NavLink>
        <NavLink to={`/character-sheet/${characterId?.params.id}/inventory`} className="p-1">Inventory</NavLink>
        <NavLink to={`/character-sheet/${characterId?.params.id}/spells`} className="p-1">Spells</NavLink>
      </div>
      <button onClick={toggleEditMode}>
        {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
      </button>
    </nav>
  );
};