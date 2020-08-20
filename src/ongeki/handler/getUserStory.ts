import { readAimeId } from "../proto/base";
import { writeUserStory } from "../proto/userStory";
import { Repositories } from "../repo";
import { GetUserStoryRequest } from "../request/getUserStory";
import { GetUserStoryResponse } from "../response/getUserStory";

export default async function getUserStory(
  rep: Repositories,
  req: GetUserStoryRequest
): Promise<GetUserStoryResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userStory().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userStoryList: items.map(writeUserStory),
  };
}
