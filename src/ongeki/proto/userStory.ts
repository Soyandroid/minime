import { UserStoryItem } from "../model/userStory";

export type UserStoryJson = UserStoryItem;

export function readUserStory(json: UserStoryJson): UserStoryItem {
  return json;
}

export function writeUserStory(obj: UserStoryItem): UserStoryJson {
  return obj;
}
