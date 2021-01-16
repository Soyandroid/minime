import { encodeBitmap } from "./_bitmap";
import { encodeCar } from "./_car";
import { encodeChara2 } from "./_chara";
import { encodeMission } from "./_mission";
import { LoadProfileResponse } from "../response/loadProfile";
import { writeSjisStr } from "../../util/bin";

export function loadProfile5(res: LoadProfileResponse) {
  const buf = Buffer.alloc(0x1640);

  buf.writeUInt16LE(0x0141, 0x0000);
  buf.writeUInt16LE(res.lv, 0x9cc);
  buf.writeUInt32LE(res.exp, 0x9d0);
  buf.writeUInt32LE(res.dpoint, 0x9e8);
  buf.writeUInt32LE(res.fame, 0xa04);
  buf.writeUInt32LE(res.aimeId, 0x9b8);
  buf.writeUInt32LE(res.teamId || 0xffffffff, 0xf3c);
  buf.writeUInt32LE(res.mileage, 0x9bc);
  encodeMission(res.missions.solo).copy(buf, 0xd7c);
  encodeChara2(res.chara).copy(buf, 0xda4);
  encodeBitmap(res.titles, 0x177).copy(buf, 0xdba);
  buf.writeUInt32LE(res.settings.pack, 0x9d8);
  buf.writeUInt8(res.settings.aura, 0xf33);
  buf.writeUInt8(res.settings.paperCup, 0xf36);
  buf.writeUInt8(res.settings.gauges, 0xf37);
  buf.writeUInt8(res.settings.drivingStyle, 0x1460);
  buf.writeUInt16LE(res.settings.music, 0x9c8);
  writeSjisStr(buf, 0x9ee, 0xa0e, res.name);
  encodeCar(res.car).copy(buf, 0x1568);
  buf.writeUInt32LE(res.carCount, 0x1564);
  buf.writeUInt16LE(res.unlocks.auras, 0x00b0);
  buf.writeUInt8(res.unlocks.cup, 0x00b4);
  buf.writeUInt32LE(res.unlocks.gauges, 0x00b8);
  buf.writeUInt32LE(res.unlocks.lastMileageReward, 0x0218);
  buf.writeUInt16LE(res.unlocks.music, 0x021c);
  buf.writeUInt16LE(res.teamLeader ? 1 : 0, 0x97c);

  // Weekly Missions
  buf.writeUInt32LE(
    (new Date(res.weeklyMissions.weeklyReset).getTime() / 1000) | 0,
    0x1344
  );
  buf.writeUInt16LE(res.weeklyMissions.weeklyMissionLeft, 0x1336);
  buf.writeUInt16LE(res.weeklyMissions.weeklyProgressLeft, 0x1338);
  buf.writeUInt16LE(res.weeklyMissions.weeklyParamsLeft, 0x133a);
  buf.writeUInt16LE(res.weeklyMissions.weeklyMissionRight, 0x133c);
  buf.writeUInt16LE(res.weeklyMissions.weeklyProgressRight, 0x133e);
  buf.writeUInt16LE(res.weeklyMissions.weeklyParamsRight, 0x1340);

  // send twice, once as new stamps, once as old stamps,
  // because we don't keep track of the "new!" state.
  encodeBitmap(res.stamps, 0x26).copy(buf, 0x13d4);
  encodeBitmap(res.stamps, 0x26).copy(buf, 0x13fa);

  // Tutorials
  const tutorials = res.tutorials;
  buf.writeUInt16LE(tutorials.chapter01, 0x142c);
  buf.writeUInt16LE(tutorials.chapter02, 0x1430);
  buf.writeUInt16LE(tutorials.chapter02, 0x1434);

  // Selected Stamps
  const selectedStamps = res.selectedStamps;
  buf.writeUInt16LE(selectedStamps.stamp01, 0x1420);
  buf.writeUInt16LE(selectedStamps.stamp02, 0x1422);
  buf.writeUInt16LE(selectedStamps.stamp03, 0x1424);
  buf.writeUInt16LE(selectedStamps.stamp04, 0x1426);

  // EX TICKETS TEST
  // buf.writeUInt32BE(0xc0fffd5f, 0x1444); EX TICKET DATE
  // buf.writeUInt8(0x05, 0x1448); EX TICKET AMOUNT

  const { freeCar, freeContinue } = res.tickets;

  if (freeCar) {
    buf.writeUInt32LE((freeCar.validFrom.getTime() / 1000) | 0, 0x0214);
  }

  if (freeContinue) {
    buf.writeUInt32LE((freeContinue.validFrom.getTime() / 1000) | 0, 0x9dc);
    buf.writeUInt32LE((freeContinue.validTo.getTime() / 1000) | 0, 0x9e0);
  }

  // Course plays
  for (const [courseId, playCount] of res.coursePlays.entries()) {
    if (courseId < 0 || courseId >= 20) {
      throw new Error(`Course id out of range: ${courseId}`);
    }

    buf.writeUInt16LE(playCount, 0xa60 + 2 * courseId);
  }

  for (const score of res.timeAttack) {
    const { routeNo } = score;

    buf.writeUInt32LE(
      (new Date(score.timestamp).getTime() / 1000) | 0, // Date ctor hack
      0x00e4 + routeNo * 4
    );

    buf.writeUInt16LE(0xffff, 0x0184 + 2 * routeNo); // National rank
    buf.writeUInt32LE((score.totalTime * 1000) | 0, 0xb00 + 4 * routeNo); // Total Time in MSEC
    buf.writeUInt8(score.flags, 0xbf0 + routeNo); // FLAGS
    buf.writeUInt8(score.grade, 0xd08 + routeNo); // MEDALS

    for (let i = 0; i < 3; i++) {
      buf.writeUInt16LE(
        (score.sectionTimes[i] * 1000) >> 2,
        0xc18 + 6 * routeNo + 2 * i // SECTION TIMES
      );
    }
  }

  // the format has changed quite a bit in v2
  // seems like it's just split into the big chapters now
  // with more cells of course, enough space for 30ish
  // the biggest chapter is chapter 1 with a total of 22 races
  // but for "security" let's go with up to 28
  // first two bytes at the start seem to declare the chapter number

  // 6 in 2.12, 11 in 2.3?
  for (let i = 0; i < 11; i++) {
    // 11 or 10? hm
    const row = res.story.rows.get(i);
    const rowOffset = 0x0258 + i * 0x7a;

    let lap = 0;
    if (res.storyLaps[i] !== undefined) {
      lap = res.storyLaps[i].lap;
    }

    buf.writeUInt8(lap, rowOffset - 0x1);

    if (row === undefined) {
      continue;
    }

    for (let j = 0; j < 28; j++) {
      const cell = row.cells.get(j);
      // Four bytes per column
      const cellOffset = rowOffset + j * 4;

      if (cell === undefined) {
        continue;
      }

      buf.writeUInt8(cell.a, cellOffset + 0);
      buf.writeUInt8(cell.b, cellOffset + 1);
      buf.writeUInt16LE(cell.c, cellOffset + 2);
    }
  }

  buf.writeUInt8(res.story.y, 0xd30);
  buf.writeUInt16LE(res.story.x, 0xd4c);

  return buf;
}
