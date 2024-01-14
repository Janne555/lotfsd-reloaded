import localForage from 'localforage'
import { CharacterSheet, Database, DatabaseSchema } from '../types'
import { migrateDatabase } from '../migrations'
import { nanoid } from 'nanoid'

type InitOptions = {
  useDemoData?: boolean
}

const databaseKey = 'database'

export async function init({ useDemoData }: InitOptions) {
  let database = await localForage.getItem<any>(databaseKey)

  if (!database) {
    database = {
      version: 0,
      characterSheets: []
    }
  }

  if (useDemoData && database.characterSheets.length === 0) {
    database = (await import('../mockdata')).mockData.database
    await localForage.setItem(databaseKey, database)
  }

  const migratedDatabase = await migrateDatabase(database)
  await localForage.setItem(databaseKey, migratedDatabase)
}

export async function getCharacterSheets(): Promise<CharacterSheet[]> {
  try {
    const data = await localForage.getItem<Database>(databaseKey)
    return DatabaseSchema.parse(data).characterSheets
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
    const database = await localForage.getItem<Database>(databaseKey)
      .then((data) => DatabaseSchema.parse(data))

    const index = database.characterSheets.findIndex((sheet) => sheet.id === characterSheet.id)
    if (index === -1) {
      database.characterSheets.push(characterSheet)
    } else {
      database.characterSheets[index] = characterSheet
    }
    await localForage.setItem(databaseKey, database)
  } catch (error) {
    console.error('Error saving character sheet:', error)
  }
}

export const createCharacterSheet = async () => {
  const characterSheet: CharacterSheet = {
    activities: [],
    armorClasses: {
      melee: { value: 0 },
      ranged: { value: 0 },
      surprised: { value: 0 },
      withoutShield: { value: 0 }
    },
    combatInfo: {
      baseAB: { value: 0 },
      currentHP: { value: 0 },
      maxHP: { value: 0 },
      meleeAB: { value: 0 },
      rangedAB: { value: 0 },
      surpriseChance: { value: 0 },
      tempHP: { value: 0 }
    },
    equipment: [],
    id: nanoid(),
    attributes: {
      strength: { value: 0 },
      dexterity: { value: 0 },
      constitution: { value: 0 },
      intelligence: { value: 0 },
      wisdom: { value: 0 },
      charisma: { value: 0 }
    },
    combatOptions: [],
    effects: [],
    encumbrance: {
      characterIsWearingChainMail: false,
      characterIsWearingPlateMail: false,
    },
    info: {
      age: 0,
      alignment: '',
      class: '',
      currentXp: 0,
      gender: '',
      name: 'New Character' + Math.floor(Math.random() * 1000),
      race: '',
      xpForNextLevel: 0
    },
    languages: [],
    nonEncumberingEquipment: [],
    savingThrows: {
      breathWeapon: { value: 0 },
      magic: { value: 0 },
      magicalDevice: { value: 0 },
      paralyze: { value: 0 },
      poison: { value: 0 }
    },
    spells: [],
    weapons: [],
    spellSlots: []
  }
  characterSheet.id = nanoid()
  await saveCharacterSheet(characterSheet)
  return characterSheet
}

export async function resetStorage() {
  await localForage.clear()
  init({ useDemoData: true })
}
