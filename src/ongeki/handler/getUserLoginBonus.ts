import { readAimeId } from "../proto/base";
import { writeUserLoginBonus } from "../proto/userLoginBonus";
import { Repositories } from "../repo";
import { GetUserLoginBonusRequest } from "../request/getUserLoginBonus";
import { GetUserLoginBonusResponse } from "../response/getUserLoginBonus";

export default async function getUserLoginBonus(
  rep: Repositories,
  req: GetUserLoginBonusRequest
): Promise<GetUserLoginBonusResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userLoginBonus().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userLoginBonusList: items.map(writeUserLoginBonus),
  };
}
