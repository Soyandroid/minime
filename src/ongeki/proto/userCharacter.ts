import { Crush, readDate, writeObject } from "./base";
import { UserCharacterItem } from "../model/userCharacter";

export interface UserCharacterJson {
  characterId: number;
  playCount: number;
  intimateLevel: number;
  intimateCount: number;
  intimateCountRewarded: number;
  intimateCountDate?: string;
  isNew: boolean;
}

export type UserCharacterResponseJson = Crush<UserCharacterItem>;

export function readUserCharacter(json: UserCharacterJson): UserCharacterItem {
  const intimateCountDate = json.intimateCountDate ? readDate(json.intimateCountDate) : undefined;

  return {
    characterId: json.characterId,
    playCount: json.playCount,
    intimateLevel: json.intimateLevel,
    intimateCount: json.intimateCount,
    intimateCountRewarded: json.intimateCountRewarded,
    intimateCountDate,
    isNew: json.isNew,
  };
}

export function writeUserCharacter(obj: UserCharacterItem): UserCharacterResponseJson {
  return writeObject(obj);
}
