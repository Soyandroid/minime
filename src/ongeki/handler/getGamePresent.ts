import { Repositories } from "../repo";
import { GetGamePresentRequest } from "../request/getGamePresent";
import { GetGamePresentResponse } from "../response/getGamePresent";

export default async function getGamePresent(
  rep: Repositories,
  req: GetGamePresentRequest
): Promise<GetGamePresentResponse> {
  return {
    length: 0,
    gamePresentList: [],
  };
}
