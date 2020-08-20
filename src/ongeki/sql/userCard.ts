import sql from "sql-bricks-postgres";

import { UserCardItem } from "../model/userCard";
import { UserDataItem } from "../model/userData";
import { Page } from "../repo";
import { UserCardRepository } from "../repo/userCard";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  cardId: T.number,
  digitalStock: T.number,
  analogStock: T.number,
  level: T.number,
  maxLevel: T.number,
  exp: T.number,
  printCount: T.number,
  useCount: T.number,
  isNew: T.boolean,
  kaikaDate: T.nullable(T.Date),
  choKaikaDate: T.nullable(T.Date),
  skillId: T.number,
  isAcquired: T.boolean,
  created: T.Date,
});

export class SqlUserCardRepository implements UserCardRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserCardItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_card c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserCardItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_card", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "card_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
