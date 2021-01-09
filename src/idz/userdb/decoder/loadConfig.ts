import { LoadConfigRequest1, LoadConfigRequest2 } from "../request/loadConfig";

loadConfig1.msgCode = 0x0004;
loadConfig1.msgLen = 0x0050;

export function loadConfig1(): LoadConfigRequest1 {
  return { type: "load_config_req1" };
}

loadConfig2.msgCode = 0x00ab;
loadConfig2.msgLen = 0x0010;

export function loadConfig2(): LoadConfigRequest2 {
  return { type: "load_config_req2" };
}

loadConfig3.msgCode = 0x0004;
loadConfig3.msgLen = 0x0050;

export function loadConfig3(): LoadConfigRequest1 {
  return { type: "load_config_req1" };
}

loadConfig4.msgCode = 0x00a0;
loadConfig4.msgLen = 0x0010;

export function loadConfig4(): LoadConfigRequest2 {
  return { type: "load_config_req2" };
}
