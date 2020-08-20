import { UserDeckItem } from "../model/userDeck";

export type UserDeckJson = UserDeckItem;

export function readUserDeck(json: UserDeckJson): UserDeckItem {
  return json;
}

export function writeUserDeck(obj: UserDeckItem): UserDeckJson {
  return obj;
}
