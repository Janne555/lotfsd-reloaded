import { Button, IconButton, Typography } from "@mui/material"
import { Briefcase4Line, DiceIcon, FileListLineIcon, InformationIcon, MagicFillIcon, SwordIcon } from "../icons"
import { useEditMode } from "../hooks/useStorage"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

type Props = {
  value: string
}

export const Navigation = ({ value }: Props) => {
  const { isEditMode, setEditModeOff } = useEditMode()
  const navigate = useNavigate()

  return (
    <Container className="fixed bottom-0 w-screen overflow-clip flex flex-col items-center gap-4">
      {isEditMode && <Button onClick={() => setEditModeOff()} variant="contained">Save Changes</Button>}
      <nav className="grid cols-6 grid-flow-col w-full overflow-x-scroll border bg-white px-4 gap-4">
        <IconButton onClick={() => navigate('/')} className="flex flex-col items-center">
          <FileListLineIcon />
          <Typography>Start</Typography>
        </IconButton>
        <IconButton href="#info" className="flex flex-col items-center">
          <InformationIcon />
          <Typography>Info</Typography>
        </IconButton>
        <IconButton href="#attributes" className="flex flex-col items-center">
          <DiceIcon />
          <Typography>Attributes</Typography>
        </IconButton>
        <IconButton href="#combat" className="flex flex-col items-center">
          <SwordIcon />
          <Typography>Combat</Typography>
        </IconButton>
        <IconButton href="#spells" className="flex flex-col items-center">
          <MagicFillIcon />
          <Typography>Spells</Typography>
        </IconButton>
        <IconButton href="#equipment" className="flex flex-col items-center">
          <Briefcase4Line />
          <Typography>Equipment</Typography>
        </IconButton>
      </nav>
    </Container>

  )
}

const Container = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`