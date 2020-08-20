import { Crush, readDate, writeObject } from "./base";
import { UserCardItem } from "../model/userCard";

export interface UserCardJson {
  cardId: number;
  digitalStock: number;
  analogStock: number;
  level: number;
  maxLevel: number;
  exp: number;
  printCount: number;
  useCount: number;
  isNew: boolean;
  kaikaDate: string;
  choKaikaDate: string;
  skillId: number;
  isAcquired: boolean;
  created: string;
}

export type UserCardResponseJson = Crush<UserCardItem>;

export function readUserCard(json: UserCardJson): UserCardItem {
  return {
    cardId: json.cardId,
    digitalStock: json.digitalStock,
    analogStock: json.analogStock,
    level: json.level,
    maxLevel: json.maxLevel,
    exp: json.exp,
    printCount: json.printCount,
    useCount: json.useCount,
    isNew: json.isNew,
    kaikaDate: readDate(json.kaikaDate),
    choKaikaDate: readDate(json.choKaikaDate),
    skillId: json.skillId,
    isAcquired: json.isAcquired,
    created: readDate(json.created),
  };
}

export function writeUserCard(obj: UserCardItem): UserCardResponseJson {
  return writeObject(obj);
}
