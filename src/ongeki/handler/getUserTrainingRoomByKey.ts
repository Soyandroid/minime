import { readAimeId } from "../proto/base";
import { writeUserTrainingRoom } from "../proto/userTrainingRoom";
import { Repositories } from "../repo";
import { GetUserTrainingRoomByKeyRequest } from "../request/getUserTrainingRoomByKey";
import { GetUserTrainingRoomByKeyResponse } from "../response/getUserTrainingRoomByKey";

export default async function getUserTrainingRoomByKey(
  rep: Repositories,
  req: GetUserTrainingRoomByKeyRequest
): Promise<GetUserTrainingRoomByKeyResponse> {
  const aimeId = readAimeId(req.userId);

  const profileId = await rep.userData().lookup(aimeId);
  const items = await rep.userTrainingRoom().load(profileId);

  return {
    userId: req.userId,
    length: items.length,
    userTrainingRoomList: items.map(writeUserTrainingRoom),
  };
}
