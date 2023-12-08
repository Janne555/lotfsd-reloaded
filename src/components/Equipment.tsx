import { useAtomValue } from "jotai"
import { chunk } from "../utils"
import { characterSheetAtom } from "../atoms"

export function Equipment() {
  const { equipment } = useAtomValue(characterSheetAtom)
  const chunks = chunk(equipment, 5)
  let num = 0

  function getNext() {
    num++
    return num
  }

  return (
    <section className="ch-box">
      <h1 className="text-center text-xl font-bold mb-4">Equipment</h1>
      {chunks.map((chunk, i) => (
        <div key={i} className="grid grid-cols-8">
          <div className="col-start-8 row-start-1 row-end-6 border relative">
            {i > 0 && <div className="whitespace-nowrap truncate">+1 Enc</div>}
          </div>
          <span className="col-span-6 border border-l-0 pl-2 truncate">
            {chunk[0]?.name}
          </span>
          <span className="text-center border">{getNext()}</span>
          <span className="col-span-6 border border-l-0 pl-2 truncate">
            {chunk[1]?.name}
          </span>
          <span className="text-center border">{getNext()}</span>
          <span className="col-span-6 border border-l-0 pl-2 truncate">
            {chunk[2]?.name}
          </span>
          <span className="text-center border">{getNext()}</span>
          <span className="col-span-6 border border-l-0 pl-2 truncate">
            {chunk[3]?.name}
          </span>
          <span className="text-center border">{getNext()}</span>
          <span className="col-span-6 border border-l-0 pl-2 truncate">
            {chunk[4]?.name}
          </span>
          <span className="text-center border">{getNext()}</span>
        </div>
      ))}
    </section>
  )
}
