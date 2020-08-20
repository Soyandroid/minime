import { GamePointJson } from "../proto/gamePoint";

export interface GetGamePointResponse {
  /** Integer, number of results returned */
  length: number;

  gamePointList: GamePointJson[];
}
