import { useAtomValue } from 'jotai'
import { characterSheetAtom, editModeAtom } from '../atoms'
import { Diamond } from './Diamond'
import { DieFace } from './DieFace'
import { Typography } from '@mui/material'

export function CombatInfo() {
  const { combatInfo } = useAtomValue(characterSheetAtom)
  const isEditMode = useAtomValue(editModeAtom)

  const handleChange = (key: keyof typeof combatInfo, value: number) => {
    console.log(key, value)
  }

  return (
    <section id="combatinfo" className="ch-box">
      <Typography variant='h2'>Combat Info</Typography>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="flex flex-col m-4 gap-4 items-center">
          <Diamond>
            {isEditMode
              ? <input
                type="number"
                value={combatInfo.baseAB.value}
                onChange={e => handleChange("baseAB", e.target.valueAsNumber)}
                className="w-full" />
              : <span>{combatInfo.baseAB.value}</span>
            }
          </Diamond>
          <span>Base AB</span>
        </div>
        <div className="flex flex-col m-4 gap-4 items-center">
          <Diamond>
            {isEditMode
              ? <input
                type="number"
                value={combatInfo.meleeAB.value}
                onChange={e => handleChange("meleeAB", e.target.valueAsNumber)}
                className="w-full" />
              : <span>{combatInfo.meleeAB.value}</span>
            }
          </Diamond>
          <span>Mêlée AB</span>
        </div>
        <div className="flex flex-col m-4 gap-4 items-center">
          <Diamond>
            {isEditMode
              ? <input
                type="number"
                value={combatInfo.rangedAB.value}
                onChange={e => handleChange("rangedAB", e.target.valueAsNumber)}
                className="w-full" />
              : <span>{combatInfo.rangedAB.value}</span>
            }
          </Diamond>
          <span>Ranged AB</span>
        </div>
        <div className="flex flex-col items-center">
          <span>Surprise Chance</span>
          <DieFace value={6} />
        </div>
        <div className="grid gap-2 place-items-center">
          <span>Current HP</span>
          {isEditMode
            ? <input
              type="number"
              value={combatInfo.currentHP.value}
              onChange={e => handleChange("currentHP", e.target.valueAsNumber)}
              className="border p-4 w-6 h-6 box-content flex items-center justify-center"
            />
            : <span className="border p-4 w-6 h-6 box-content flex items-center justify-center">{combatInfo.currentHP.value}</span>
          }
          {isEditMode
            ? <input
              type="number"
              value={combatInfo.maxHP.value}
              onChange={e => handleChange("maxHP", e.target.valueAsNumber)}
              className="border p-4 w-6 h-6 box-content flex items-center justify-center"
            />
            : <span className="border p-4 w-6 h-6 box-content flex items-center justify-center">{combatInfo.maxHP.value}</span>
          }
          <span>Max HP</span>
        </div>
      </div>
    </section>
  )
}
