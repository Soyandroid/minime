import { readAimeId } from "../proto/base";
import { writeUserBpBase } from "../proto/userBpBase";
import { Repositories } from "../repo";
import { GetUserBpBaseRequest } from "../request/getUserBpBase";
import { GetUserBpBaseResponse } from "../response/getUserBpBase";

export default async function getUserBpBase(
  rep: Repositories,
  req: GetUserBpBaseRequest
): Promise<GetUserBpBaseResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userBpBase().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userBpBaseList: items.map(writeUserBpBase),
  };
}
