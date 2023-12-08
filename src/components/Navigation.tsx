import { useAtom, useAtomValue } from "jotai"
import { characterIdAtom, editModeAtom } from "../atoms"
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

export const Navigation = () => {
  const characterId = useAtomValue(characterIdAtom)
  const [isEditMode, setIsEditMode] = useAtom(editModeAtom)

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <nav className="ch-box p-4 flex flex-col gap-4 items-start">
      <Typography variant="h1">Charactersheet Sections</Typography>
      <div className="flex gap-4">
        <NavLink to={`/character-sheet/${characterId?.params.id}/info`}>Info</NavLink>
        <NavLink to={`/character-sheet/${characterId?.params.id}/inventory`}>Inventory</NavLink>
        <NavLink to={`/character-sheet/${characterId?.params.id}/spells`}>Spells</NavLink>
      </div>
      <button onClick={toggleEditMode}>
        {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
      </button>
    </nav>
  );
};