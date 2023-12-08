import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"

export function CombatOptions() {
  const { combatOptions } = useAtomValue(characterSheetAtom)

  return (
    <section className="ch-box p-8">
      <h1 className="text-center text-xl font-bold mb-4">Combat Options</h1>
      <ul className="list-disc">
        {combatOptions.map((combatOption, i) => (
          <li key={i} className="">
            <span>{combatOption.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
