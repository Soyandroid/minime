import sql from "sql-bricks-postgres";

import { UserMissionPointItem } from "../model/userMissionPoint";
import { UserDataItem } from "../model/userData";
import { Page } from "../repo";
import { UserMissionPointRepository } from "../repo/userMissionPoint";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  eventId: T.number,
  point: T.bigint,
});

export class SqlUserMissionPointRepository implements UserMissionPointRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserMissionPointItem[]> {
    const stmt = sql
      .select("*")
      .from("mu3_user_mission_point")
      .where("profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserMissionPointItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_mission_point", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "event_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
