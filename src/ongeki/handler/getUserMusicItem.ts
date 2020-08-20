import { paginationCookie } from "./_util";
import { readAimeId } from "../proto/base";
import { Repositories } from "../repo";
import { GetUserMusicItemRequest } from "../request/getUserMusicItem";
import { GetUserMusicItemResponse } from "../response/getUserMusicItem";

export default async function getUserMusicItem(
  rep: Repositories,
  req: GetUserMusicItemRequest
): Promise<GetUserMusicItemResponse> {
  const aimeId = readAimeId(req.userId);
  const maxCount = req.maxCount;
  const nextIndex = req.nextIndex;

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep
    .userMusicItem()
    .load(profileId, { limit: maxCount, offset: nextIndex });

  return {
    userId: req.userId,
    length: items.length,
    nextIndex: paginationCookie(items, { maxCount, nextIndex }),
    userMusicItemList: items,
  };
}
