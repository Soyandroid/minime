import { UserBpBaseJson } from "../proto/userBpBase";

export interface GetUserBpBaseResponse {
  /** Long */
  userId: number;

  length: number;

  userBpBaseList: UserBpBaseJson[];
}
