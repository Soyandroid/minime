import { Repositories } from "../repo";
import { writeGameRanking } from "../proto/gameRanking";
import { GetGameRankingRequest } from "../request/getGameRanking";
import { GetGameRankingResponse } from "../response/getGameRanking";

export default async function getGameRanking(
  rep: Repositories,
  req: GetGameRankingRequest
): Promise<GetGameRankingResponse> {
  const items = await rep.gameRanking().load();

  return {
    type: req.type,
    gameRankingList: items.map(writeGameRanking),
  };
}
