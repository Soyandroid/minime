import { ExtId } from "../model/base";
import { Team } from "../model/team";
import { AimeId } from "../../../model";

export interface Load2on2Request1 {
  type: "load_2on2_req1";
  field_0002: number;
  aimeId: AimeId;
  teamId: ExtId<Team>;
}

export interface Load2on2Request2 {
  type: "load_2on2_req2";
  field_0002: number;
  aimeId: AimeId;
  teamId: ExtId<Team>;
}
