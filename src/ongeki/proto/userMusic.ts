import { Crush, writeObject } from "./base";
import { UserMusicDetailItem } from "../model/userMusic";

/**
 * Chart high score object. Saved as a flat list when the client saves new
 * scores, loaded in groups when a player's high scores are loaded.
 */
export type UserMusicDetailJson = UserMusicDetailItem;

/**
 * Grouping of `UserMusicDetailItem` objects, used when scores are loaded.
 * Scores are grouped by `musicId`.
 */
export interface UserMusicJson {
  /** Integer, number of sub-objects in this object */
  length: number;

  /** Scores for this music ID */
  userMusicDetailList: UserMusicDetailJson[];
}

export function readUserMusicDetail(
  json: UserMusicDetailJson
): UserMusicDetailItem {
  return json;
}

export function writeUserMusicDetail(
  obj: UserMusicDetailItem
): UserMusicDetailJson {
  return obj;
}
