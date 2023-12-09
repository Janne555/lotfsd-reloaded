import { Typography } from "@mui/material"
import { Armor } from "../components/Armor"
import { Equipment } from "../components/Equipment"
import { NonEncumburingEquipment } from "../components/NonEncumburingEquipment"
import { Weapons } from "../components/Weapons"
import { Encumbrance } from "../components/Encumbrance"

export const InventoryPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <section className="ch-box p-4">
        <Typography variant="h2">Page Content</Typography>
        <div className="flex flex-wrap gap-4 items-start">
          <a href="#encumbrance">Encumbrance</a>
          <a href="#weapons">Weapons</a>
          <a href="#equipment">Equipment</a>
          <a href="#nonencumberingequipment">Non-Encumbering Equipment</a>
        </div>
      </section>
      <Encumbrance />
      <Armor />
      <Weapons />
      <Equipment />
      <NonEncumburingEquipment />
    </div>
  )
}
