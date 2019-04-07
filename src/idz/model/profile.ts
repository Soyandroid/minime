import { Id } from "./base";
import { Team } from "./team";

export interface Profile {
  id: Id<Profile>;
  teamId?: Id<Team>;
  name: string;
  lv: number;
  fame: number;
  dpoint: number;
}