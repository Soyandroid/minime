import { UserRegionJson } from "../proto/userRegion";

export interface GetUserRegionResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userRegionList: UserRegionJson[];
}
