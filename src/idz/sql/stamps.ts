import sql from "sql-bricks-postgres";

import { StampCode } from "../model/base";
import { SelectedStamps } from "../model/stamps";
import { Profile } from "../model/profile";
import { StampsRepository } from "../repo";
import { Id } from "../../model";
import { Row, Transaction } from "../../sql";

function _extractSelectionRow(row: Row): SelectedStamps {
  return {
    stamp01: parseInt(row.stamp_01!),
    stamp02: parseInt(row.stamp_02!),
    stamp03: parseInt(row.stamp_03!),
    stamp04: parseInt(row.stamp_04!),
  };
};

export class SqlStampsRepository
  implements StampsRepository {
  constructor(private readonly _txn: Transaction) { }

  async loadAll(id: Id<Profile>): Promise<Set<StampCode>> {
    const loadSql = sql
      .select("stamp.stamp_no")
      .from("idz_stamp_unlock stamp")
      .join("idz_profile p", { "stamp.profile_id": "p.id" })
      .where("p.id", id);

    const rows = await this._txn.fetchRows(loadSql);
    const result = new Set<StampCode>();

    for (const row of rows) {
      result.add(parseInt(row.stamp_no!) as StampCode);
    }

    return result;
  }

  async loadSelection(id: Id<Profile>): Promise<SelectedStamps> {
    const loadSql = sql
      .select("stamp.*")
      .from("idz_stamp_selection stamp")
      .join("idz_profile p", { "stamp.profile_id": "p.id" })
      .where("p.id", id);

    const row = await this._txn.fetchRow(loadSql);

    const emptyResult: SelectedStamps = { 'stamp01': 0, 'stamp02': 0, 'stamp03': 0, 'stamp04': 0 };

    if (row === undefined) {
      //throw new Error(`Stamp selection not found, profileId=${id}`);
      return emptyResult;
    }

    return _extractSelectionRow(row);
  }

  async saveSelection(profileId: Id<Profile>, selection: SelectedStamps): Promise<void> {
    const saveSql = sql
      .insert("idz_stamp_selection", {
        id: this._txn.generateId(),
        profile_id: profileId,
        stamp_01: selection.stamp01,
        stamp_02: selection.stamp02,
        stamp_03: selection.stamp03,
        stamp_04: selection.stamp04,
      })
      .onConflict("profile_id")
      .doUpdate([
        "stamp_01",
        "stamp_02",
        "stamp_03",
        "stamp_04",
      ]);

    await this._txn.modify(saveSql);
  }

  async saveAll(
    profileId: Id<Profile>,
    flags: Set<StampCode>
  ): Promise<void> {
    const existing = await this.loadAll(profileId);

    for (const flag of flags) {
      if (existing.has(flag)) {
        continue;
      }

      const saveSql = sql.insert("idz_stamp_unlock", {
        id: this._txn.generateId(),
        profile_id: profileId,
        stamp_no: flag,
      });

      await this._txn.modify(saveSql);
    }
  }
}
