import { RepositoryN } from "./_defs";
import { UserStoryItem } from "../model/userStory";
import { Id } from "../../model";

export interface UserStoryRepository extends RepositoryN<UserStoryItem> {
}
