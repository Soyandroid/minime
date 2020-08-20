import { UserTrainingRoomResponseJson } from "../proto/userTrainingRoom";

export interface GetUserTrainingRoomByKeyResponse {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, number of results returned */
  length: number;

  userTrainingRoomList: UserTrainingRoomResponseJson[];
};
