import sql from "sql-bricks-postgres";

import { UserChapterItem } from "../model/userChapter";
import { UserDataItem } from "../model/userData";
import { Page } from "../repo";
import { UserChapterRepository } from "../repo/userChapter";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  chapterId: T.number,
  jewelCount: T.number,
  lastPlayMusicCategory: T.number,
  lastPlayMusicId: T.number,
  isStoryWatched: T.boolean,
  isClear: T.boolean,
  skipTiming1: T.number,
  skipTiming2: T.number,
});

export class SqlUserChapterRepository implements UserChapterRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserChapterItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_chapter c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserChapterItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_chapter", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "chapter_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
