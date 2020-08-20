import { UserActivityJson } from "../proto/userActivity";

export interface GetUserActivityResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  /** Integer, round-trip from request */
  kind: number;

  userActivityList: UserActivityJson[];
}
