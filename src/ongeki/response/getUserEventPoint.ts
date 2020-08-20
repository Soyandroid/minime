import { UserEventPointJson } from "../proto/userEventPoint";

export interface GetUserEventPointResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userEventPointList: UserEventPointJson[];
};
