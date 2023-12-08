import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"

export function NonEncumburingEquipment() {
  const { nonEncumberingEquipment } = useAtomValue(characterSheetAtom)
  return (
    <section className="ch-box p-8">
      <h1 className="text-center text-xl font-bold mb-4">Non-Encumbering Equipment</h1>
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
