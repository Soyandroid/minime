export interface GetGameSettingResponse {
  gameSetting: {
    /** ROM version string e.g. "1.30.00" */
    dataVersion: string;

    isMaintenance: boolean;

    requestInterval: number;

    rebootStartTime: string;

    rebootEndTime: string;

    /** Boolean */
    isBackgroundDistribute: boolean;

    /** Integer, pagination granularity for GetUserCharacter */
    maxCountCharacter: number;

    /** Integer, pagination granularity for GetUserJson */
    maxCountItem: number;

    /** Integer, pagination granularity for GetUserMusic */
    maxCountMusic: number;
  };

  /** Boolean */
  isDumpUpload: boolean;

  /** Boolean */
  isAou: boolean;
}
