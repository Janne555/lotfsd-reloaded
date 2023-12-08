import { Equipment } from "../components/Equipment"
import { NonEncumburingEquipment } from "../components/NonEncumburingEquipment"
import { Weapons } from "../components/Weapons"

export const InventoryPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <section className="ch-box p-4">
        <h1 className="text-xl font-bold text-center mb-4">Page Content</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#weapons">Weapons</a>
          <a href="#equipment">Equipment</a>
          <a href="#nonencumberingequipment">Non-Encumbering Equipment</a>
        </div>
      </section>
      <Weapons />
      <Equipment />
      <NonEncumburingEquipment />
    </div>
  )
}
