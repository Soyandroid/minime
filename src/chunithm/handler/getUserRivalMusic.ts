import { Repositories } from "../repo";
import { GetUserRivalMusicRequest } from "../request/getUserRivalMusic";
import { GetUserRivalMusicResponse } from "../response/getUserRivalMusic";
import { readAimeId } from "../proto/base";

export default async function getUserRivalMusic(
  rep: Repositories,
  req: GetUserRivalMusicRequest
): Promise<GetUserRivalMusicResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);

  return {
    userId: req.userId,
    rivalId: "0",
    length: "0",
    nextIndex: "0",
    userRivalMusicList: [],
  };
}
