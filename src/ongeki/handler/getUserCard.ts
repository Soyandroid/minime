import { paginationCookie } from "./_util";
import { readAimeId } from "../proto/base";
import { writeUserCard } from "../proto/userCard";
import { Repositories } from "../repo";
import { GetUserCardRequest } from "../request/getUserCard";
import { GetUserCardResponse } from "../response/getUserCard";

export default async function getUserCard(
  rep: Repositories,
  req: GetUserCardRequest
): Promise<GetUserCardResponse> {
  const aimeId = readAimeId(req.userId);
  const maxCount = req.maxCount;
  const nextIndex = req.nextIndex;

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep
    .userCard()
    .load(profileId, { limit: maxCount, offset: nextIndex });

  return {
    userId: req.userId,
    length: items.length,
    nextIndex: paginationCookie(items, { maxCount, nextIndex }),
    userCardList: items.map(writeUserCard),
  };
}
