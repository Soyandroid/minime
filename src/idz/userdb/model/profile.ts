import { AimeId } from "../../../model";

export interface Profile {
  aimeId: AimeId;
  version: number;
  name: string;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
  playstamps: number;
  accessTime: Date;
  registerTime: Date;
}
