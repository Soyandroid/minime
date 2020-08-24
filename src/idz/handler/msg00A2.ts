import { Message00A2 } from "../request/msg00A2";
import { GenericResponse } from "../response/generic";
import { Repositories } from "../repo";

export function msg00A2(w: Repositories, req: Message00A2): GenericResponse {
  return { type: "generic_res" };
}
