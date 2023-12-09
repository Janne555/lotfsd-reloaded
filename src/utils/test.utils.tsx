import { produce } from 'immer';
import { CharacterSheet, CharacterSheetSchema } from '../types';
import { generateMock } from '@anatine/zod-mock';

export function makeCustomCharacterSheet(modifyFn: (characterSheet: CharacterSheet) => void) {
  return produce(generateMock(CharacterSheetSchema), modifyFn);
}
