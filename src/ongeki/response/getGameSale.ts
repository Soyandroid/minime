import { GameSaleJson } from "../proto/gameSale";

export interface GetGameSaleResponse {
  /** Integer */
  type: number;

  /** Integer */
  length: number;

  gameSaleList: GameSaleJson[];
}
