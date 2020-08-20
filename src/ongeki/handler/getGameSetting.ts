import { writeDate } from "../proto/base";
import { Repositories } from "../repo";
import { GetGameSettingRequest } from "../request/getGameSetting";
import { GetGameSettingResponse } from "../response/getGameSetting";

export default async function getGameSetting(
  rep: Repositories,
  req: GetGameSettingRequest
): Promise<GetGameSettingResponse> {
  const rebootTime = new Date();
  rebootTime.setHours(rebootTime.getHours() - 7);

  return {
    gameSetting: {
      dataVersion: "0.00.00",
      isMaintenance: false,
      requestInterval: 10,
      rebootStartTime: writeDate(rebootTime)!,
      rebootEndTime: writeDate(rebootTime)!,
      isBackgroundDistribute: false,
      maxCountCharacter: 999,
      maxCountItem: 999,
      maxCountMusic: 999,
    },
    isDumpUpload: false,
    isAou: false,
  };
}
