import { GameEventJson } from "../proto/gameEvent";
import { Repositories } from "../repo";
import { GetGameEventRequest } from "../request/getGameEvent";
import { GetGameEventResponse } from "../response/getGameEvent";
import { EVENT_IDS as INITIAL_EVENT_IDS } from "../static/events/initial";
import { EVENT_IDS as INITIAL_PLUS_EVENT_IDS } from "../static/events/initial_plus";
import { EVENT_IDS as AIR_EVENT_IDS } from "../static/events/air";
import { EVENT_IDS as AIR_PLUS_EVENT_IDS } from "../static/events/air_plus";
import { EVENT_IDS as STAR_EVENT_IDS } from "../static/events/star";
import { EVENT_IDS as STAR_PLUS_EVENT_IDS } from "../static/events/star_plus";
import { EVENT_IDS as AMAZON_EVENT_IDS } from "../static/events/amazon";
import { EVENT_IDS as AMAZON_PLUS_EVENT_IDS } from "../static/events/amazon_plus";
import { EVENT_IDS as CRYSTAL_EVENT_IDS } from "../static/events/crystal";

export default async function getGameEvent(
  rep: Repositories,
  version: string | undefined,
  req: GetGameEventRequest
): Promise<GetGameEventResponse> {
  let eventIdList: readonly number[] = [];

  switch (version) {
    case "1.00":
    case "1.01":
      eventIdList = INITIAL_EVENT_IDS;
      break;

    case "1.05":
    case "1.06":
      eventIdList = INITIAL_PLUS_EVENT_IDS;
      break;

    case "1.10":
      eventIdList = AIR_EVENT_IDS;
      break;

    case "1.15":
      eventIdList = AIR_PLUS_EVENT_IDS;
      break;

    case "1.20":
      eventIdList = STAR_EVENT_IDS;
      break;

    case "1.25":
      eventIdList = STAR_PLUS_EVENT_IDS;
      break;

    case "1.30":
      eventIdList = AMAZON_EVENT_IDS;
      break;

    case "1.35":
      eventIdList = AMAZON_PLUS_EVENT_IDS;
      break;

    case "1.40":
    case "1.41":
      eventIdList = CRYSTAL_EVENT_IDS;
      break;

    default:
      break;
  }

  const gameEventList: GameEventJson[] = [];

  for (const id of eventIdList) {
    gameEventList.push({
      type: req.type,
      id: id.toString(),
      startDate: "2015-07-16 07:00:00.0",
      endDate: "2099-12-31 00:00:00.0",
    });
  }

  return {
    type: req.type,
    length: gameEventList.length.toString(),
    gameEventList,
  };
}
