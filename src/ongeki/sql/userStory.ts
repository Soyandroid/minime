import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserStoryItem } from "../model/userStory";
import { Page } from "../repo";
import { UserStoryRepository } from "../repo/userStory";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  storyId: T.number,
  lastChapterId: T.number,
});

export class SqlUserStoryRepository implements UserStoryRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserStoryItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_story c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserStoryItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_story", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "story_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
