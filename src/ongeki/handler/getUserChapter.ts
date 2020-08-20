import { readAimeId } from "../proto/base";
import { writeUserChapter } from "../proto/userChapter";
import { Repositories } from "../repo";
import { GetUserChapterRequest } from "../request/getUserChapter";
import { GetUserChapterResponse } from "../response/getUserChapter";

export default async function getUserChapter(
  rep: Repositories,
  req: GetUserChapterRequest
): Promise<GetUserChapterResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userChapter().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userChapterList: items.map(writeUserChapter),
  };
}
