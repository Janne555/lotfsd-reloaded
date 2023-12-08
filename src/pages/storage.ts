import localForage from 'localforage'
import { CharacterSheet, CharacterSheetSchema } from '../types'
import { z } from 'zod'
import { mockData } from '../mockdata'

export async function getCharacterSheets(): Promise<CharacterSheet[]> {
  try {
    const data = await localForage.getItem<any[]>('characterSheets')
    let characterSheets: CharacterSheet[]

    if (data) {
      characterSheets = z.array(CharacterSheetSchema).parse(data)
    } else {
      characterSheets = mockData.characterSheets
      await localForage.setItem('characterSheets', characterSheets)
    }

    return characterSheets
  } catch (error) {
    // Handle error if the retrieved data is not valid
    console.error('Error retrieving character sheets:', error)
    return []
  }
}
