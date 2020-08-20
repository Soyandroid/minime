export interface UserPlaylogItem {
  sortNumber: number;

  /** ALLNet place ID */
  placeId: number;

  /** ALLNet place name */
  placeName: string;

  playDate: Date;
  userPlayDate: Date;
  musicId: number;
  level: number;
  playKind: number;
  eventId: number;
  eventName: string;
  eventPoint: number;
  playedUserId1: number;
  playedUserId2: number;
  playedUserId3: number;
  playedUserName1: string;
  playedUserName2: string;
  playedUserName3: string;
  playedMusicLevel1: number;
  playedMusicLevel2: number;
  playedMusicLevel3: number;
  cardId1: number;
  cardId2: number;
  cardId3: number;
  cardLevel1: number;
  cardLevel2: number;
  cardLevel3: number;
  cardAttack1: number;
  cardAttack2: number;
  cardAttack3: number;
  bossCharaId: number;
  bossLevel: number;
  bossAttribute: number;
  clearStatus: number;
  techScore: number;
  techScoreRank: number;
  battleScore: number;
  battleScoreRank: number;
  maxCombo: number;
  judgeMiss: number;
  judgeHit: number;
  judgeBreak: number;
  judgeCriticalBreak: number;
  rateTap: number;
  rateHold: number;
  rateFlick: number;
  rateSideTap: number;
  rateSideHold: number;
  bellCount: number;
  totalBellCount: number;
  damageCount: number;
  overDamage: number;
  isTechNewRecord: boolean;
  isBattleNewRecord: boolean;
  isOverDamageNewRecord: boolean;
  isFullCombo: boolean;
  isFullBell: boolean;
  isAllBreak: boolean;
  playerRating: number;
  battlePoint: number;
}
