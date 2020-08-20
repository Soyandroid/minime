import { Crush, readDate, writeObject } from "./base";
import { UserEventRankingItem } from "../model/userEventRanking";

export interface UserEventRankingJson {
  eventId: number;
  type: number;
  date: string;
  rank: number;
  point: number;
}

export type UserEventRankingResponseJson = Crush<UserEventRankingItem>;

export function readUserEventRanking(json: UserEventRankingJson): UserEventRankingItem {
  return {
    eventId: json.eventId,
    type: json.type,
    date: readDate(json.date),
    rank: json.rank,
    point: json.point,
  };
}

export function writeUserEventRanking(obj: UserEventRankingItem): UserEventRankingResponseJson {
  return writeObject(obj);
}
