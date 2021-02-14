import { GameRankingItem } from "../model/gameRanking";

export interface GameRankingRepository {
  load(): Promise<GameRankingItem[]>;
}
