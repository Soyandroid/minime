import { GamePresentJson } from "../proto/gamePresent";

export interface GetGamePresentResponse {
  length: number;
  gamePresentList: GamePresentJson[];
}
