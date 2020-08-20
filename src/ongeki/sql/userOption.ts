import sql from "sql-bricks-postgres";

import { UserDataItem } from "../model/userData";
import { UserOptionItem } from "../model/userOption";
import { UserOptionRepository } from "../repo/userOption";
import { Id } from "../../model";
import { Transaction } from "../../sql";
import { T, createSqlMapper } from "../../sql/util";

const { readRow, writeRow, colNames } = createSqlMapper({
  optionSet: T.number,
  speed: T.number,
  mirror: T.number,
  judgeTiming: T.number,
  abort: T.number,
  tapSound: T.number,
  volGuide: T.number,
  volAll: T.number,
  volTap: T.number,
  volCrTap: T.number,
  volHold: T.number,
  volSide: T.number,
  volFlick: T.number,
  volBell: T.number,
  volEnemy: T.number,
  volSkill: T.number,
  volDamage: T.number,
  colorField: T.number,
  colorLaneBright: T.number,
  colorLane: T.number,
  colorSide: T.number,
  effectDamage: T.number,
  effectPos: T.number,
  judgeDisp: T.number,
  judgePos: T.number,
  judgeBreak: T.number,
  judgeHit: T.number,
  matching: T.number,
  dispPlayerLv: T.number,
  dispRating: T.number,
  dispBP: T.number,
  headphone: T.number,
});

export class SqlUserOptionRepository implements UserOptionRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(dataId: Id<UserDataItem>): Promise<UserOptionItem> {
    const stmt = sql
      .select("*")
      .from("mu3_user_option")
      .where("id", dataId);

    const row = await this._txn.fetchRow(stmt);

    if (row === undefined) {
      throw new Error("UserOption record not found");
    }

    return readRow(row);
  }

  save(profileId: Id<UserDataItem>, obj: UserOptionItem): Promise<void> {
    const stmt = sql
      .insert("mu3_user_option", {
        id: profileId,
        ...writeRow(obj),
      })
      .onConflict("id")
      .doUpdate(colNames);

    return this._txn.modify(stmt);
  }
}
