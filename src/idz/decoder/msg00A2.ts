import { Message00A2 } from "../request/msg00A2";

msg00A2.msgCode = 0x00a2;
msg00A2.msgLen = 0x061c;

export function msg00A2(buf: Buffer): Message00A2 {
  return { type: "msg_00A2_req" };
}
