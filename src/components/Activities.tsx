import { Box, Typography } from '@mui/material'
import { deCamel } from '../utils'
import { DieFace } from './DieFace'
import { useAtomValue } from 'jotai'
import { characterSheetAtom } from '../atoms'

export function Activities() {
  const { activities } = useAtomValue(characterSheetAtom)

  return (
    <Box className="ch-box">
      <Typography variant="h4" align="center" gutterBottom>
        Common Activities
      </Typography>
      <Box className="flex flex-wrap justify-center gap-4">
        {Object.entries(activities).map(([name, { value }]) => (
          <Box key={name} className="w-24 flex flex-col items-center justify-items-center">
            <DieFace value={value} />
            <Typography className="capitalize font-bold text-center">{deCamel(name)}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
