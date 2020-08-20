export interface UpsertUserGplogRequest {
  /** Integer, AiMe ID */
  userId: number;

  userGplog: {
    /** Date */
    trxnDate: string;

    /* Base-10 ALLNet location ID */
    placeId: number;

    kind: number;

    pattern: number;

    currentGP: number;
  };
}
