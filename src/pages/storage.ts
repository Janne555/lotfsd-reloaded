import localForage from 'localforage'
import { CharacterSheet, CharacterSheetSchema } from '../types'
import { z } from 'zod'

export async function getCharacterSheets(): Promise<CharacterSheet[]> {
  try {
    const data = await localForage.getItem<any[]>('characterSheets')
    let characterSheets: CharacterSheet[]

    if (data) {
      characterSheets = z.array(CharacterSheetSchema).parse(data)
    } else {
      characterSheets = (await import('../mockdata')).mockData.characterSheets
      await localForage.setItem('characterSheets', characterSheets)
    }

    return characterSheets
  } catch (error) {
    // Handle error if the retrieved data is not valid
    console.error('Error retrieving character sheets:', error)
    return []
  }
}

export async function getCharacterSheet(id: string): Promise<CharacterSheet | undefined> {
  try {
    const characterSheets = await getCharacterSheets()
    return characterSheets.find((sheet) => sheet.id === id)
  } catch (error) {
    console.error('Error retrieving character sheet:', error)
  }
}

export async function saveCharacterSheet(characterSheet: CharacterSheet) {
  try {
    const characterSheets = await getCharacterSheets()
    const index = characterSheets.findIndex((sheet) => sheet.id === characterSheet.id)
    if (index === -1) {
      characterSheets.push(characterSheet)
    } else {
      characterSheets[index] = characterSheet
    }
    await localForage.setItem('characterSheets', characterSheets)
  } catch (error) {
    console.error('Error saving character sheet:', error)
  }
}

export async function resetStorage() {
  await localForage.clear()
  const characterSheets = (await import('../mockdata')).mockData.characterSheets
  await localForage.setItem('characterSheets', characterSheets)
}
