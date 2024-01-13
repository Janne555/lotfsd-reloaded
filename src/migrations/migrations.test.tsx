import { describe, test, expect } from "vitest"
import { CharacterSheetV0 } from "../testdata/charactersheets/sheet-v0"
import { migrateDatabase } from "."
import { DatabaseSchema } from "../types"

describe("migrations", () => {
  test('should migrate from 0 to latest', async () => {
    const v0database = {
      version: 0,
      characterSheets: [
        CharacterSheetV0
      ]
    }

    const result = await migrateDatabase(v0database)

    expect(result.version).toBe(1)
    expect(() => DatabaseSchema.parse(result)).not.toThrow()
    expect(result).toMatchSnapshot()
  })
})
