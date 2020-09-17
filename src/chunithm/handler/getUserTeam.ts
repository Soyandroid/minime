import { Repositories } from "../repo";
import { GetUserTeamRequest } from "../request/getUserTeam";
import { GetUserTeamResponse } from "../response/getUserTeam";
import { readAimeId } from "../proto/base";

export default async function getUserTeam(
  rep: Repositories,
  req: GetUserTeamRequest
): Promise<GetUserTeamResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);

  return {
    userId: req.userId,
    teamId: "1",
    teamRank: "1",
    teamName: "肛批批射",
    userTeamPoint: "114514",
  };
}
