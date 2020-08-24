import { LoadConfigResponse } from "../response/loadConfig";

export function loadConfig(res: LoadConfigResponse) {
  const buf = Buffer.alloc(0x05e0);

  var offset = 0x00;
  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, offset + 0x0002);
  buf.writeUInt16LE(res.serverVersion, 0x0016);

  return buf;
}
