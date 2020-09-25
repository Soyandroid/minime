export interface GetUserTeamResponse {
  /** Integer, AiMe ID */
  userId: string;

  /** Integer, 0 == no team */
  teamId: string;
  teamRank: string;
  teamName: string;
  userTeamPoint: {
    userId: string,
    teamId: string,
    orderId: string,
    teamPoint: string,
    aggrDate: string,
  };
}
