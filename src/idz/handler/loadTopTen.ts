import { LoadTopTenRequest } from "../request/loadTopTen";
import {
  LoadTopTenResponse,
  LoadTopTenResponseCourse,
  LoadTopTenResponseRow,
} from "../response/loadTopTen";
import { Repositories, TopTenResult } from "../repo";

export async function loadTopTen(
  w: Repositories,
  req: LoadTopTenRequest
): Promise<LoadTopTenResponse> {
  const courses = new Array<LoadTopTenResponseCourse>();

  for (const selector of req.selectors) {
    if (courses.length >= 3) {
      break;
    }

    const { routeNo, minTimestamp } = selector;
    var src = await w.timeAttack().loadTop(routeNo, minTimestamp, 10);

    // TLDR: If you quit out after a TA, and then look at the leaderboards it
    // will only load the last new record. Without doing this check
    // and resending all 10 records for that particular route
    // it will just override the first record.
    // not sure if you are supposed to set a flag in the response instead
    // but this way works, even if it does feel a little bit dirty.
    if (src.length === 0) {
      continue;
    } else {
      src = await w.timeAttack().loadTop(routeNo, new Date(100), 10);
    }

    const dest = new Array<LoadTopTenResponseRow>();

    for (const srcItem of src) {
      dest.push({
        field_00: 0,
        field_0E: false,
        field_0F: false,
        field_10: 0,
        driverName: srcItem.driverName,
        shopName: process.env.SHOP_NAME || "",
        team: srcItem.team,
        field_7C: 0,
        field_7D: 0,
        ta: srcItem.ta,
      });
    }

    courses.push({
      routeNo,
      field_02: 0,
      rows: dest,
    });
  }

  return {
    type: "load_top_ten_res",
    courseCount: courses.length,
    courses: courses,
    trailers: [],
  };
}
