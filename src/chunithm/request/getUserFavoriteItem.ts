export interface GetUserFavoriteItemRequest {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, filter on `UserActivityItem.kind`. */
  kind: string;

  /** Integer, pagination cookie. Initially zero. */
  nextIndex: string;

  /** Integer, max page size. Taken from GetGameSettingResponse. */
  maxCount: string;

  /** Boolean */
  isAllFavoriteItem: string;
}
