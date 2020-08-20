import { UserMissionPointJson } from "../proto/userMissionPoint";

export interface GetUserMissionPointResponse {
  /** Long */
  userId: number;

  length: number;

  userMissionPointList: UserMissionPointJson[];
}
