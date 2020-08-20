import { writeBigInt } from "./base";
import { UserMissionPointItem } from "../model/userMissionPoint";

export interface UserMissionPointJson {
  eventId: number;
  point: number;
}

export function readUserMissionPoint(json: UserMissionPointJson): UserMissionPointItem {
  return {
    eventId: json.eventId,
    point: BigInt(json.point),
  };
}

export function writeUserMissionPoint(obj: UserMissionPointItem): UserMissionPointJson {
  return {
    eventId: obj.eventId,
    point: writeBigInt(obj.point),
  };
}
