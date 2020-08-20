export interface GetUserActivityRequest {
  /** Integer, AiMe ID */
  userId: number;

  /** Integer, filter on `UserActivityItem.kind`. */
  kind: number;
}
