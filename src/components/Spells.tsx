import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"

export function Spells() {
  const { spells } = useAtomValue(characterSheetAtom)

  return (
    <section id="spells" className="ch-box px-1 py-4">
      <h1 className="text-xl font-bold text-center mb-4">Spells</h1>
      <div className="grid grid-cols-9">
        <span className="col-span-7 font-bold">Name</span>
        <span className="col-span-2 font-bold text-center">Level</span>
      </div>
      {spells.map((spell, i) => (
        <div key={i} className="grid grid-cols-9">
          <span className="col-span-7 truncate">{spell.name}</span>
          <span className="col-span-2 truncate text-center">{spell.level}</span>
        </div>
      ))}
    </section>
  )
}
