export interface UserDataItem {
  /** NFC LUID */
  accessCode: string;

  /** Uses wide latin chars */
  userName: string;

  level: number;
  reincarnationNum: number;
  exp: bigint;
  point: bigint;
  totalPoint: bigint;
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
  sumTechHighScore: bigint;
  sumTechBasicHighScore: bigint;
  sumTechAdvancedHighScore: bigint;
  sumTechExpertHighScore: bigint;
  sumTechMasterHighScore: bigint;
  sumTechLunaticHighScore: bigint;
  sumBattleHighScore: bigint;
  sumBattleBasicHighScore: bigint;
  sumBattleAdvancedHighScore: bigint;
  sumBattleExpertHighScore: bigint;
  sumBattleMasterHighScore: bigint;
  sumBattleLunaticHighScore: bigint;
  eventWatchedDate: Date;
  firstGameId: string;
  firstRomVersion: string;
  firstDataVersion: string;
  firstPlayDate: Date;
  lastGameId: string;
  lastRomVersion: string;
  lastDataVersion: string;
  compatibleCmVersion: string;
  lastPlayDate: Date;

  /** ALLNet place ID */
  lastPlaceId: number;

  /** ALLNet place name */
  lastPlaceName: string;

  /** ALLNet "region0" */
  lastRegionId: string;

  /** ALLNet "region_name0" */
  lastRegionName: string;

  /** ALLNet "allnet_id" string */
  lastAllNetId: string;

  /** Keychip ID */
  lastClientId: string;

  lastUsedDeckId: number;
  lastPlayMusicLevel: number;
}
