export { Page } from "./_defs";

import { UserActivityRepository } from "./userActivity";
import { UserBpBaseRepository } from "./userBpBase";
import { UserCardRepository } from "./userCard";
import { UserChapterRepository } from "./userChapter";
import { UserCharacterRepository } from "./userCharacter";
import { UserDataRepository } from "./userData";
import { UserDeckRepository } from "./userDeck";
import { UserEventPointRepository } from "./userEventPoint";
import { UserItemRepository } from "./userItem";
import { UserLoginBonusRepository } from "./userLoginBonus";
import { UserMissionPointRepository } from "./userMissionPoint";
import { UserMusicRepository } from "./userMusic";
import { UserMusicItemRepository } from "./userMusicItem";
import { UserOptionRepository } from "./userOption";
import { UserPlaylogRepository } from "./userPlaylog";
import { UserRatinglogRepository } from "./userRatinglog";
import { UserStoryRepository } from "./userStory";
import { UserTrainingRoomRepository } from "./userTrainingRoom";

export interface Repositories {
  userActivity(): UserActivityRepository;

  userBpBase(): UserBpBaseRepository;

  userCard(): UserCardRepository;

  userChapter(): UserChapterRepository;

  userCharacter(): UserCharacterRepository;

  userData(): UserDataRepository;

  userDeck(): UserDeckRepository;

  userEventPoint(): UserEventPointRepository;

  userItem(): UserItemRepository;

  userLoginBonus(): UserLoginBonusRepository;

  userMissionPoint(): UserMissionPointRepository;

  userMusic(): UserMusicRepository;

  userMusicItem(): UserMusicItemRepository;

  userOption(): UserOptionRepository;

  userPlaylog(): UserPlaylogRepository;

  userRatinglog(): UserRatinglogRepository;

  userStory(): UserStoryRepository;

  userTrainingRoom(): UserTrainingRoomRepository;
}
