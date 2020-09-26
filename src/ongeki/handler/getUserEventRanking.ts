import { readAimeId } from "../proto/base";
import { writeUserEventRanking } from "../proto/userEventRanking";
import { Repositories } from "../repo";
import { GetUserEventRankingRequest } from "../request/getUserEventRanking";
import { GetUserEventRankingResponse } from "../response/getUserEventRanking";

export default async function getUserEventRanking(
  rep: Repositories,
  req: GetUserEventRankingRequest
): Promise<GetUserEventRankingResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const eventPoints = await rep.userEventPoint().load(profileId);

  const items = eventPoints
    .flatMap(({ eventId, point }) => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 1);

      return [
        {
          eventId,
          type: 0,
          date: oldDate,
          rank: 2,
          point,
        },
        {
          eventId,
          type: 1,
          date: new Date(),
          rank: 1,
          point,
        },
      ];
    });

  return {
    userId: req.userId,
    length: items.length,
    userEventRankingList: items.map(writeUserEventRanking),
  };
}
