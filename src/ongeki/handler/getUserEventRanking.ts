import { Repositories } from "../repo";
import { GetUserEventRankingRequest } from "../request/getUserEventRanking";
import { GetUserEventRankingResponse } from "../response/getUserEventRanking";

export default async function getUserEventRanking(
  rep: Repositories,
  req: GetUserEventRankingRequest
): Promise<GetUserEventRankingResponse> {
  return {
    userId: req.userId,
    length: 0,
    userEventRankingList: [
      // FIXME
    ],
  };
}
