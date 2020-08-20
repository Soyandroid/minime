import { RepositoryN } from "./_defs";
import { UserDataItem } from "../model/userData";
import { UserMusicItemItem } from "../model/userMusicItem";
import { Id } from "../../model";

export interface UserMusicItemRepository
  extends RepositoryN<UserMusicItemItem> {
  loadOne(
    profileId: Id<UserDataItem>,
    musicId: number
  ): Promise<UserMusicItemItem>;
}
