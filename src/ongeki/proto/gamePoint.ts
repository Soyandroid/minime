import { Crush, writeObject } from "./base";
import { GamePointItem } from "../model/gamePoint";

export type GamePointJson = Crush<GamePointItem>;

export function writeGamePoint(obj: GamePointItem): GamePointJson {
  return writeObject(obj);
}
