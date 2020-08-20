import { UserRecentRatingJson } from "../proto/userRecentRating";

export interface GetUserRecentRatingResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userRecentRatingList: UserRecentRatingJson[];
}
