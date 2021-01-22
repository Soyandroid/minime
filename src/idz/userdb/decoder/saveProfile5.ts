import { car } from "./_car";
import { mission } from "./_mission";
import { BackgroundCode, CourseNo, StampCode, TitleCode } from "../model/base";
import { StoryCell, StoryRow, StoryLaps } from "../model/story";
import { SaveProfileRequest } from "../request/saveProfile";
import { bitmap } from "./_bitmap";
import { AimeId } from "../../../model";

saveProfile5.msgCode = 0x0143;
saveProfile5.msgLen = 0x1190;

export function saveProfile5(buf: Buffer): SaveProfileRequest {
  const storyRows = new Map<number, StoryRow>();
  let allStoryLaps: StoryLaps[] = [];
  // Story layout got another rework in idz2
  // First two bytes per row denote the chapter, however
  // since this is in completely linear order (in 2.12) we can
  // just skip saving/reading this for our convenience.
  // DONE FOR 2.3
  for (let i = 0; i < 11; i++) {
    const cells = new Map<number, StoryCell>();
    const rowOffset = 0x026c + 0x02 + i * 0x7a;
    const newLap = buf.readUInt8(rowOffset - 0x1);
    let storyLap: StoryLaps = { chapter: i, lap: newLap };
    allStoryLaps.push(storyLap);

    for (let j = 0; j < 28; j++) {
      const a = buf.readUInt8(rowOffset + 0x00 + j * 4);
      const b = buf.readUInt8(rowOffset + 0x01 + j * 4);
      const c = buf.readUInt8(rowOffset + 0x02 + j * 4);
      const cell = { a, b, c };

      cells.set(j, cell);
    }

    const row = { cells };

    storyRows.set(i, row);
  }

  const coursePlays = new Map<CourseNo, number>();

  for (let i = 0; i < 20; i++) {
    coursePlays.set(i as CourseNo, buf.readUInt16LE(0x0ab8 + 2 * i));
  }

  const freeCar = {
    validFrom: buf.readUInt32LE(0x01fc),
  };

  const freeContinue = {
    validFrom: buf.readUInt32LE(0x0038),
    validTo: buf.readUInt32LE(0x003c),
  };

  const freeExPart = {
    validFrom: buf.readUInt32LE(0x1070),
    ticketAmount: buf.readUInt8(0x1074),
  };

  const weeklyReset = {
    endDate: buf.readUInt32LE(0x0f68),
  };

  return {
    type: "save_profile_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 3,
    lv: buf.readUInt16LE(0x0026),
    exp: buf.readUInt32LE(0x0028),
    fame: buf.readUInt32LE(0x0a60),
    dpoint: buf.readUInt32LE(0x0a5c),
    mileage: buf.readUInt32LE(0x0008),
    playstamps: buf.readUInt32LE(0x0030),
    tutorials: {
      chapter01: buf.readUInt16LE(0x1054),
      chapter02: buf.readUInt16LE(0x1058),
      chapter03: buf.readUInt16LE(0x105c),
    },
    title: buf.readUInt16LE(0x0040) as TitleCode,
    titles: bitmap(buf.slice(0x0042, 0x01b9)),
    background: buf.readUInt16LE(0x0dd8) as BackgroundCode,
    coursePlays,
    missions: {
      team: mission(buf.slice(0x0dac, 0x0dce)),
      solo: mission(buf.slice(0x0dac, 0x0dce)),
    },
    car: car(buf.slice(0x0e58, 0x0eb8)),
    story: {
      x: buf.readUInt16LE(0x0d7c),
      y: buf.readUInt8(0x0d60),
      rows: storyRows,
    },
    storyLaps: allStoryLaps,
    unlocks: {
      auras: buf.readUInt16LE(0x01d0),
      cup: buf.readUInt8(0x01d4),
      gauges: buf.readUInt32LE(0x01d8),
      music: buf.readUInt16LE(0x0204),
      lastMileageReward: buf.readUInt32LE(0x0200),
    },
    tickets: {
      freeCar:
        freeCar.validFrom !== 0
          ? {
              validFrom: new Date(freeCar.validFrom * 1000),
            }
          : undefined,
      freeContinue:
        freeContinue.validFrom !== 0 && freeContinue.validTo !== 0
          ? {
              validFrom: new Date(freeContinue.validFrom * 1000),
              validTo: new Date(freeContinue.validTo * 1000),
            }
          : undefined,
      freeExPart:
        freeExPart.validFrom !== 0 && freeExPart.ticketAmount !== 0
          ? {
              validFrom: new Date(freeExPart.validFrom * 1000),
              ticketAmount: freeExPart.ticketAmount,
            }
          : undefined,
    },
    selectedStamps: {
      stamp01: buf.readUInt16LE(0x104c) as StampCode,
      stamp02: buf.readUInt16LE(0x104e) as StampCode,
      stamp03: buf.readUInt16LE(0x1050) as StampCode,
      stamp04: buf.readUInt16LE(0x1052) as StampCode,
    },
    stamps: bitmap(buf.slice(0x1000, 0x1026)),
    settings: {
      music: buf.readUInt16LE(0x0a52),
      pack: buf.readUInt32LE(0x0034),
      aura: buf.readUInt8(0x002c),
      paperCup: buf.readUInt8(0x01b9),
      gauges: buf.readUInt8(0x01ba),
      drivingStyle: buf.readUInt8(0x1086),
    },
    weeklyMissions: {
      weeklyReset: new Date(weeklyReset.endDate * 1000),
      weeklyMissionLeft: buf.readUInt16LE(0x0f5c),
      weeklyProgressLeft: buf.readUInt16LE(0x0f5e),
      weeklyParamsLeft: buf.readUInt16LE(0x0f60),
      weeklyMissionRight: buf.readUInt16LE(0x0f62),
      weeklyProgressRight: buf.readUInt16LE(0x0f64),
      weeklyParamsRight: buf.readUInt16LE(0x0f66),
    },
  };
}
