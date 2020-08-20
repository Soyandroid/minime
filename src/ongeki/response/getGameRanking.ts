import { GameRankingJson } from "../proto/gameRanking";

export interface GetGameRankingResponse {
  /** Long */
  type: number;

  // No length parameter..?

  gameRankingList: GameRankingJson[];
}
