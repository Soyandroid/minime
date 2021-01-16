import { car } from "./_car";
import { SaveGarageRequest } from "../request/saveGarage";
import { AimeId } from "../../../model";

saveGarage1.msgCode = 0x008e;
saveGarage1.msgLen = 0x0090;

export function saveGarage1(buf: Buffer): SaveGarageRequest {
  const field_0068: number[] = [];

  for (let offset = 0x0068; offset < 0x007c; offset += 2) {
    field_0068.push(buf.readUInt16LE(offset));
  }

  return {
    type: "save_garage_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
    car: car(buf.slice(0x0008, 0x0068)),
    field_0068,
    field_0080: buf.readUInt8(0x0080),
    field_0081: buf.readUInt8(0x0081) !== 0,
  };
}

saveGarage2.msgCode = 0x0085;
saveGarage2.msgLen = 0x0090;

export function saveGarage2(buf: Buffer): SaveGarageRequest {
  const field_0068: number[] = [];

  for (let offset = 0x0068; offset < 0x007c; offset += 2) {
    field_0068.push(buf.readUInt16LE(offset));
  }

  return {
    type: "save_garage_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
    car: car(buf.slice(0x0008, 0x0068)),
    field_0068,
    field_0080: buf.readUInt8(0x0088),
    field_0081: buf.readUInt8(0x0089) !== 0,
  };
}

saveGarage3.msgCode = 0x0085;
saveGarage3.msgLen = 0x0090;

export function saveGarage3(buf: Buffer): SaveGarageRequest {
  const field_0068: number[] = [];

  for (let offset = 0x0068; offset < 0x007c; offset += 2) {
    field_0068.push(buf.readUInt16LE(offset));
  }

  return {
    type: "save_garage_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 3,
    car: car(buf.slice(0x0008, 0x0068)),
    field_0068,
    field_0080: buf.readUInt8(0x0088),
    field_0081: buf.readUInt8(0x0089) !== 0,
  };
}
