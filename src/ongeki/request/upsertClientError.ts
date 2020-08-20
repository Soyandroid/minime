export interface UpsertClientErrorRequest {
  clientError: {
    /* Base-10 ALLNet location ID */
    placeId: number;

    /** Keychip ID */
    clientId: string;

    /** Integer */
    orderId: number;

    /** Integer */
    sortNumber: number;

    /** Date "YYYY-MM-DD hh:mm:ss" */
    updateDate: string;

    /** Integer */
    errorNo: number;

    /** Long */
    totalCount: number;
  };
}
