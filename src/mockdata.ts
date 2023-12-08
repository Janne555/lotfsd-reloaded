import { generateMock } from '@anatine/zod-mock'
import { CharacterSheetSchema } from './types'

const characterSheets = Array.from({ length: 10 }, (_, i) => ({
  ...generateMock(CharacterSheetSchema),
  id: i.toString(),
  activities: {
    sneackAttack: {
      value: 1
    },
    bushcraft: {
      value: 1
    },
    climb: {
      value: 1
    },
    languages: {
      value: 6
    },
  }
}))

export const mockData = {
  characterSheets,
}
