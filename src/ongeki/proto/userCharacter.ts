import { UserCharacterItem } from "../model/userCharacter";

export type UserCharacterJson = UserCharacterItem;

export function readUserCharacter(json: UserCharacterJson): UserCharacterItem {
  return json;
}

export function writeUserCharacter(obj: UserCharacterItem): UserCharacterJson {
  return obj;
}
