import { readAimeId } from "../proto/base";
import { writeUserEventPoint } from "../proto/userEventPoint";
import { Repositories } from "../repo";
import { GetUserEventPointRequest } from "../request/getUserEventPoint";
import { GetUserEventPointResponse } from "../response/getUserEventPoint";

export default async function getUserEventPoint(
  rep: Repositories,
  req: GetUserEventPointRequest
): Promise<GetUserEventPointResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userEventPoint().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userEventPointList: items.map(writeUserEventPoint),
  };
}
