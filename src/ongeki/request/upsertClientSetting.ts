export interface UpsertClientSettingRequest {
  clientSetting: {
    /* Base-10 ALLNet location ID */
    placeId: number;

    /** Keychip ID */
    clientId: string;

    /** ALLNet place name */
    placeName: string;

    /** ALLNet "region0" */
    regionId: number;

    /** ALLNet "region_name0" */
    regionName: string;

    /** ALLNet "allnet_id" string */
    allNetId: string;

    /** sic. AMEX DS EEPROM ID */
    bordId: string;

    /** Data version of the form "1.30.00" */
    romVersion: string;

    /** Data version of the form "1.30.00" */
    dataVersion: string;

    /** Integer */
    dumpFileNum: number;
  };
}
