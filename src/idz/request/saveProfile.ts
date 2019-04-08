import { Id, TitleCode } from "../model/base";
import { Profile } from "../model/profile";
import { Story } from "../model/story";

export interface SaveProfileRequest {
  type: "save_profile_req";
  profileId: Id<Profile>;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  titles: TitleCode[];
  story: Story;
}
