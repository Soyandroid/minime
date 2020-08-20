import { UserRatinglogJson } from "../proto/userRatinglog";

export interface GetUserRatinglogResponse {
  /** Long */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userRatinglogList: UserRatinglogJson[];
}
