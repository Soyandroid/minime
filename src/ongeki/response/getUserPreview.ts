export interface GetUserPreviewResponse {
  //
  // AiMe ID, from request
  //

  /** Long */
  userId: number;

  //
  // Current login (i.e. profile lock) status
  //

  /** Boolean */
  isLogin: boolean;

  /** Date "YYYY-MM-DD hh:mm:ss" */
  lastLoginDate: string;

  //
  // UserData
  //

  /** String */
  userName: string;

  /** Integer */
  reincarnationNum: number;

  /** Integer */
  level: number;

  /** Long */
  exp: number;

  /** Integer */
  playerRating: number;

  /** String */
  lastGameId: string;

  /** String */
  lastRomVersion: string;

  /** String */
  lastDataVersion: string;

  /** Date "YYYY-MM-DD hh:mm:ss", null on no profile */
  lastPlayDate: string | null;

  /** Integer */
  trophyId: number;

  /** Integer */
  cardId: number;

  //
  // UserOption
  //

  dispPlayerLv: number;
  dispRating: number;
  dispBP: number;
  headphone: number;
}
