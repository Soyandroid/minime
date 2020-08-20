import { UserActivityItem } from "../model/userActivity";

export interface UserActivityJson {
  // Not quite the same as our internal representation! Internally we refer to
  // the "id" field as "activityId", because the SQL table that stores these
  // values already has an "id" column that holds a synthetic primary key.

  kind: number;
  id: number;
  sortNumber: number;
  param1: number;
  param2: number;
  param3: number;
  param4: number;
}

export function readUserActivity(json: UserActivityJson): UserActivityItem {
  return {
    kind: json.kind,
    activityId: json.id, // <-- Look closely!
    sortNumber: json.sortNumber,
    param1: json.param1,
    param2: json.param2,
    param3: json.param3,
    param4: json.param4,
  };
}

export function writeUserActivity(obj: UserActivityItem): UserActivityJson {
  return {
    kind: obj.kind,
    id: obj.activityId, // <-- Look closely!
    sortNumber: obj.sortNumber,
    param1: obj.param1,
    param2: obj.param2,
    param3: obj.param3,
    param4: obj.param4,
  };
}
