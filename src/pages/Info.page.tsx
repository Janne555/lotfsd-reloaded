import { Activities } from "../components/Activities"
import { ArmorClass } from "../components/ArmorClass"
import { Attributes } from "../components/Attributes"
import { CombatInfo } from "../components/CombatInfo"
import { CombatOptions } from "../components/CombatOptions"
import { Encumbrance } from "../components/Encumbrance"
import { InfoBar } from "../components/InfoBar"
import { Languages } from "../components/Languages"
import { SavingThrows } from "../components/SavingThrows"

export const InfoPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <section className="ch-box p-4">
        <h1 className="text-xl font-bold text-center mb-4">Page Content</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#infobar">Basic Info</a>
          <a href="#attributes">Attributes</a>
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
      <SavingThrows />
      <CombatInfo />
      <ArmorClass />
      <CombatOptions />
      <Activities />
      <Encumbrance />
      <Languages />
    </div>
  )
}