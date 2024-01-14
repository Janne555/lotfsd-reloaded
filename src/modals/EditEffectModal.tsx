import { useMatch, useNavigate } from "react-router-dom"
import { useCharacterSheet } from "../hooks/useStorage"
import { Box, Modal } from "@mui/material"
import { EffectForm } from "../forms/Effect.form"

type Props = {
  onClose?: () => void
  editMode?: boolean
}

export const EffectModal = ({ onClose, editMode }: Props) => {
  const navigate = useNavigate()
  const match = useMatch('/character-sheet/:id/info/effects/:effectId')
  const characterSheet = useCharacterSheet()

  if (!editMode) {
    return (
      <Modal
        open
        onClose={onClose}
      >
        <Box>
          <EffectForm onClose={onClose} />
        </Box>
      </Modal>
    )
  }

  const effectId = match?.params.effectId
  const effect = characterSheet.effects.find(e => e.id === effectId)
  if (!effect) {
    navigate(`/character-sheet/${match?.params.id}/info`)
    return null
  }

  return (
    <Modal
      open
      onClose={onClose}
    >
      <Box>
        <EffectForm defaultValues={effect} onClose={onClose} />
      </Box>
    </Modal>
  )
}
