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
  buf.writeInt8(0x1, 0x0015); // playstamps enable 2

  // playstamps amount ... i think, idk honestly
  // it does some real weird funky looping and bitshifting
  for (let i = 0; i < 7; i++) {
    buf.writeUInt16LE(0x01, 0x0018 + i * 2);
  }

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
  buf.writeInt8(0x1, 0x0015); // playstamps ... something
  buf.writeInt8(0x42, 0x0059); // revision letter

  // playstamps amount ... i think, idk honestly
  // it does some real weird funky looping and bitshifting
  for (let i = 0; i < 7; i++) {
    buf.writeUInt16LE(0x01, 0x0018 + i * 2);
  }

  buf.writeInt8(0x63, 0x0042); // max ex parts tickets
  buf.writeUInt16LE(64, 0x01f0); // ex parts pricing loop amount

  // hardcoded values to match real network values
  // in this case, the DX version of the toho decals are supposed to cost 3 tickets
  let ex_part_pricing = [1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3];
  ex_part_pricing.length = 64;
  ex_part_pricing.fill(1, 16);

  // ex parts server side unlock
  for (let i = 0; i < 64; i++) {
    buf.writeUInt16LE(i, 0x0272 + i * 2);
    buf.writeBigUInt64LE(0xffffffffffffffffn, 0x02f8 + i * 8);
    buf.writeInt8(i, 0x01f2 + i * 2); // part pricing id
    buf.writeInt8(ex_part_pricing[i], 0x01f3 + i * 2); // part price
  }

  return buf;
}
