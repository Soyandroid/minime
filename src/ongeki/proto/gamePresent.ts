import { Crush, writeDate, writeObject } from "./base";
import { GamePresentItem } from "../model/gamePresent";

export interface GamePresentJson {
  presentId: number;
  presentName: string;
  rewardId: number;
  stock: number;
  message: string;
  startDate: string | null;
  endDate: string | null;
}

export function writeGamePresent(obj: GamePresentItem): GamePresentJson {
  return {
    presentId: obj.presentId,
    presentName: obj.presentName,
    rewardId: obj.rewardId,
    stock: obj.stock,
    message: obj.message,
    startDate: writeDate(obj.startDate),
    endDate: writeDate(obj.endDate),
  };
}
