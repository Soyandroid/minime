import { RepositoryN } from "./_defs";
import { UserDataItem } from "../model/userData";
import { UserEventPointItem } from "../model/userEventPoint";
import { Id } from "../../model";

export interface UserEventPointRepository
  extends RepositoryN<UserEventPointItem> {
}
