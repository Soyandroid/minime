import { Repositories } from "../repo";
import { LoadGachaRequest } from "../request/loadGacha";
import { LoadGachaResponse } from "../response/loadGacha";

export async function loadGacha(
  w: Repositories,
  req: LoadGachaRequest
): Promise<LoadGachaResponse> {
  const { aimeId } = req;

  const profileId = await w.profile().find(aimeId);
  const chara = await w.chara().load(profileId);
  const backgrounds = await w.backgrounds().loadAll(profileId);

  return {
    type: "load_gacha_res",
    awardedToday: true, // Disable for now, not even mapped out yet.
    gender: chara.gender,
  };
}
