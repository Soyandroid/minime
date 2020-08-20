import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserBpBaseItem } from "../model/userBpBase";
import { Page } from "../repo";
import { UserBpBaseRepository } from "../repo/userBpBase";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  musicId: T.number,
  difficultId: T.number,
  romVersionCode: T.number,
  score: T.number,
});

export class SqlUserBpBaseRepository implements UserBpBaseRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserBpBaseItem[]> {
    const stmt = sql
      .select("*")
      .from("mu3_user_bp_base")
      .where("profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserBpBaseItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_bp_base", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "music_id", "difficult_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
