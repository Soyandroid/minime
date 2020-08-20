import { UserLoginBonusJson } from "../proto/userLoginBonus";

export interface GetUserLoginBonusResponse {
  /** Long */
  userId: number;

  length: number;

  userLoginBonusList: UserLoginBonusJson[];
}
