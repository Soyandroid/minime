import iconv from "iconv-lite";

import { UpdateExpeditionResponse } from "../response/updateExpedition";

export function updateExpedition(res: UpdateExpeditionResponse) {
  var buf = Buffer.alloc(0x040);
  const v2offset = 0x02
  if (res.expeditionType == 0) {
    buf.writeInt16LE(1, 0x0000);

  } else {
    buf = Buffer.alloc(0x19F0);
    buf.writeInt16LE(0x0140, 0x0000);
    // Experiments used to live here, removed because they're a not-really
    // working mess. Hopefully, one day there will be beautiful code
    // here, that works and makes people happy. One day.
  }

  return buf;
}
