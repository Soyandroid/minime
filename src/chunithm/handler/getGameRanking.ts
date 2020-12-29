import { writeObject } from "../proto/base";
import { Repositories } from "../repo";
import { GetGameRankingRequest } from "../request/getGameRanking";
import { GetGameRankingResponse } from "../response/getGameRanking";

export default async function getGameRanking(
  rep: Repositories,
  req: GetGameRankingRequest
): Promise<GetGameRankingResponse> {
  /*
  type = 1 is a request for the most recent song ranking data (most popular songs).
  type = 2 is a request for older ranking data, to display if a song has become more/less popular.
  */

  // Return the most played songs in the past 30 days.
  let window = 30;
  let offset = 0;

  if (req.type === "2") {
    // If we want older data, shift the window back by 15 days.
    offset = 15;
  }

  // Limit to 10 results since the game only displays the top 10.
  let gameRankingList = (await rep.userPlaylog().loadSongRanking(window, offset, 10)).map(writeObject);
  return {
    type: req.type,
    gameRankingList,
  };
}
