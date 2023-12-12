import { Card, CardContent, IconButton, Typography } from "@mui/material"
import { CharacterSheetComponent } from "../layouts/CharacterSheetComponent"
import { useCharacterSheet, useEditMode, useMutateTempCharSheet } from "../hooks"
import { Weapon } from "../types"
import { calculateAttackBonus } from "../utils/ab.utils"
import { Add } from "@mui/icons-material"
import { GridDeleteIcon } from "@mui/x-data-grid"

export function Weapons() {
  const characterSheet = useCharacterSheet()
  const { weapons } = characterSheet
  const { isEditMode } = useEditMode()
  const meleeAB = calculateAttackBonus('meleeAB', characterSheet)
  const rangedAB = calculateAttackBonus('rangedAB', characterSheet)
  const mutateCharSheet = useMutateTempCharSheet()

  const handleDeleteWeapon = (id: string) => () => {
    mutateCharSheet(draft => {
      draft.weapons = draft.weapons.filter(weapon => weapon.id !== id)
    })
  }

  return (
    <CharacterSheetComponent>
      <Typography variant="h3">Weapons</Typography>
      <div className="flex flex-wrap gap-4">
        {weapons.map((weapon) => {
          if (weapon.range) {
            return <RangedWeaponCard key={weapon.id} weapon={weapon} ab={rangedAB} onDelete={isEditMode ? handleDeleteWeapon(weapon.id) : undefined} />
          } else {
            return <MeleeWeaponCard key={weapon.id} weapon={weapon} ab={meleeAB} onDelete={isEditMode ? handleDeleteWeapon(weapon.id) : undefined} />
          }
        })}
        {isEditMode && (
          <Card variant="elevation" className="w-40 text-center">
            <CardContent>
              <Typography variant="h5">Add Weapon</Typography>
              <IconButton><Add /></IconButton>
            </CardContent>
          </Card>
        )}
      </div>
    </CharacterSheetComponent>
  )
}

type Props = {
  weapon: Weapon
  ab: number
  onDelete?: () => void
}

const MeleeWeaponCard = ({ weapon, ab, onDelete }: Props) => {
  return (
    <Card variant="elevation" className="w-40 text-center">
      {onDelete && <IconButton onClick={onDelete}><GridDeleteIcon /></IconButton>}
      <CardContent>
        <span className="font-bold">{weapon.name}</span>
        <div className="flex gap-4 justify-center">
          <Typography>{weapon.damage}</Typography>
          <Typography>AB {weapon.attackBonus + ab}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

const RangedWeaponCard = ({ weapon, ab, onDelete }: Props) => {
  return (
    <Card variant="elevation" className="w-40 text-center">
      {onDelete && <IconButton onClick={onDelete}><GridDeleteIcon /></IconButton>}
      <CardContent>
        <span className="font-bold">{weapon.name}</span>
        <div className="flex gap-4 justify-center">
          <Typography>{weapon.damage}</Typography>
          <Typography>AB {weapon.attackBonus + ab}</Typography>
        </div>
        <span className="font-bold">Range</span>
        <div className="flex gap-4 justify-center">
          <Typography>S: {weapon.range?.short}</Typography>
          <Typography>M: {weapon.range?.medium}</Typography>
          <Typography>L: {weapon.range?.long}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}
