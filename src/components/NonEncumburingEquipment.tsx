import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { Typography } from "@mui/material"

export function NonEncumburingEquipment() {
  const { nonEncumberingEquipment } = useAtomValue(characterSheetAtom)
  return (
    <section id="nonencumberingequipment" className="ch-box p-8">
      <Typography variant="h2">Non-Encumbering Equipment</Typography>
      <ul className="list-disc">
        {nonEncumberingEquipment.map((item, i) => (
          <li key={i} className="">
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
