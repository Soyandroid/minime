import sql from "sql-bricks-postgres";

import { UserTrainingRoomItem } from "../model/userTrainingRoom";
import { UserDataItem } from "../model/userData";
import { Page } from "../repo";
import { UserTrainingRoomRepository } from "../repo/userTrainingRoom";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  authKey: T.string,
  userId: T.number,
  roomId: T.number,
  cardId: T.number,
  valueDate: T.nullable(T.Date),
});

export class SqlUserTrainingRoomRepository implements UserTrainingRoomRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(
    profileId: Id<UserDataItem>,
    page?: Page | undefined
  ): Promise<UserTrainingRoomItem[]> {
    const stmt = sql
      .select("c.*")
      .from("mu3_user_training_room c")
      .where("c.profile_id", profileId);

    if (page) {
      stmt.limit(page.limit).offset(page.offset);
    }

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }

  save(profileId: Id<UserDataItem>, obj: UserTrainingRoomItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_training_room", {
        id: this._txn.generateId(),
        profile_id: profileId,
        ...writeRow(obj),
      })
      .onConflict("profile_id", "room_id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
