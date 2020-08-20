import { readAimeId } from "../proto/base";
import { writeUserOption } from "../proto/userOption";
import { Repositories } from "../repo";
import { GetUserOptionRequest } from "../request/getUserOption";
import { GetUserOptionResponse } from "../response/getUserOption";

export default async function getUserOption(
  rep: Repositories,
  req: GetUserOptionRequest
): Promise<GetUserOptionResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const userOption = await rep.userOption().load(profileId);

  return {
    userId: req.userId,
    userOption: writeUserOption(userOption),
  };
}
