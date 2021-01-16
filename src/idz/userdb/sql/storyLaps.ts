import sql from "sql-bricks-postgres";

import { StoryLaps } from "../model/story";
import { Profile } from "../model/profile";
import { StoryLapsRepository } from "../repo";
import { Id } from "../../../model";
import { Row, Transaction } from "../../../sql";

function _extractLapRow(row: Row): StoryLaps {
  return {
    chapter: parseInt(row.chapter!),
    lap: parseInt(row.lap!),
  };
}

export class SqlStoryLapsRepository implements StoryLapsRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<StoryLaps[]> {
    const loadSql = sql
      .select("sl.chapter", "sl.lap")
      .from("idz_story_laps sl")
      .where("sl.profile_id", profileId);

    const rows = await this._txn.fetchRows(loadSql);

    return rows.map(_extractLapRow);
  }

  async save(profileId: Id<Profile>, laps: StoryLaps[]): Promise<void> {
    for (let i = 0; i < laps.length; i++) {
      const saveSql = sql
        .insert("idz_story_laps", {
          id: this._txn.generateId(),
          profile_id: profileId,
          chapter: laps[i].chapter,
          lap: laps[i].lap,
        })
        .onConflict("profile_id", "chapter")
        .doUpdate(["lap"]);

      await this._txn.modify(saveSql);
    }
  }
}
