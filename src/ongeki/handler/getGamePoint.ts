import { Repositories } from "../repo";
import { GetGamePointRequest } from "../request/getGamePoint";
import { GetGamePointResponse } from "../response/getGamePoint";

export default async function getGamePoint(
  rep: Repositories,
  req: GetGamePointRequest
): Promise<GetGamePointResponse> {
  return {
    length: 0,
    gamePointList: [],
  };
}
