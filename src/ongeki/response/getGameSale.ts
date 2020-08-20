import { GameSaleJson } from "../proto/gameSale";

export interface GetGameSaleResponse {
  /** Integer */
  type: number;

  /** Integer, number of results returned */
  length: number;

  gameSaleList: GameSaleJson[];
}
