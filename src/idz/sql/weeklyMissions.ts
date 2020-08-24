import sql from "sql-bricks-postgres";

import { WeeklyMissions } from "../model/weeklyMissions";
import { Profile } from "../model/profile";
import { WeeklyMissionsRepository } from "../repo";
import { Id } from "../../model";
import { Transaction } from "../../sql";

export class SqlWeeklyMissionsRepository implements WeeklyMissionsRepository {
  constructor(private readonly _txn: Transaction) { }

  async loadAll(profileId: Id<Profile>): Promise<WeeklyMissions> {
    const loadSql = sql
      .select("wm.*")
      .from("idz_weekly_missions wm")
      .where("wm.profile_id", profileId);

    const row = await this._txn.fetchRow(loadSql);

    if (row === undefined) {
      const emptyResult: WeeklyMissions = { 'weeklyReset': new Date(), 'weeklyMissionLeft': 0, 'weeklyProgressLeft': 0, 'weeklyParamsLeft': 0, 'weeklyMissionRight': 0, 'weeklyProgressRight': 0, 'weeklyParamsRight': 0 };
      return emptyResult;
    }

    return {
      weeklyReset: new Date(row.weekly_reset!),
      weeklyMissionLeft: parseInt(row.mission_left!),
      weeklyProgressLeft: parseInt(row.progress_left!),
      weeklyParamsLeft: parseInt(row.params_left!),
      weeklyMissionRight: parseInt(row.mission_right!),
      weeklyProgressRight: parseInt(row.progress_right!),
      weeklyParamsRight: parseInt(row.params_right!),
    };
  }

  async saveAll(
    profileId: Id<Profile>,
    weeklyMissions: WeeklyMissions
  ): Promise<void> {
    const saveSql = sql
      .insert("idz_weekly_missions", {
        id: this._txn.generateId(),
        profile_id: profileId,
        weekly_reset: weeklyMissions.weeklyReset,
        mission_left: weeklyMissions.weeklyMissionLeft,
        progress_left: weeklyMissions.weeklyProgressLeft,
        params_left: weeklyMissions.weeklyParamsLeft,
        mission_right: weeklyMissions.weeklyMissionRight,
        progress_right: weeklyMissions.weeklyProgressRight,
        params_right: weeklyMissions.weeklyParamsRight,
      })
      .onConflict("profile_id")
      .doUpdate(["weekly_reset", "mission_left", "progress_left", "params_left", "mission_right", "progress_right", "params_right"]);
    await this._txn.modify(saveSql);

  }
}
