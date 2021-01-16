import { LoadStockerRequest } from "../request/loadStocker";
import { AimeId } from "../../../model";

loadStocker1.msgCode = 0x00a7;
loadStocker1.msgLen = 0x0010;

export function loadStocker1(buf: Buffer): LoadStockerRequest {
  return {
    type: "load_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 1,
  };
}

loadStocker2.msgCode = 0x009c;
loadStocker2.msgLen = 0x0010;

export function loadStocker2(buf: Buffer): LoadStockerRequest {
  return {
    type: "load_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 2,
  };
}

loadStocker3.msgCode = 0x009c;
loadStocker3.msgLen = 0x0010;

export function loadStocker3(buf: Buffer): LoadStockerRequest {
  return {
    type: "load_stocker_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    version: 3,
  };
}
