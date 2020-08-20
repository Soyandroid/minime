import { UserMusicItemJson } from "../proto/userMusicItem";

export interface GetUserMusicItemResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  /**
   * Integer, pagination cookie. Sent back in next request if
   * `length === maxCount`.
   */
  nextIndex: number;

  userMusicItemList: UserMusicItemJson[];
}
