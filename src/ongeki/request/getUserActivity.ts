export interface GetUserActivityRequest {
  /** Integer, AiMe ID */
  userId: number;

  /**
   * Integer, filter on `UserActivityItem.kind`.
   *
   * 1 = PlayActivity
   * 2 = Music
   * */
  kind: number;
}
