import { GameMessageJson } from "../proto/gameMessage";

export interface GetGameMessageResponse {
  /** Integer */
  type: number;

  /** Integer */
  length: number;

  gameMessageList: GameMessageJson[];
}
