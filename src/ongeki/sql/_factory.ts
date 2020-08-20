import { SqlUserActivityRepository } from "./userActivity";
import { SqlUserBpBaseRepository } from "./userBpBase";
import { SqlUserCardRepository } from "./userCard";
import { SqlUserChapterRepository } from "./userChapter";
import { SqlUserCharacterRepository } from "./userCharacter";
import { SqlUserDataRepository } from "./userData";
import { SqlUserDeckRepository } from "./userDeck";
import { SqlUserEventPointRepository } from "./userEventPoint";
import { SqlUserItemRepository } from "./userItem";
import { SqlUserLoginBonusRepository } from "./userLoginBonus";
import { SqlUserMissionPointRepository } from "./userMissionPoint";
import { SqlUserMusicRepository } from "./userMusic";
import { SqlUserMusicItemRepository } from "./userMusicItem";
import { SqlUserOptionRepository } from "./userOption";
import { SqlUserPlaylogRepository } from "./userPlaylog";
import { SqlUserRatinglogRepository } from "./userRatinglog";
import { SqlUserStoryRepository } from "./userStory";
import { SqlUserTrainingRoomRepository } from "./userTrainingRoom";
import { Repositories } from "../repo";
import { UserActivityRepository } from "../repo/userActivity";
import { UserBpBaseRepository } from "../repo/userBpBase";
import { UserCardRepository } from "../repo/userCard";
import { UserChapterRepository } from "../repo/userChapter";
import { UserCharacterRepository } from "../repo/userCharacter";
import { UserDataRepository } from "../repo/userData";
import { UserDeckRepository } from "../repo/userDeck";
import { UserEventPointRepository } from "../repo/userEventPoint";
import { UserItemRepository } from "../repo/userItem";
import { UserLoginBonusRepository } from "../repo/userLoginBonus";
import { UserMissionPointRepository } from "../repo/userMissionPoint";
import { UserMusicRepository } from "../repo/userMusic";
import { UserMusicItemRepository } from "../repo/userMusicItem";
import { UserOptionRepository } from "../repo/userOption";
import { UserPlaylogRepository } from "../repo/userPlaylog";
import { UserRatinglogRepository } from "../repo/userRatinglog";
import { UserStoryRepository } from "../repo/userStory";
import { UserTrainingRoomRepository } from "../repo/userTrainingRoom";
import { Transaction } from "../../sql";

export class SqlRepositories implements Repositories {
  constructor(private readonly _txn: Transaction) {}

  userActivity(): UserActivityRepository {
    return new SqlUserActivityRepository(this._txn);
  }

  userBpBase(): UserBpBaseRepository {
    return new SqlUserBpBaseRepository(this._txn);
  }

  userCard(): UserCardRepository {
    return new SqlUserCardRepository(this._txn);
  }

  userChapter(): UserChapterRepository {
    return new SqlUserChapterRepository(this._txn);
  }

  userCharacter(): UserCharacterRepository {
    return new SqlUserCharacterRepository(this._txn);
  }

  userData(): UserDataRepository {
    return new SqlUserDataRepository(this._txn);
  }

  userDeck(): UserDeckRepository {
    return new SqlUserDeckRepository(this._txn);
  }

  userEventPoint(): UserEventPointRepository {
    return new SqlUserEventPointRepository(this._txn);
  }

  userOption(): UserOptionRepository {
    return new SqlUserOptionRepository(this._txn);
  }

  userItem(): UserItemRepository {
    return new SqlUserItemRepository(this._txn);
  }

  userLoginBonus(): UserLoginBonusRepository {
    return new SqlUserLoginBonusRepository(this._txn);
  }

  userMissionPoint(): UserMissionPointRepository {
    return new SqlUserMissionPointRepository(this._txn);
  }

  userMusic(): UserMusicRepository {
    return new SqlUserMusicRepository(this._txn);
  }

  userMusicItem(): UserMusicItemRepository {
    return new SqlUserMusicItemRepository(this._txn);
  }

  userPlaylog(): UserPlaylogRepository {
    return new SqlUserPlaylogRepository(this._txn);
  }

  userRatinglog(): UserRatinglogRepository {
    return new SqlUserRatinglogRepository(this._txn);
  }

  userStory(): UserStoryRepository {
    return new SqlUserStoryRepository(this._txn);
  }

  userTrainingRoom(): UserTrainingRoomRepository {
    return new SqlUserTrainingRoomRepository(this._txn);
  }
}
