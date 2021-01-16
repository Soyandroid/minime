import {
  LoadConfigResponse1,
  LoadConfigResponse2,
  LoadConfigResponse3,
} from "../response/loadConfig";

export function loadConfig1(res: LoadConfigResponse1) {
  const buf = Buffer.alloc(0x01a0);

  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, 0x0002);
  buf.writeUInt16LE(res.serverVersion, 0x0016);
  buf.writeInt8(0x7, 0x0007); // Game Revision

  return buf;
}

export function loadConfig2(res: LoadConfigResponse2) {
  const buf = Buffer.alloc(0x0230);

  buf.writeInt16LE(0x00ac, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}

export function loadConfig3(res: LoadConfigResponse3) {
  const buf = Buffer.alloc(0x05e0);

  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, 0x0002);
  buf.writeUInt16LE(210, 0x0016);
  buf.writeInt8(0x2, 0x0007); // Game Revision
  buf.writeInt8(0x1, 0x0014); // playstamps enable
  buf.writeUInt16LE(0x01, 0x0018); // playstamps amount

  return buf;
}

export function loadConfig4(res: LoadConfigResponse2) {
  const buf = Buffer.alloc(0x0240);

  buf.writeInt16LE(0x00a1, 0x0000);
  buf.writeInt8(res.status, 0x0002);

  return buf;
}

export function loadConfig5(res: LoadConfigResponse3) {
  const buf = Buffer.alloc(0x05e0);

  buf.writeInt16LE(0x0005, 0x0000);
  buf.writeInt8(res.status, 0x0002);
  buf.writeUInt16LE(230, 0x0016);

  buf.writeInt8(0x6, 0x0007); // Game Revision
  buf.writeInt8(0x1, 0x0014); // playstamps enable
  buf.writeUInt16LE(0x01, 0x0018); // playstamps amount

  return buf;
}
