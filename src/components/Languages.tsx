import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { partition } from "../utils"

export function Languages() {
  const { languages } = useAtomValue(characterSheetAtom)
  const [known, notKnown] = partition(languages, lang => lang.isKnown)

  return (
    <section id="languages" className="ch-box">
      <h1 className="font-bold text-xl text-center mb-4">Languages</h1>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <span className="text-center font-semibold">Known</span>
          {known.map(lang => (
            <span key={lang.name} className="col-start-1 text-center border-r border-t truncate">{
              lang.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-center font-semibold">Not Known</span>
          {notKnown.map(lang => (
            <span key={lang.name} className="col-start-2 row-start-auto text-center border-t truncate">
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
