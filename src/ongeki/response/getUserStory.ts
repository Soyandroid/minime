import { UserStoryJson } from "../proto/userStory";

export interface GetUserStoryResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userStoryList: UserStoryJson[];
};
