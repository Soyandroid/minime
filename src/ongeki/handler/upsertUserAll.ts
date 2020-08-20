import { Repositories } from "../repo";
import { readAimeId } from "../proto/base";
import { readUserCard } from "../proto/userCard";
import { readUserChapter } from "../proto/userChapter";
import { readUserCharacter } from "../proto/userCharacter";
import { readUserData } from "../proto/userData";
import { readUserDeck } from "../proto/userDeck";
import { readUserEventPoint } from "../proto/userEventPoint";
import { readUserItem } from "../proto/userItem";
import { readUserMusicDetail } from "../proto/userMusic";
import { readUserMusicItem } from "../proto/userMusicItem";
import { readUserActivity } from "../proto/userActivity";
import { readUserPlaylog } from "../proto/userPlaylog";
import { readUserStory } from "../proto/userStory";
import { readUserTrainingRoom } from "../proto/userTrainingRoom";
import { UpsertUserAllRequest } from "../request/upsertUserAll";
import { UpsertUserAllResponse } from "../response/upsertUserAll";

// It shouldn't need to be said really, but seeing as this message (A) requires
// fairly lengthy processing and (B) is only sent right at the end of a credit,
// you should probably copy the JSON from the server's debug log and then
// validate this implementation using curl if you're planning to make any
// modifications to how things get saved.

export default async function upsertUserAll(
  rep: Repositories,
  req: UpsertUserAllRequest
): Promise<UpsertUserAllResponse> {
  const aimeId = readAimeId(req.userId);
  const payload = req.upsertUserAll;
  const profile = readUserData(req.upsertUserAll.userData[0]);

  const profileId = await rep.userData().save(aimeId, profile);

  // Empty lists don't get sent at all. Not sure which are potentially empty
  // so let's just assume the answer is "all of them". Hence the use of || []
  // everywhere.

  for (const item of payload.userOption) {
    await rep.userOption().save(profileId, item);
  }

  for (const item of payload.userPlaylogList) {
    await rep.userPlaylog().save(profileId, readUserPlaylog(item));
  }

  for (const item of payload.userActivityList) {
    // Ongeki sends stub user activity items filled with zeros. Skip saving
    // these items.
    if (Object.values(item).every(v => v == 0)) {
      continue;
    }

    await rep.userActivity().save(profileId, readUserActivity(item));
  }

  for (const item of payload.userMusicDetailList) {
    await rep.userMusic().save(profileId, readUserMusicDetail(item));
  }

  for (const item of payload.userCharacterList) {
    await rep.userCharacter().save(profileId, readUserCharacter(item));
  }

  for (const item of payload.userCardList) {
    await rep.userCard().save(profileId, readUserCard(item));
  }

  for (const item of payload.userDeckList) {
    await rep.userDeck().save(profileId, readUserDeck(item));
  }

  for (const item of payload.userTrainingRoomList) {
    await rep.userTrainingRoom().save(profileId, readUserTrainingRoom(item));
  }

  for (const item of payload.userStoryList) {
    await rep.userStory().save(profileId, readUserStory(item));
  }

  for (const item of payload.userChapterList) {
    await rep.userChapter().save(profileId, readUserChapter(item));
  }

  for (const item of payload.userItemList) {
    await rep.userItem().save(profileId, readUserItem(item));
  }

  for (const item of payload.userMusicItemList) {
    await rep.userMusicItem().save(profileId, readUserMusicItem(item));
  }

  for (const item of payload.userEventPointList) {
    await rep.userEventPoint().save(profileId, readUserEventPoint(item));
  }

  return {
    returnCode: 1,
    apiName: "upsertUserAll",
  };
}
