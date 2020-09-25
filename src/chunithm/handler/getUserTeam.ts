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
    teamId: "0",
    teamRank: "0",
    teamName: "",
    userTeamPoint: {
      userId: req.userId,
      teamId: "0",
      orderId: "0",
      teamPoint: "0",
      aggrDate: req.playDate,
    },
  };
}
