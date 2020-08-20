import { UserOptionJson } from "../proto/userOption";

export interface GetUserOptionResponse {
  /** Integer, AiMe ID */
  userId: number;

  userOption: UserOptionJson;
}
