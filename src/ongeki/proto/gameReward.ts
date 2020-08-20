import { GameRewardItem } from "../model/gameReward";

export type GameRewardJson = GameRewardItem;

export function writeGameReward(obj: GameRewardItem): GameRewardJson {
  return obj;
}
