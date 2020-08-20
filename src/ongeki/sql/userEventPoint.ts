import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserEventPointItem } from "../model/userEventPoint";
import { Page } from "../repo";
import { UserEventPointRepository } from "../repo/userEventPoint";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  eventId: T.number,
  point: T.number,
  isRankingRewarded: T.boolean,
});

export class SqlUserEventPointRepository implements UserEventPointRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserEventPointItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_event_point c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserEventPointItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_event_point", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "event_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
