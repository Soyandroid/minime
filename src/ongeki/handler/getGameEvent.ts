import { GameEventJson } from "../proto/gameEvent";
import { Repositories } from "../repo";
import { GetGameEventRequest } from "../request/getGameEvent";
import { GetGameEventResponse } from "../response/getGameEvent";

export default async function getGameEvent(
  rep: Repositories,
  req: GetGameEventRequest
): Promise<GetGameEventResponse> {
  const gameEventIds = [
    1000110101,
    1000110102,
    1000110103,
    1000110104,
    1000110105,
    1000110201,
    1000110202,
  ];
  const gameEventList: GameEventJson[] = [];

  for (const id of gameEventIds) {
    gameEventList.push({
      type: req.type,
      id,
      startDate: "0000-00-00 00:00:00.0",
      endDate: "2099-12-31 00:00:00.0",
    });
  }

  return {
    type: req.type,
    length: gameEventList.length,
    gameEventList,
  };
}
