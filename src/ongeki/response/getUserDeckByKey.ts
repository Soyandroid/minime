import { UserDeckJson } from "../proto/userDeck";

export interface GetUserDeckByKeyResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userDeckList: UserDeckJson[];
};
