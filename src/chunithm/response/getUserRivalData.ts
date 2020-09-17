import { UserRivalDataJson } from "../proto/userRivalData";

export interface GetUserRivalDataResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  userRivalData: UserRivalDataJson[];
}
