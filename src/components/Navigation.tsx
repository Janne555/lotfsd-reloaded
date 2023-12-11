import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { Briefcase4Line, DiceIcon, InformationIcon, MagicFillIcon, SwordIcon } from "../icons"

type Props = {
  value: string
}

export const Navigation = ({ value }: Props) => {
  return (
    <div className="fixed bottom-0 border w-full">
      <BottomNavigation
        showLabels
        value={value}
        className="grid-cols-5 w-full overflow-x-auto"
      >
        <BottomNavigationAction href="#info" value="info" label="info" icon={<InformationIcon />} />
        <BottomNavigationAction href="#attributes" value="attributes" label="Attributes" icon={<DiceIcon />} />
        <BottomNavigationAction href="#combatinfo" value="combatinfo" label="Combat" icon={<SwordIcon />} />
        <BottomNavigationAction href="#spells" value="spells" label="Spells" icon={<MagicFillIcon />} />
        <BottomNavigationAction href="#equipment" value="equipment" label="Equipment" icon={<Briefcase4Line />} />
      </BottomNavigation>
    </div>

  )
}
