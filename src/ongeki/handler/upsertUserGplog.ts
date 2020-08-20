import { Repositories } from "../repo";
import { UpsertUserGplogRequest } from "../request/upsertUserGplog";
import { UpsertUserGplogResponse } from "../response/upsertUserGplog";

export default async function upsertUserGplog(
  rep: Repositories,
  req: UpsertUserGplogRequest
): Promise<UpsertUserGplogResponse> {
  return {
    returnCode: 1,
    apiName: "upsertUserGplog",
  };
}
