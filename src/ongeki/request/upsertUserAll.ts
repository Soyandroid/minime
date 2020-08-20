import { UserActivityJson } from "../proto/userActivity";
import { UserCardJson } from "../proto/userCard";
import { UserChapterJson } from "../proto/userChapter";
import { UserCharacterJson } from "../proto/userCharacter";
import { UserDataJson } from "../proto/userData";
import { UserDeckJson } from "../proto/userDeck";
import { UserEventPointJson } from "../proto/userEventPoint";
import { UserItemJson } from "../proto/userItem";
import { UserMusicDetailJson } from "../proto/userMusic";
import { UserMusicItemJson } from "../proto/userMusicItem";
import { UserOptionJson } from "../proto/userOption";
import { UserPlaylogJson } from "../proto/userPlaylog";
import { UserRecentRatingJson } from "../proto/userRecentRating";
import { UserStoryJson } from "../proto/userStory";
import { UserTrainingRoomJson } from "../proto/userTrainingRoom";

export interface UpsertUserAllRequest {
  /** Integer, AiMe ID */
  userId: number;

  upsertUserAll: {
    userData: UserDataJson[];
    userOption: UserOptionJson[];
    userPlaylogList: UserPlaylogJson[];
    // userSessionlogList
    userActivityList: UserActivityJson[];
    userRecentRatingList: UserRecentRatingJson[];
    // userBpBaseList
    // userRatingBaseBestList
    // userRatingBaseHotList
    userMusicDetailList: UserMusicDetailJson[];
    userCharacterList: UserCharacterJson[];
    userCardList: UserCardJson[];
    userDeckList: UserDeckJson[];
    userTrainingRoomList: UserTrainingRoomJson[];
    userStoryList: UserStoryJson[];
    userChapterList: UserChapterJson[];
    userItemList: UserItemJson[];
    userMusicItemList: UserMusicItemJson[];
    userEventPointList: UserEventPointJson[];

    /** String of binary digits */
    isNewMusicDetailList: string;

    /** String of binary digits */
    isNewCharacterList: string;

    /** String of binary digits */
    isNewCardList: string;

    /** String of binary digits */
    isNewDeckList: string;

    /** String of binary digits */
    isNewTrainingRoomList: string;

    /** String of binary digits */
    isNewStoryList: string;

    /** String of binary digits */
    isNewItemList: string;

    /** String of binary digits */
    isNewMusicItemList: string;

    /** String of binary digits */
    isNewEventPointList: string;
  };
}
