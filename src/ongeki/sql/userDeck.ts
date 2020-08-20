import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserDeckItem } from "../model/userDeck";
import { Page } from "../repo";
import { UserDeckRepository } from "../repo/userDeck";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  deckId: T.number,
  cardId1: T.number,
  cardId2: T.number,
  cardId3: T.number,
});

export class SqlUserDeckRepository implements UserDeckRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserDeckItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_deck c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserDeckItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_deck", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "deck_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
