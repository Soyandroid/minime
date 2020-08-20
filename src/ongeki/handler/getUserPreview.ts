import { readAimeId, writeBigInt, writeDate } from "../proto/base";
import { Repositories } from "../repo";
import { GetUserPreviewRequest } from "../request/getUserPreview";
import { GetUserPreviewResponse } from "../response/getUserPreview";

export default async function getUserPreview(
  rep: Repositories,
  req: GetUserPreviewRequest
): Promise<GetUserPreviewResponse | null> {
  console.log("userId: %d", req.userId);
  const aimeId = readAimeId(req.userId);
  console.log("aimeId: %d", aimeId);
  const profileId = await rep.userData().tryLookup(aimeId);

  // Return a stub JSON object if the player lacks a profile; the null
  // `lastPlayDate` will trigger the new profile registration flow in the
  // client.

  if (profileId === undefined) {
    return {
      userId: req.userId,

      // Current login (i.e. profile lock) status

      isLogin: false,
      lastLoginDate: "0000-00-00 00:00:00",

      // UserData:

      userName: "",
      reincarnationNum: 0,
      level: 0,
      exp: 0,
      playerRating: 0,
      lastGameId: "",
      lastRomVersion: "",
      lastDataVersion: "",
      // Trigger profile registration
      lastPlayDate: null,
      trophyId: 0,
      cardId: aimeId,

      // UserOption:

      dispPlayerLv: 0,
      dispRating: 0,
      dispBP: 0,
      headphone: 0,
    };
  }

  const userData = await rep.userData().load(profileId);
  const userOption = await rep.userOption().load(profileId);

  return {
    userId: req.userId,

    // Current login (i.e. profile lock) status

    isLogin: false,
    lastLoginDate: "1970-01-01 09:00:00",

    // UserData:

    userName: userData.userName,
    reincarnationNum: userData.reincarnationNum,
    level: userData.level,
    exp: writeBigInt(userData.exp),
    playerRating: userData.playerRating,
    lastGameId: userData.lastGameId,
    lastRomVersion: userData.lastRomVersion,
    lastDataVersion: userData.lastDataVersion,
    lastPlayDate: writeDate(userData.lastPlayDate),
    trophyId: userData.trophyId,
    cardId: userData.cardId,

    // UserOption:

    dispPlayerLv: userOption.dispPlayerLv,
    dispRating: userOption.dispRating,
    dispBP: userOption.dispBP,
    headphone: userOption.headphone,
  };
}
