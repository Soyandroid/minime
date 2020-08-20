import { GameIdlistItem } from "../model/gameIdlist";

export interface GetGameIdlistResponse {
  /** Integer */
  type: number;

  /** Integer */
  length: number;

  /** Format TBD */
  gameIdlistList: GameIdlistItem[];
}
