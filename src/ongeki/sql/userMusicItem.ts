import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserMusicItemItem } from "../model/userMusicItem";
import { Page } from "../repo";
import { UserMusicItemRepository } from "../repo/userMusicItem";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  musicId: T.number,
  status: T.number,
});

export class SqlUserMusicItemRepository implements UserMusicItemRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserMusicItemItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_music_item c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  async loadOne(
    profileId: Id<UserDataItem>,
    musicId: number
  ): Promise<UserMusicItemItem> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_music_item c")
      .where("c.profile_id", profileId)
      .where("c.music_id", musicId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("Database corrupted: selected music item not found");
    }

    return readRow(row);
  }

  save(profileId: Id<UserDataItem>, obj: UserMusicItemItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_music_item", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "music_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
