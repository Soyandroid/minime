import { Chara } from "../model/chara";
export interface LoadGachaResponse {
  type: "load_gacha_res";
  awardedToday: boolean;
  gender: string;
}
