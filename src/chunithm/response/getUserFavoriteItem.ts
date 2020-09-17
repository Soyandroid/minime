export interface GetUserFavoriteItemResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer */
  kind: string;

  /** Integer, number of results returned */
  length: string;

  /**
   * Integer, pagination cookie. Sent back in next request if
   * `length === maxCount`.
   */
  nextIndex: string;

  /** TBD */
  userFavoriteItemList: [];
}
