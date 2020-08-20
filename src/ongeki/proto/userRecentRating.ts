import { UserPlaylogItem } from "../model/userPlaylog";
import { UserRecentRatingItem } from "../model/userRecentRating";

export type UserRecentRatingJson = UserRecentRatingItem;

export function readUserRecentRating(json: UserRecentRatingJson): UserRecentRatingItem {
  return json;
}

export function writeUserRecentRating(obj: UserRecentRatingItem): UserRecentRatingJson {
  return obj;
}

export function writeUserRecentRatingFromLog(
  obj: UserPlaylogItem
): UserRecentRatingJson {
  return {
    musicId: obj.musicId,
    difficultId: obj.level,
    // game version not saved in play log, just return a fixed version now
    romVersionCode: 1000000,
    score: obj.techScore,
  };
}
