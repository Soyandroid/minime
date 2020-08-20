import { Repositories } from "../repo";
import { GetUserBossRequest } from "../request/getUserBoss";
import { GetUserBossResponse } from "../response/getUserBoss";

export default async function getUserBoss(
  rep: Repositories,
  req: GetUserBossRequest
): Promise<GetUserBossResponse> {
  // TODO
  return {
    userId: req.userId,
    length: 0,
    userBossList: [],
  };
}
