import { readAimeId } from "../proto/base";
import { writeUserActivity } from "../proto/userActivity";
import { Repositories } from "../repo";
import { GetUserActivityRequest } from "../request/getUserActivity";
import { GetUserActivityResponse } from "../response/getUserActivity";

export default async function getUserActivity(
  rep: Repositories,
  req: GetUserActivityRequest
): Promise<GetUserActivityResponse> {
  const aimeId = readAimeId(req.userId);

  // Ongeki will crash if the `userActivity` lists total above 25 elements due to an
  // overflow in `PacketUpsertUserAll::create`. Avoid this by restricting the returned
  // number of elements according to the `cutPlayList` and `cutMusicList` constant
  // values.
  let limit: number | undefined = undefined;
  if (req.kind == 1) {
    limit = 15;
  } else if (req.kind == 2) {
    limit = 10;
  }

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userActivity().load(profileId, req.kind, limit);

  return {
    userId: req.userId,
    length: items.length,
    kind: req.kind,
    userActivityList: items.map(writeUserActivity),
  };
}
