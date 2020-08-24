import { LoadTeamRankingResponse } from "../response/loadTeamRanking";
import iconv from "iconv-lite";

export function loadTeamRanking(res: LoadTeamRankingResponse): Buffer {
  const buf = Buffer.alloc(0x0ba0);

  buf.writeUInt16LE(0x00a8, 0x0000);

  return buf;
}
