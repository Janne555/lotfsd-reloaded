import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { partition } from "../utils"
import { Typography } from "@mui/material"

export function Languages() {
  const { languages } = useAtomValue(characterSheetAtom)
  const [known, notKnown] = partition(languages, lang => lang.isKnown)

  return (
    <section id="languages" className="ch-box">
      <Typography variant="h2">Languages</Typography>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <span className="font-semibold">Known</span>
          {known.map(lang => (
            <span key={lang.name} className="col-start-1 border-r border-t truncate">{
              lang.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Not Known</span>
          {notKnown.map(lang => (
            <span key={lang.name} className="col-start-2 row-start-auto border-t truncate">
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
