import { DatabaseSchema } from '../types'

const latestVersion = 1

export const migrateDatabase = async (input: any) => {
  if (isNaN(input.version)) {
    throw new Error("Invalid database version")
  }
  const version = input.version
  if (version === latestVersion) {
    return DatabaseSchema.parse(input)
  }
  
  const migrater = (await import('./v1')).migrate
  const asLatestVersion = await migrater(input)
  return asLatestVersion
}
