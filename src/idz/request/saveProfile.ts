import { BackgroundCode, CourseNo, ExtId, TitleCode, StampCode } from "../model/base";
import { Car } from "../model/car";
import { MissionState } from "../model/mission";
import { Settings } from "../model/settings";
import { Story } from "../model/story";
import { SelectedStamps } from "../model/stamps"
import { Tickets } from "../model/tickets";
import { Unlocks } from "../model/unlocks";
import { AimeId } from "../../model";
import { WeeklyMissions } from "../model/weeklyMissions";

interface SaveProfileRequestBase {
  type: "save_profile_req";
  aimeId: AimeId;
  lv: number;
  exp: number;
  fame: number;
  dpoint: number;
  mileage: number;
  title: TitleCode;
  titles: Set<TitleCode>;
  background: BackgroundCode;
  coursePlays: Map<CourseNo, number>;
  missions: MissionState;
  car: Car;
  story: Story;
  unlocks: Unlocks;
  tickets: Tickets;
  settings: Settings;
  selectedStamps: SelectedStamps;
  stamps: Set<StampCode>;
  weeklyMissions: WeeklyMissions;
}

export interface SaveProfileRequest2 extends SaveProfileRequestBase {
  format: 2;
}

export interface SaveProfileRequest3 extends SaveProfileRequestBase {
  format: 3;
}

export type SaveProfileRequest = SaveProfileRequest2 | SaveProfileRequest3;
