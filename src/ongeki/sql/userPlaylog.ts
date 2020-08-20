import sql from "sql-bricks-postgres";

import { Id } from "../../model";
import { UserDataItem } from "../model/userData";
import { UserPlaylogItem } from "../model/userPlaylog";
import { UserPlaylogRepository } from "../repo/userPlaylog";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow } = createSqlMapper({
  sortNumber: T.number,
  placeId: T.number,
  placeName: T.string,
  playDate: T.Date,
  userPlayDate: T.Date,
  musicId: T.number,
  level: T.number,
  playKind: T.number,
  eventId: T.number,
  eventName: T.string,
  eventPoint: T.number,
  playedUserId1: T.number,
  playedUserId2: T.number,
  playedUserId3: T.number,
  playedUserName1: T.string,
  playedUserName2: T.string,
  playedUserName3: T.string,
  playedMusicLevel1: T.number,
  playedMusicLevel2: T.number,
  playedMusicLevel3: T.number,
  cardId1: T.number,
  cardId2: T.number,
  cardId3: T.number,
  cardAttack1: T.number,
  cardAttack2: T.number,
  cardAttack3: T.number,
  bossCharaId: T.number,
  bossLevel: T.number,
  bossAttribute: T.number,
  clearStatus: T.number,
  techScore: T.number,
  techScoreRank: T.number,
  battleScore: T.number,
  battleScoreRank: T.number,
  maxCombo: T.number,
  judgeMiss: T.number,
  judgeHit: T.number,
  judgeBreak: T.number,
  judgeCriticalBreak: T.number,
  rateTap: T.number,
  rateHold: T.number,
  rateSideTap: T.number,
  rateSideHold: T.number,
  bellCount: T.number,
  totalBellCount: T.number,
  damageCount: T.number,
  isTechNewRecord: T.boolean,
  isBattleNewRecord: T.boolean,
  isOverDamageNewRecord: T.boolean,
  isFullCombo: T.boolean,
  isFullBell: T.boolean,
  isAllBreak: T.boolean,
  playerRating: T.number,
  battlePoint: T.number,
});

export class SqlUserPlaylogRepository implements UserPlaylogRepository {
  constructor(private readonly _txn: Transaction) {}

  save(profileId: Id<UserDataItem>, obj: UserPlaylogItem): Promise<void> {
    const stmt = sql.insert("mu3_user_playlog", {
      id: this._txn.generateId(),
      profile_id: profileId,
      ...writeRow(obj),
    });

    return this._txn.modify(stmt);
  }
}
