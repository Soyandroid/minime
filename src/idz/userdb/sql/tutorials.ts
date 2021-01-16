import sql from "sql-bricks-postgres";

import { StampCode } from "../model/base";
import { Tutorials } from "../model/tutorials";
import { Profile } from "../model/profile";
import { TutorialsRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

const defaultSelection: Tutorials = {
  chapter01: 0,
  chapter02: 0,
  chapter03: 0,
};

export class SqlTutorialsRepository implements TutorialsRepository {
  constructor(private readonly _txn: Transaction) {}

  async loadAll(id: Id<Profile>): Promise<Tutorials> {
    const loadSql = sql
      .select("tutorial.*")
      .from("idz_tutorials tutorial")
      .join("idz_profile p", { "tutorial.id": "p.id" })
      .where("p.id", id);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      return { ...defaultSelection };
    }

    return {
      chapter01: parseInt(row.chapter01!),
      chapter02: parseInt(row.chapter02!),
      chapter03: parseInt(row.chapter03!),
    };
  }

  async saveAll(profileId: Id<Profile>, tutorials: Tutorials): Promise<void> {
    const saveSql = sql
      .insert("idz_tutorials", {
        id: profileId,
        chapter01: tutorials.chapter01,
        chapter02: tutorials.chapter02,
        chapter03: tutorials.chapter03,
      })
      .onConflict("id")
      .doUpdate(["chapter01", "chapter02", "chapter03"]);

    await this._txn.modify(saveSql);
  }
}
