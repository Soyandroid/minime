import { SaveNewCarResponse } from "../response/saveNewCar";

export function saveNewCar(res: SaveNewCarResponse): Buffer {
  const buf = Buffer.alloc(0x0010);

  buf.writeUInt16LE(0x0076, 0x0000);
  buf.writeUInt8(res.status, 0x0004);

  return buf;
}
