import { bitmap } from "./_bitmap";
import { chara } from "./_chara";
import { CarSelector } from "../model/car";
import { SelectedStamps } from "../model/stamps"
import { SaveStockerRequest } from "../request/saveStocker";
import { AimeId } from "../../model";

saveStocker.msgCode = 0x009b;
saveStocker.msgLen = 0x0110;

export function saveStocker(buf: Buffer): SaveStockerRequest {
  return {
    type: "save_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,

    backgrounds: bitmap(buf.slice(0x0008, 0x0034)),
    selectedCar: buf.readUInt16LE(0x009c) as CarSelector,
    chara: chara(buf.slice(0x009e, 0x00b2)),
    selectedStamps: {
      stamp01: buf.readUInt16LE(0x00da),
      stamp02: buf.readUInt16LE(0x00dc),
      stamp03: buf.readUInt16LE(0x00de),
      stamp04: buf.readUInt16LE(0x00e0),
    },
    stamps: bitmap(buf.slice(0x00b3, 0x00d9)),
    myChara: bitmap(buf.slice(0x0034, 0x098)),
  };
}
