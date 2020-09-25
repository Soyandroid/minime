import { Repositories } from "../repo";
import { GetUserFavoriteItemRequest } from "../request/getUserFavoriteItem";
import { GetUserFavoriteItemResponse } from "../response/getUserFavoriteItem";
import { readAimeId } from "../proto/base";

export default async function getUserFavoriteItem(
  rep: Repositories,
  req: GetUserFavoriteItemRequest
): Promise<GetUserFavoriteItemResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);

  return {
    userId: req.userId,
    length: "0",
    kind: req.kind,
    nextIndex: "-1",
    userFavoriteItemList: [],
  };
}
