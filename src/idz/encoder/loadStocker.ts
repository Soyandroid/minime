import { encodeBitmap } from "./_bitmap";
import { LoadStockerResponse } from "../response/loadStocker";

export function loadStocker(res: LoadStockerResponse) {
  const buf = Buffer.alloc(0x00a0);

  buf.writeInt16LE(0x009d, 0x0000);
  buf.writeUInt8(res.status, 0x0004);
  encodeBitmap(res.backgrounds, 0x2c).copy(buf, 0x0005);
  encodeBitmap(res.myChara, 0x98).copy(buf, 0x0031);

  return buf;
}
