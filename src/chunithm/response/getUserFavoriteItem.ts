export interface GetUserFavoriteItemResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, number of results returned */
  length: string;

  /** Integer, round-trip from request */
  kind: string;

  nextIndex: string;

  /** TBD */
  userFavoriteItemList: [];
}
