import { useAtomValue } from 'jotai'
import { editModeAtom } from '../atoms'
import { DieFace } from './DieFace'
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material'
import { useCharacterSheet, useMutateCharSheet, useMutateTempCharSheet } from '../hooks'
import { deCamel } from '../utils/utils'
import { calculateAttackBonus } from '../utils/ab.utils'
import { calculateArmorClass } from '../utils/armorClass.utils'
import { Add, Delete } from '@mui/icons-material'
import { ArmorClasses, CombatInfo as CombatInfoType } from '../types'

export function CombatInfo() {
  const characterSheet = useCharacterSheet()
  const { combatInfo, armorClasses, combatOptions } = characterSheet
  const isEditMode = useAtomValue(editModeAtom)
  const mutateTempCharSheet = useMutateTempCharSheet()
  const mutateCharSheet = useMutateCharSheet()

  const handleCombatInfoChange = (key: keyof CombatInfoType, value: number) => {
    mutateTempCharSheet(draft => {
      draft.combatInfo[key].value = value
    })
  }

  const handleArmorClassChange = (key: keyof ArmorClasses, value: number) => {
    mutateTempCharSheet(draft => {
      draft.armorClasses[key].value = value
    })
  }

  const handleDeleteCombatOption = (id: string) => () => {
    mutateCharSheet(draft => {
      draft.combatOptions = draft.combatOptions.filter(opt => opt.id !== id)
    })
  }

  return (
    <section id="combatinfo" className="ch-box gap-4 flex flex-col">
      <Typography variant='h2'>Combat Info</Typography>
      <Typography variant='h3'>Attack Bonuses</Typography>
      <div className='grid grid-flow-col auto-cols-fr pt-4 gap-4'>
        <CombatInfoCard
          isEditMode={isEditMode}
          name='baseAB'
          handleChange={(_, value) => handleCombatInfoChange('baseAB', value)}
          value={combatInfo.baseAB.value}
          displayValue={calculateAttackBonus('baseAB', characterSheet)}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='meleeAB'
          handleChange={(_, value) => handleCombatInfoChange('meleeAB', value)}
          value={combatInfo.meleeAB.value}
          displayValue={calculateAttackBonus('meleeAB', characterSheet)}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='rangedAB'
          handleChange={(_, value) => handleCombatInfoChange('rangedAB', value)}
          value={combatInfo.rangedAB.value}
          displayValue={calculateAttackBonus('rangedAB', characterSheet)}
        />
      </div>
      <Typography variant='h3'>Armor Classes</Typography>
      <div className='grid grid-flow-col auto-cols-fr pt-4 gap-4'>
        <CombatInfoCard
          isEditMode={isEditMode}
          name='melee'
          label={'Mêlée'}
          handleChange={(_, value) => handleArmorClassChange('melee', value)}
          value={armorClasses.melee.value}
          displayValue={calculateArmorClass('melee', characterSheet)}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='ranged'
          handleChange={(_, value) => handleArmorClassChange('ranged', value)}
          value={armorClasses.ranged.value}
          displayValue={calculateArmorClass('ranged', characterSheet)}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='withoutShield'
          handleChange={(_, value) => handleArmorClassChange('withoutShield', value)}
          value={armorClasses.withoutShield.value}
          displayValue={calculateArmorClass('withoutShield', characterSheet)}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='surprised'
          handleChange={(_, value) => handleArmorClassChange('surprised', value)}
          value={armorClasses.surprised.value}
          displayValue={calculateArmorClass('surprised', characterSheet)}
        />
      </div>
      <Typography variant='h3'>Health</Typography>
      <div className='grid grid-flow-col auto-cols-fr pt-4 gap-4'>
        <CombatInfoCard
          isEditMode={isEditMode}
          name='tempHP'
          handleChange={(_, value) => handleCombatInfoChange('tempHP', value)}
          value={combatInfo.tempHP.value}
          displayValue={combatInfo.tempHP.value}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='currentHP'
          handleChange={(_, value) => handleCombatInfoChange('currentHP', value)}
          value={combatInfo.currentHP.value}
          displayValue={combatInfo.currentHP.value}
        />
        <CombatInfoCard
          isEditMode={isEditMode}
          name='maxHP'
          handleChange={(_, value) => handleCombatInfoChange('maxHP', value)}
          value={combatInfo.maxHP.value}
          displayValue={combatInfo.maxHP.value}
        />
      </div>
      <Typography variant='h3'>Misc</Typography>
      <div className='grid grid-cols-3 pt-4 gap-4'>
        <Card variant='elevation' className='h-30'>
          <CardContent className='grid grid-rows-2 justify-center text-center h-full'>
            <div className='self-center justify-self-center'>
              <DieFace value={6} />
            </div>
            <Typography className='capitalize place-self-end'>Surprise Chance</Typography>
          </CardContent>
        </Card>
        {combatOptions.map(({ name, id }) => (
          <Card variant='elevation' className='flex flex-col'>
            <CardContent>
              <div className="">Combat Option</div>
            </CardContent>
            <CardContent>
              <Typography>{name}</Typography>
            </CardContent>
            <CardActions className='mt-auto flex justify-end'>
              <IconButton onClick={handleDeleteCombatOption(id)}><Delete /></IconButton>
            </CardActions>
          </Card>
        ))}
        <Card variant='elevation' className='h-30 flex flex-col justify-center'>
          <CardContent className="text-center">
            <div className="">Add Combat Option</div>
            <IconButton><Add /></IconButton>
          </CardContent>
        </Card>
      </div>
    </section >
  )
}

type CombatInfoCardProps = {
  isEditMode: boolean
  value: number
  displayValue?: number
  name: string
  handleChange: (key: string, value: number) => void
  label?: string
}

const CombatInfoCard = ({ isEditMode, value, handleChange, name, label = deCamel(name), displayValue }: CombatInfoCardProps) => {
  return (
    <Card variant='elevation' className='h-30'>
      <CardContent className='grid grid-rows-2 justify-center text-center h-full'>
        <div className="text-2xl">
          {isEditMode
            ? <input type="number" defaultValue={value} onChange={e => handleChange(name, e.target.valueAsNumber)} className="w-full text-center" />
            : <span className="w-full text-center">{displayValue}</span>
          }
        </div>
        <Typography className='capitalize place-self-end w-full'>{label}</Typography>
      </CardContent>
    </Card>
  )
}
