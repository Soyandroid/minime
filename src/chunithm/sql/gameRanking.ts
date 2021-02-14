import sql from "sql-bricks-postgres";
import { createSqlMapper, T } from "../../sql/util";
import { GameRankingRepository } from "../repo/gameRanking";
import { GameRankingItem } from "../model/gameRanking";
import { Transaction } from "../../sql";

const { readRow, writeRow, colNames } = createSqlMapper({
  id: T.number,
  point: T.number,
});

export class SqlGameRankingRepository implements GameRankingRepository {
  constructor(private readonly _txn: Transaction) {}

  async load(): Promise<GameRankingItem[]> {
    const stmt = sql
      .select("music_id AS id, COUNT(music_id) AS point")
      .from("cm_user_playlog")
      .where(sql.lt("level", 4)) //filter out WORLD'S END
      .groupBy("music_id")
      .orderBy("point DESC")
      .limit(10);

    const rows = await this._txn.fetchRows(stmt);

    return rows.map(readRow);
  }
}
