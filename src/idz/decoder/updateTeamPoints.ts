import { UpdateTeamPointsRequest } from "../request/updateTeamPoints";

updateTeamPoints.msgCode = 0x007b;
updateTeamPoints.msgLen = 0x0010;

export function updateTeamPoints(buf: Buffer): UpdateTeamPointsRequest {
  return {
    type: "update_team_points_req",
    field_0004: buf.readUInt32LE(0x0004),
    field_0008: buf.readUInt32LE(0x0008),
  };
}
