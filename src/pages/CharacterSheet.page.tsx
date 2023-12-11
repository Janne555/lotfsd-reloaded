import { Activities } from "../components/Activities"
import { Attributes } from "../components/Attributes"
import { CombatInfo } from "../components/CombatInfo"
import { Encumbrance } from "../components/Encumbrance"
import { InfoBar } from "../components/InfoBar"
import { Languages } from "../components/Languages"
import { SavingThrows } from "../components/SavingThrows"
import { Effects } from "../components/Effects"
import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import { characterIdAtom } from "../atoms"
import { useAtomValue } from "jotai"
import { EffectModal } from "../modals/EditEffectModal"
import { SpellSlots } from "../components/SpellSlots"
import { Spells } from "../components/Spells"
import { Armor } from "../components/Armor"
import { Equipment } from "../components/Equipment"
import { NonEncumburingEquipment } from "../components/NonEncumburingEquipment"
import { Weapons } from "../components/Weapons"
import { Navigation } from "../components/Navigation"
import { Button, Typography } from "@mui/material"
import { CharacterSheetSection } from "../layouts/CharacterSheetSection"
import { useEffect, useState } from "react"

export const CharacterSheetPage = () => {
  const characterId = useAtomValue(characterIdAtom)
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('info')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.5 })
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const handleClose = () => navigate(`/character-sheet/${characterId?.params.id}/info`)

  return (
    <div className="flex flex-col gap-y-4">
      {/* @ts-ignore */}
      <Button className="block mt-4 p-4" LinkComponent={NavLink} to={`/`}>Back to Character Selection</Button>
      <CharacterSheetSection id="info">
        <Typography variant="h2">Info</Typography>
        <InfoBar />
        <Languages />
        <Effects />
        <Activities />
      </CharacterSheetSection>
      <CharacterSheetSection id="attributes">
        <Typography variant="h2">Attributes</Typography>
        <Attributes />
      </CharacterSheetSection>
      <CharacterSheetSection id="combatinfo">
        <Typography variant="h2">Combat</Typography>
        <SavingThrows />
        <CombatInfo />
      </CharacterSheetSection>
      <CharacterSheetSection id="spells">
        <Typography variant="h2">Spells</Typography>
        <Spells />
        <SpellSlots />
      </CharacterSheetSection>
      <CharacterSheetSection id="equipment">
        <Typography variant="h2">Equipment</Typography>
        <Encumbrance />
        <Armor />
        <Weapons />
        <Equipment />
        <NonEncumburingEquipment />
      </CharacterSheetSection>
      <Routes>
        <Route path="/add-effect" element={<EffectModal onClose={handleClose} />} />
        <Route path="/effects/:effectId" element={<EffectModal editMode onClose={handleClose} />} />
      </Routes>
      <Navigation value={activeSection} />
    </div>
  )
}
