import { LoadConfigRequest1, LoadConfigRequest2 } from "../request/loadConfig";
import { LoadConfigResponse1, LoadConfigResponse2 } from "../response/loadConfig";
import { Repositories } from "../repo";

export function loadConfig1(
  w: Repositories,
  req: LoadConfigRequest1
): LoadConfigResponse1 {
  return {
    type: "load_config_res1",
    status: 1,
    serverVersion: 130,
  };
}

export function loadConfig2(
  w: Repositories,
  req: LoadConfigRequest2
): LoadConfigResponse2 {
  return {
    type: "load_config_res2",
    status: 1,
    serverVersion: 130,
  };
}
