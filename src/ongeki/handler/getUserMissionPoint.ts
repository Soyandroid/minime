import { readAimeId } from "../proto/base";
import { writeUserMissionPoint } from "../proto/userMissionPoint";
import { Repositories } from "../repo";
import { GetUserMissionPointRequest } from "../request/getUserMissionPoint";
import { GetUserMissionPointResponse } from "../response/getUserMissionPoint";

export default async function getUserMissionPoint(
  rep: Repositories,
  req: GetUserMissionPointRequest
): Promise<GetUserMissionPointResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userMissionPoint().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userMissionPointList: items.map(writeUserMissionPoint),
  };
}
