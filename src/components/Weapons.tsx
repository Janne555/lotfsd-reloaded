import { useAtomValue } from "jotai"
import { characterSheetAtom } from "../atoms"
import { Typography } from "@mui/material"

export function Weapons() {
  const { weapons } = useAtomValue(characterSheetAtom)
  return (
    <section id="weapons" className="ch-box p-2 py-4">
      <Typography variant="h2">Weapons</Typography>
      <div className="flex flex-col gap-x-2">
        {weapons.map((weapon, i) => (
          <div key={i} className="grid grid-cols-12 border-b last:border-b-0">
            <span className="col-span-full truncate">{weapon.name}</span>
            <span className="font-bold">AB</span>
            <span className="col-span-2 truncate">{weapon.attackBonus}</span>
            <span className="col-span-3 font-bold">Damage</span>
            <span className="col-span-6 truncate">{weapon.damage}</span>
            {Boolean(weapon.range) &&
              <div className="col-span-full grid grid-cols-12">
                <span className="font-bold">S</span>
                <span className="col-span-3 truncate">{weapon.range?.short}</span>
                <span className="font-bold">M</span>
                <span className="col-span-3 truncate">{weapon.range?.medium}</span>
                <span className="font-bold">L</span>
                <span className="col-span-3 truncate">{weapon.range?.long}</span>
              </div>}
          </div>
        ))}
      </div>
    </section>
  )
}
