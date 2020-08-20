import { UserChapterJson } from "../proto/userChapter";

export interface GetUserChapterResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userChapterList: UserChapterJson[];
};
