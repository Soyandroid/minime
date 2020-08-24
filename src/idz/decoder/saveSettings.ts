import { SaveSettingsRequest } from "../request/saveSettings";
import { AimeId } from "../../model";

saveSettings.msgCode = 0x009a;
saveSettings.msgLen = 0x0020;

export function saveSettings(buf: Buffer): SaveSettingsRequest {
  const pack = buf.readUInt32LE(0x000c);

  return {
    type: "save_settings_req",
    aimeId: buf.readUInt32LE(0x0008) as AimeId,
    dpoint: buf.readUInt32LE(0x000c),
    settings: {
      music: buf.readUInt16LE(0x0004),
      pack: buf.readUInt32LE(0x0010),
      paperCup: buf.readUInt8(0x0015),
      gauges: buf.readUInt8(0x0016),
      aura: buf.readUInt8(0x0017),
      drivingStyle: buf.readUInt8(0x0018),
    },
    field_0010: buf.readUInt32LE(0x0014),
  };
}
