export interface GameLoginRequest {
  /** Integer, AiMe ID */
  userId: string;

  /* Base-10 ALLNet location ID */
  placeId: number;

  /** Keychip ID */
  clientId: string;
}
