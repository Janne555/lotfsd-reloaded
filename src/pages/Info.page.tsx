import { Box, Modal, Typography } from "@mui/material"
import { Activities } from "../components/Activities"
import { ArmorClass } from "../components/ArmorClass"
import { Attributes } from "../components/Attributes"
import { CombatInfo } from "../components/CombatInfo"
import { CombatOptions } from "../components/CombatOptions"
import { Encumbrance } from "../components/Encumbrance"
import { InfoBar } from "../components/InfoBar"
import { Languages } from "../components/Languages"
import { SavingThrows } from "../components/SavingThrows"
import { Effects } from "../components/Effects"
import { Route, Routes, useMatch, useNavigate } from "react-router-dom"
import { characterIdAtom } from "../atoms"
import { useAtomValue } from "jotai"
import { EffectForm } from "../forms/Effect.form"
import { useCharacterSheet } from "../hooks"

export const InfoPage = () => {
  const characterId = useAtomValue(characterIdAtom)
  const navigate = useNavigate()

  const handleClose = () => navigate(`/character-sheet/${characterId?.params.id}/info`)

  return (
    <div className="flex flex-col gap-y-4">
      <section className="ch-box">
        <Typography variant="h2">Page Content</Typography>
        <div className="flex flex-wrap gap-4 items-start">
          <a href="#infobar">Basic Info</a>
          <a href="#attributes">Attributes</a>
          <a href="#attributes">Effects</a>
          <a href="#savingthrows">Saving Throws</a>
          <a href="#combatinfo">Combat Info</a>
          <a href="#armorclass">Armor Class</a>
          <a href="#combatoptions">Combat Options</a>
          <a href="#activities">Common Activities</a>
          <a href="#encumbrance">Encumbrance</a>
          <a href="#languages">Languages</a>
        </div>
      </section>
      <InfoBar />
      <Attributes />
      <Effects />
      <SavingThrows />
      <CombatInfo />
      <ArmorClass />
      <CombatOptions />
      <Activities />
      <Encumbrance />
      <Languages />
      <Routes>
        <Route path="/add-effect" element={
          <Modal
            open
            onClose={handleClose}
          >
            <Box>
              <EffectForm onClose={handleClose} />
            </Box>
          </Modal>
        } />
        <Route path="/effects/:effectId" element={<EditEffectModal onClose={handleClose} />} />
      </Routes>
    </div>
  )
}

type EditEffectModalProps = {
  onClose?: () => void
}

const EditEffectModal = ({ onClose }: EditEffectModalProps) => {
  const navigate = useNavigate()
  const match = useMatch('/character-sheet/:id/info/effects/:effectId')
  const effectId = match?.params.effectId
  const characterSheet = useCharacterSheet()
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
