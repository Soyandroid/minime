import { Crush, readDate, writeObject } from "./base";
import { UserTrainingRoomItem } from "../model/userTrainingRoom";

export interface UserTrainingRoomJson {
  authKey: string;
  userId: number;
  roomId: number;
  cardId: number;
  valueDate: string;
};

export type UserTrainingRoomResponseJson = Crush<UserTrainingRoomItem>;

export function readUserTrainingRoom(json: UserTrainingRoomJson): UserTrainingRoomItem {
  return {
    authKey: json.authKey,
    userId: json.userId,
    roomId: json.roomId,
    cardId: json.cardId,
    valueDate: readDate(json.valueDate),
  };
}

export function writeUserTrainingRoom(obj: UserTrainingRoomItem): UserTrainingRoomResponseJson {
  return writeObject(obj);
}
