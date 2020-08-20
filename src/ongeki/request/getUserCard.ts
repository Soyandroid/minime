export interface GetUserCardRequest {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, pagination cookie. Initially zero. */
  nextIndex: number;

  /** Integer, max page size. Taken from GetGameSettingResponse. */
  maxCount: number;
}
