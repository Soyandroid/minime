export interface GetUserFavoriteItemRequest {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer */
  kind: string;

  nextIndex: string;
  maxCount: string;

  /** Boolean */
  isAllFavoriteItem: string;
}
