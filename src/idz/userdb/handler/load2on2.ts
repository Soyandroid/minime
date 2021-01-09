import { Load2on2Request1, Load2on2Request2 } from "../request/load2on2";
import { Load2on2Response1, Load2on2Response2 } from "../response/load2on2";
import { Repositories } from "../repo";

export function load2on2_1(
  w: Repositories,
  req: Load2on2Request1
): Load2on2Response1 {
  return {
    type: "load_2on2_res_1",
  };
}

export function load2on2_2(
  w: Repositories,
  req: Load2on2Request2
): Load2on2Response2 {
  return {
    type: "load_2on2_res_2",
  };
}
