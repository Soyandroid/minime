import { Repositories } from "../repo";
import { GetGameRewardRequest } from "../request/getGameReward";
import { GetGameRewardResponse } from "../response/getGameReward";

export default async function getGameReward(
  rep: Repositories,
  req: GetGameRewardRequest
): Promise<GetGameRewardResponse> {
  return {
    length: 0,
    gameRewardList: [],
  };
}
