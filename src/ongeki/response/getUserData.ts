import { UserDataResponseJson } from "../proto/userData";

export interface GetUserDataResponse {
  /** Integer, AiMe ID */
  userId: number;

  userData: UserDataResponseJson;
}
