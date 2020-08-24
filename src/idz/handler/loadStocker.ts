import { LoadStockerRequest } from "../request/loadStocker";
import { LoadStockerResponse } from "../response/loadStocker";
import { Repositories } from "../repo";
import { profile } from "console";

export async function loadStocker(
  w: Repositories,
  req: LoadStockerRequest
): Promise<LoadStockerResponse> {
  const profileId = await w.profile().find(req.aimeId);
  const backgrounds = await w.backgrounds().loadAll(profileId);
  const myChara = await w.myChara().loadAll(profileId);

  return {
    type: "load_stocker_res",
    status: 1,
    backgrounds,
    myChara,
  };
}
