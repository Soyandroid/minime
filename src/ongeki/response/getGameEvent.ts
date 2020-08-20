import { GameEventJson } from "../proto/gameEvent";

export interface GetGameEventResponse {
  /** Integer */
  type: number;

  /** Integer, number of results returned */
  length: number;

  gameEventList: GameEventJson[];
}
