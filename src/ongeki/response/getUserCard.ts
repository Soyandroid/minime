import { UserCardResponseJson } from "../proto/userCard";

export interface GetUserCardResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  /**
   * Integer, pagination cookie. Sent back in next request if
   * `length === maxCount`.
   */
  nextIndex: number;

  userCardList: UserCardResponseJson[];
}
