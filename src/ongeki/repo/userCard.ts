import { RepositoryN } from "./_defs";
import { UserCardItem } from "../model/userCard";
import { UserDataItem } from "../model/userData";
import { Id } from "../../model";

export interface UserCardRepository
  extends RepositoryN<UserCardItem> {
  loadOne(
    profileId: Id<UserDataItem>,
    cardId: number
  ): Promise<UserCardItem>;
}
