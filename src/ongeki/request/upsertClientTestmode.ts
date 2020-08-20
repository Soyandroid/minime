export interface UpsertClientTestmodeRequest {
  clientTestmode: {
    /* Base-10 ALLNet location ID */
    placeId: number;

    /** Keychip ID */
    clientId: string;

    /** Date "YYYY-MM-DD hh:mm:ss" */
    updateDate: string;

    /** Boolean */
    isDelivery: boolean;

    /** Integer */
    groupId: number;

    /** Integer */
    groupRole: number;

    /** Integer */
    continueMode: number;

    /** Integer */
    selectMusicTime: number;

    /** Integer */
    advertiseVolume: number;

    /** Integer */
    eventMode: number;

    /** Integer */
    eventMusicNum: number;
  };
}
