import { range } from '../utils/utils'

type Props = {
  value: number
}

export function DieFace({ value }: Props) {
  return (
    <div
      style={{ height: '5rem', width: '4rem' }}
      className="border rounded-md grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-2 p-2"
    >
      {range(6).map(i => (
        <div key={i} className={`w-4 h-4 rounded-full ${(i + 1) <= value ? 'bg-black' : 'border'}`} />
      ))}
    </div>
  )
}
