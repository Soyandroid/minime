import { Repositories } from "../repo";
import { ExtendLockTimeRequest } from "../request/extendLockTime";
import { ExtendLockTimeResponse } from "../response/extendLockTime";

export default async function gameLogin(
  rep: Repositories,
  req: ExtendLockTimeRequest
): Promise<ExtendLockTimeResponse> {
  return { returnCode: 1 };
}
