export interface ExtendLockTimeRequest {
  /** Integer, AiMe ID */
  userId: number;

  /* Base-10 ALLNet location ID */
  placeId: number;

  /** Keychip ID */
  clientId: string;

  /** Integer */
  extendTime: number;
};
