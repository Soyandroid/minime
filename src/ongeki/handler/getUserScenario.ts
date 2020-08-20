import { Repositories } from "../repo";
import { GetUserScenarioRequest } from "../request/getUserScenario";
import { GetUserScenarioResponse } from "../response/getUserScenario";

export default async function getUserScenario(
  rep: Repositories,
  req: GetUserScenarioRequest
): Promise<GetUserScenarioResponse> {
  // TODO
  return {
    userId: req.userId,
    length: 0,
    userScenarioList: [],
  };
}
