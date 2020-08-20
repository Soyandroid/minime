import sql from "sql-bricks-postgres";

import { UserRatinglogItem } from "../model/userRatinglog";
import { UserDataItem } from "../model/userData";
import { Page } from "../repo";
import { UserRatinglogRepository } from "../repo/userRatinglog";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  dataVersion: T.string,
  highestRating: T.number,
});

export class SqlUserRatinglogRepository implements UserRatinglogRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserRatinglogItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_ratinglog c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserRatinglogItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_ratinglog", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "data_version")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
