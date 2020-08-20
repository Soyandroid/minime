import { UserLoginBonusItem } from "../model/userLoginBonus";

export type UserLoginBonusJson = UserLoginBonusItem;

export function readUserLoginBonus(json: UserLoginBonusJson): UserLoginBonusItem {
  return json;
}

export function writeUserLoginBonus(obj: UserLoginBonusItem): UserLoginBonusJson {
  return obj;
}
