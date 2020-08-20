import { UserEventRankingResponseJson } from "../proto/userEventRanking";

export interface GetUserEventRankingResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userEventRankingList: UserEventRankingResponseJson[];
};
