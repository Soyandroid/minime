export interface GetUserMusicItemRequest {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, pagination cookie. Initially zero. */
  nextIndex: number;

  /** Integer, max page size. */
  maxCount: number;
}
