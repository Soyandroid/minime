import { GameIdlistItem } from "../model/gameIdlist";
import { Repositories } from "../repo";
import { GetGameIdlistRequest } from "../request/getGameIdlist";
import { GetGameIdlistResponse } from "../response/getGameIdlist";

export default async function getGameIdlist(
  rep: Repositories,
  req: GetGameIdlistRequest
): Promise<GetGameIdlistResponse> {
  const list: GameIdlistItem[] = [];

  if (req.type == 1) {
    for (let i = 1; i <= 148; i++) {
      list.push({ type: req.type, id: i });
    }
  }

  return {
    type: req.type,
    length: list.length,
    gameIdlistList: list,
  };
}
