import iconv from "iconv-lite";
import logger from "debug";

import { CreateAutoTeamResponse } from "../response/createAutoTeam";
import { LoadTeamResponse } from "../response/loadTeam";
import { encodeChara } from "./_chara";
const debug = logger("app:idz:encoder");

export function _team(res: CreateAutoTeamResponse | LoadTeamResponse) {
  const buf = Buffer.alloc(0x0ca0);

  if (res.type === "create_auto_team_res") {
    buf.writeInt16LE(0x0078, 0x0000);
  } else {
    buf.writeInt16LE(0x0074, 0x0000);
  }

  const leader = res.members.find(item => item.leader === true);

  debug("Team Leader Name: %j", leader ? leader.profile.name : "Error\0");
  buf.writeUInt32LE(res.team.extId, 0x000c);
  iconv.encode(leader ? leader.profile.name : "Error\0", "shift_jis").copy(buf, 0x0010);
  iconv.encode(res.team.name, "shift_jis").copy(buf, 0x0024);
  iconv.encode(process.env.SHOP_NAME ? process.env.SHOP_NAME : "\0", "shift_jis").copy(buf, 0x0044);
  buf.writeUInt32LE(res.team.nameBg, 0x00d8);
  buf.writeUInt32LE(res.team.nameFx, 0x00dc);
  buf.fill(0xff, 0x00e0, 0x00f9); // Bitset: Unlocked BGs probably
  buf.fill(0xff, 0x00f9, 0x0101); // Bitset: Unlocked FX probably
  buf.writeUInt32LE(leader ? leader.profile.aimeId : 0, 0x0080);

  for (let i = 0; i < 6; i++) {
    const base = 0x0120 + i * 0x005c;
    const member = res.members[i];

    if (member === undefined) {
      break;
    }

    const { profile, chara } = member;
    const accessTime = (profile.accessTime.getTime() / 1000) | 0;

    buf.writeInt32LE(profile.aimeId, base + 0x0000);
    iconv.encode(profile.name + "\0", "shift_jis").copy(buf, base + 0x0004);
    buf.writeInt32LE(profile.lv, base + 0x0018);
    buf.writeUInt32LE(accessTime, base + 0x0034);
    encodeChara(chara).copy(buf, base + 0x0044);
  }

  return buf;
}
