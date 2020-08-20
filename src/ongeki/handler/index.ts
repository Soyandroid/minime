import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import logger from "debug";

import extendLockTime from "./extendLockTime";
import gameLogin from "./gameLogin";
import gameLogout from "./gameLogout";
import getGameEvent from "./getGameEvent";
import getGameIdlist from "./getGameIdlist";
import getGameMessage from "./getGameMessage";
import getGamePresent from "./getGamePresent";
import getGamePoint from "./getGamePoint";
import getGameRanking from "./getGameRanking";
import getGameReward from "./getGameReward";
import getGameSale from "./getGameSale";
import getGameSetting from "./getGameSetting";
import getUserActivity from "./getUserActivity";
import getUserBpBase from "./getUserBpBase";
import getUserCard from "./getUserCard";
import getUserChapter from "./getUserChapter";
import getUserCharacter from "./getUserCharacter";
import getUserData from "./getUserData";
import getUserDeckByKey from "./getUserDeckByKey";
import getUserEventPoint from "./getUserEventPoint";
import getUserEventRanking from "./getUserEventRanking";
import getUserItem from "./getUserItem";
import getUserLoginBonus from "./getUserLoginBonus";
import getUserMissionPoint from "./getUserMissionPoint";
import getUserMusic from "./getUserMusic";
import getUserMusicItem from "./getUserMusicItem";
import getUserOption from "./getUserOption";
import getUserPreview from "./getUserPreview";
import getUserRatinglog from "./getUserRatinglog";
import getUserRecentRating from "./getUserRecentRating";
import getUserRegion from "./getUserRegion";
import getUserStory from "./getUserStory";
import getUserTrainingRoomByKey from "./getUserTrainingRoomByKey";
import upsertClientBookkeeping from "./upsertClientBookkeeping";
import upsertClientDevelop from "./upsertClientDevelop";
import upsertClientError from "./upsertClientError";
import upsertClientSetting from "./upsertClientSetting";
import upsertClientTestmode from "./upsertClientTestmode";
import upsertUserAll from "./upsertUserAll";
import upsertUserGplog from "./upsertUserGplog";
import createSqlWrapper from "../sql";
import { DataSource } from "../../sql";

const debug = logger("app:ongeki:io");

// Thankfully we can use standard middleware for JSON I/O. We have to use a
// zlib middleware as well because response compression is required if the
// request was sent compressed and Ongeki will attempt to inflate whatever
// response we send to it whether there is a `Content-Encoding` header or not.

function quirks(req: Request, res: Response, next: NextFunction) {
  // Ongeki client does not follow the HTTP spec: user agents must indicate
  // that they are willing to accept a particular Transfer-Encoding for that
  // T-E to be used (unless the T-E in question is "chunked" but w/e), and this
  // indication is advisory anyway, the server is permitted to ignore it.
  //
  // Force this header into the request, since it is not present normally.

  // ... unless, that is, the client is actually somebody debugging with curl
  // and not the real game client, in which case this forced deflate can be
  // annoying. Pass an "X-Debug" request header to suppress forced compression.

  if (req.headers["x-debug"] === undefined) {
    req.headers["accept-encoding"] = "deflate";
  }

  return next();
}

function trace(req: Request, res: Response, next: NextFunction) {
  debug("\n--- Ongeki %s ---\n", req.url);
  debug("Request: %j", req.body);

  const prevJson = res.json;

  res.json = function(obj) {
    debug("Response: %j", obj);

    res.json = prevJson;
    res.json.apply(this, arguments);

    return res;
  };

  return next();
}

export default function ongeki(db: DataSource) {
  const wrapper = createSqlWrapper(db);

  wrapper.rpc("/ExtendLockTimeApi", extendLockTime);
  wrapper.rpc("/GameLoginApi", gameLogin);
  wrapper.rpc("/GameLogoutApi", gameLogout);
  wrapper.rpc("/GetGameEventApi", getGameEvent);
  wrapper.rpc("/GetGameIdlistApi", getGameIdlist);
  wrapper.rpc("/GetGameMessageApi", getGameMessage);
  wrapper.rpc("/GetGamePresentApi", getGamePresent);
  wrapper.rpc("/GetGamePointApi", getGamePoint);
  wrapper.rpc("/GetGameRankingApi", getGameRanking);
  wrapper.rpc("/GetGameRewardApi", getGameReward);
  wrapper.rpc("/GetGameSaleApi", getGameSale);
  wrapper.rpc("/GetGameSettingApi", getGameSetting);
  wrapper.rpc("/GetUserActivityApi", getUserActivity);
  wrapper.rpc("/GetUserBpBaseApi", getUserBpBase);
  wrapper.rpc("/GetUserCardApi", getUserCard);
  wrapper.rpc("/GetUserChapterApi", getUserChapter);
  wrapper.rpc("/GetUserCharacterApi", getUserCharacter);
  wrapper.rpc("/GetUserDataApi", getUserData);
  wrapper.rpc("/GetUserDeckByKeyApi", getUserDeckByKey);
  wrapper.rpc("/GetUserEventPointApi", getUserEventPoint);
  wrapper.rpc("/GetUserEventRankingApi", getUserEventRanking);
  wrapper.rpc("/GetUserItemApi", getUserItem);
  wrapper.rpc("/GetUserLoginBonusApi", getUserLoginBonus);
  wrapper.rpc("/GetUserMissionPointApi", getUserMissionPoint);
  wrapper.rpc("/GetUserMusicApi", getUserMusic);
  wrapper.rpc("/GetUserMusicItemApi", getUserMusicItem);
  wrapper.rpc("/GetUserOptionApi", getUserOption);
  wrapper.rpc("/GetUserPreviewApi", getUserPreview);
  wrapper.rpc("/GetUserRatinglogApi", getUserRatinglog);
  wrapper.rpc("/GetUserRecentRatingApi", getUserRecentRating);
  wrapper.rpc("/GetUserRegionApi", getUserRegion);
  wrapper.rpc("/GetUserStoryApi", getUserStory);
  wrapper.rpc("/GetUserTrainingRoomByKeyApi", getUserTrainingRoomByKey);
  wrapper.rpc("/UpsertClientBookkeepingApi", upsertClientBookkeeping);
  wrapper.rpc("/UpsertClientDevelopApi", upsertClientDevelop);
  wrapper.rpc("/UpsertClientErrorApi", upsertClientError);
  wrapper.rpc("/UpsertClientSettingApi", upsertClientSetting);
  wrapper.rpc("/UpsertClientTestmodeApi", upsertClientTestmode);
  wrapper.rpc("/UpsertUserAllApi", upsertUserAll);
  wrapper.rpc("/UpsertUserGplogApi", upsertUserGplog);

  const app = express();

  app.use(quirks);
  app.use(compression({ threshold: 0 }));
  app.use(express.json({ limit: "50mb" })); // that ought to be enough
  app.use(trace);

  app.use("/", wrapper);

  return app;
}
