export { Page } from "./_defs";

import { UserActivityRepository } from "./userActivity";
import { UserCardRepository } from "./userCard";
import { UserChapterRepository } from "./userChapter";
import { UserCharacterRepository } from "./userCharacter";
import { UserDataRepository } from "./userData";
import { UserDeckRepository } from "./userDeck";
import { UserEventPointRepository } from "./userEventPoint";
import { UserItemRepository } from "./userItem";
import { UserMusicRepository } from "./userMusic";
import { UserMusicItemRepository } from "./userMusicItem";
import { UserOptionRepository } from "./userOption";
import { UserPlaylogRepository } from "./userPlaylog";
import { UserStoryRepository } from "./userStory";
import { UserTrainingRoomRepository } from "./userTrainingRoom";

export interface Repositories {
  userActivity(): UserActivityRepository;

  userCard(): UserCardRepository;

  userChapter(): UserChapterRepository;

  userCharacter(): UserCharacterRepository;

  userData(): UserDataRepository;

  userDeck(): UserDeckRepository;

  userEventPoint(): UserEventPointRepository;

  userItem(): UserItemRepository;

  userMusic(): UserMusicRepository;

  userMusicItem(): UserMusicItemRepository;

  userOption(): UserOptionRepository;

  userPlaylog(): UserPlaylogRepository;

  userStory(): UserStoryRepository;

  userTrainingRoom(): UserTrainingRoomRepository;
}
