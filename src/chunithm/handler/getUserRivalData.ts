import { Repositories } from "../repo";
import { GetUserRivalDataRequest } from "../request/getUserRivalData";
import { GetUserRivalDataResponse } from "../response/getUserRivalData";
import { readAimeId } from "../proto/base";

export default async function getUserRivalData(
  rep: Repositories,
  req: GetUserRivalDataRequest
): Promise<GetUserRivalDataResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);

  return {
    userId: req.userId,
    length: "0",
    userRivalData: [],
  };
}
