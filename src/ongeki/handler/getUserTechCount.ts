import { Repositories } from "../repo";
import { GetUserTechCountRequest } from "../request/getUserTechCount";
import { GetUserTechCountResponse } from "../response/getUserTechCount";

export default async function getUserTechCount(
  rep: Repositories,
  req: GetUserTechCountRequest
): Promise<GetUserTechCountResponse> {
  // TODO
  return {
    userId: req.userId,
    length: 0,
    userTechCountList: [],
  };
}
