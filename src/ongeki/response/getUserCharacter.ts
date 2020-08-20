import { UserCharacterResponseJson } from "../proto/userCharacter";

export interface GetUserCharacterResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  /**
   * Integer, pagination cookie. Sent back in next request if
   * `length === maxCount`.
   */
  nextIndex: number;

  userCharacterList: UserCharacterResponseJson[];
}
