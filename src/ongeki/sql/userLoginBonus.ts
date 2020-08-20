import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserLoginBonusItem } from "../model/userLoginBonus";
import { Page } from "../repo";
import { UserLoginBonusRepository } from "../repo/userLoginBonus";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  bonusId: T.number,
  bonusCount: T.number,
});

export class SqlUserLoginBonusRepository implements UserLoginBonusRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    dataId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserLoginBonusItem[]> {
    const stmt = sql
      .select("*")
      .from("mu3_user_login_bonus")
      .where("profile_id", dataId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserLoginBonusItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_login_bonus", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "bonus_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
