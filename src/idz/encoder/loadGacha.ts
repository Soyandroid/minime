import iconv from "iconv-lite";
import { LoadGachaResponse } from "../response/loadGacha";

export function loadGacha(res: LoadGachaResponse): Buffer {
  const buf = Buffer.alloc(0x0090);

  buf.writeUInt16LE(0x00b0, 0x0000);
  buf.writeUInt8(res.awardedToday ? 0x01 : 0x00, 0x0004);

  return buf;
}
