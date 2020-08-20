import { Crush, readDate, writeObject } from "./base";
import { UserDataItem } from "../model/userData";

export interface UserDataJson {
  /** NFC LUID */
  accessCode: string;

  /** Uses wide latin chars */
  userName: string;

  level: number;
  reincarnationNum: number;
  exp: number;
  point: number;
  totalPoint: number;
  playCount: number;
  jewelCount: number;
  totalJewelCount: number;
  playerRating: number;
  highestRating: number;
  battlePoint: number;
  nameplateId: number;
  trophyId: number;
  cardId: number;
  characterId: number;
  tabSetting: number;
  tabSortSetting: number;
  cardCategorySetting: number;
  cardSortSetting: number;
  playedTutorialBit: number;
  firstTutorialCancelNum: number;
  sumTechHighScore: number;
  sumTechBasicHighScore: number;
  sumTechAdvancedHighScore: number;
  sumTechExpertHighScore: number;
  sumTechMasterHighScore: number;
  sumTechLunaticHighScore: number;
  sumBattleHighScore: number;
  sumBattleBasicHighScore: number;
  sumBattleAdvancedHighScore: number;
  sumBattleExpertHighScore: number;
  sumBattleMasterHighScore: number;
  sumBattleLunaticHighScore: number;
  eventWatchedDate: string;
  firstGameId: string;
  firstRomVersion: string;
  firstDataVersion: string;
  firstPlayDate: string;
  lastGameId: string;
  lastRomVersion: string;
  lastDataVersion: string;
  compatibleCmVersion: string;
  lastPlayDate: string;

  /** ALLNet place ID */
  lastPlaceId: number;

  /** ALLNet place name */
  lastPlaceName: string;

  /** ALLNet "region0" */
  lastRegionId: number;

  /** ALLNet "region_name0" */
  lastRegionName: string;

  /** ALLNet "allnet_id" */
  lastAllNetId: number;

  /** Keychip ID */
  lastClientId: string;

  lastUsedDeckId: number;
  lastPlayMusicLevel: number;
}

export type UserDataResponseJson = Crush<UserDataItem>;

export function readUserData(json: UserDataJson): UserDataItem {
  return {
    accessCode: json.accessCode,
    userName: json.userName,
    level: json.level,
    reincarnationNum: json.reincarnationNum,
    exp: BigInt(json.exp),
    point: BigInt(json.point),
    totalPoint: BigInt(json.totalPoint),
    playCount: json.playCount,
    jewelCount: json.jewelCount,
    totalJewelCount: json.totalJewelCount,
    playerRating: json.playerRating,
    highestRating: json.highestRating,
    battlePoint: json.battlePoint,
    nameplateId: json.nameplateId,
    trophyId: json.trophyId,
    cardId: json.cardId,
    characterId: json.characterId,
    tabSetting: json.tabSetting,
    tabSortSetting: json.tabSortSetting,
    cardCategorySetting: json.cardCategorySetting,
    cardSortSetting: json.cardSortSetting,
    playedTutorialBit: json.playedTutorialBit,
    firstTutorialCancelNum: json.firstTutorialCancelNum,
    sumTechHighScore: BigInt(json.sumTechHighScore),
    sumTechBasicHighScore: BigInt(json.sumTechBasicHighScore),
    sumTechAdvancedHighScore: BigInt(json.sumTechAdvancedHighScore),
    sumTechExpertHighScore: BigInt(json.sumTechExpertHighScore),
    sumTechMasterHighScore: BigInt(json.sumTechMasterHighScore),
    sumTechLunaticHighScore: BigInt(json.sumTechLunaticHighScore),
    sumBattleHighScore: BigInt(json.sumBattleHighScore),
    sumBattleBasicHighScore: BigInt(json.sumBattleBasicHighScore),
    sumBattleAdvancedHighScore: BigInt(json.sumBattleAdvancedHighScore),
    sumBattleExpertHighScore: BigInt(json.sumBattleExpertHighScore),
    sumBattleMasterHighScore: BigInt(json.sumBattleMasterHighScore),
    sumBattleLunaticHighScore: BigInt(json.sumBattleLunaticHighScore),
    eventWatchedDate: readDate(json.eventWatchedDate),
    firstGameId: json.firstGameId,
    firstRomVersion: json.firstRomVersion,
    firstDataVersion: json.firstDataVersion,
    firstPlayDate: readDate(json.firstPlayDate)!,
    lastGameId: json.lastGameId,
    lastRomVersion: json.lastRomVersion,
    lastDataVersion: json.lastDataVersion,
    compatibleCmVersion: json.compatibleCmVersion,
    lastPlayDate: readDate(json.lastPlayDate)!,
    lastPlaceId: json.lastPlaceId,
    lastPlaceName: json.lastPlaceName,
    lastRegionId: json.lastRegionId,
    lastRegionName: json.lastRegionName,
    lastAllNetId: json.lastAllNetId,
    lastClientId: json.lastClientId,
    lastUsedDeckId: json.lastUsedDeckId,
    lastPlayMusicLevel: json.lastPlayMusicLevel,
  };
}

export function writeUserData(obj: UserDataItem): UserDataResponseJson {
  return writeObject(obj);
}
