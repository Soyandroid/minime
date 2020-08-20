import { readAimeId } from "../proto/base";
import { writeUserDeck } from "../proto/userDeck";
import { Repositories } from "../repo";
import { GetUserDeckByKeyRequest } from "../request/getUserDeckByKey";
import { GetUserDeckByKeyResponse } from "../response/getUserDeckByKey";

export default async function getUserDeckByKey(
  rep: Repositories,
  req: GetUserDeckByKeyRequest
): Promise<GetUserDeckByKeyResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userDeck().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userDeckList: items.map(writeUserDeck),
  };
}
