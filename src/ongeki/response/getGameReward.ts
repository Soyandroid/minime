import { GameRewardJson } from "../proto/gameReward";

export interface GetGameRewardResponse {
  length: number;
  gameRewardList: GameRewardJson[];
}
