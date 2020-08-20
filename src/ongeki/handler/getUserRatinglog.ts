import { readAimeId } from "../proto/base";
import { writeUserRatinglog } from "../proto/userRatinglog";
import { Repositories } from "../repo";
import { GetUserRatinglogRequest } from "../request/getUserRatinglog";
import { GetUserRatinglogResponse } from "../response/getUserRatinglog";

export default async function getUserRatinglog(
  rep: Repositories,
  req: GetUserRatinglogRequest
): Promise<GetUserRatinglogResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userRatinglog().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userRatinglogList: items.map(writeUserRatinglog),
  };
}
