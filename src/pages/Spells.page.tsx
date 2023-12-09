import { SpellSlots } from "../components/SpellSlots"
import { Spells } from "../components/Spells"

export const SpellsPage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <SpellSlots />
      <Spells />
    </div>
  )
}
