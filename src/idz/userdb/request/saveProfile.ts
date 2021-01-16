import { BackgroundCode, CourseNo, StampCode, TitleCode } from "../model/base";
import { Car } from "../model/car";
import { MissionState } from "../model/mission";
import { Settings } from "../model/settings";
import { SelectedStamps } from "../model/stamps";
import { Story } from "../model/story";
import { StoryLaps } from "../model/story";
import { Tickets } from "../model/tickets";
import { Tutorials } from "../model/tutorials";
import { Unlocks } from "../model/unlocks";
import { WeeklyMissions } from "../model/weeklyMissions";
import { AimeId } from "../../../model";

export interface SaveProfileRequest {
  type: "save_profile_req";
  aimeId: AimeId;
  version: number;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
  playstamps: number;
  tutorials?: Tutorials;
  title: TitleCode;
  titles: Set<TitleCode>;
  background: BackgroundCode;
  coursePlays: Map<CourseNo, number>;
  missions: MissionState;
  car: Car;
  story: Story;
  storyLaps?: StoryLaps[];
  unlocks: Unlocks;
  tickets: Tickets;
  settings: Settings;
  selectedStamps?: SelectedStamps;
  stamps?: Set<StampCode>;
  weeklyMissions?: WeeklyMissions;
}
