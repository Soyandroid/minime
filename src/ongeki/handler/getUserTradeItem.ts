import { Repositories } from "../repo";
import { GetUserTradeItemRequest } from "../request/getUserTradeItem";
import { GetUserTradeItemResponse } from "../response/getUserTradeItem";

export default async function getUserTradeItem(
  rep: Repositories,
  req: GetUserTradeItemRequest
): Promise<GetUserTradeItemResponse> {
  // TODO
  return {
    userId: req.userId,
    length: 0,
    userTradeItemList: [],
  };
}
