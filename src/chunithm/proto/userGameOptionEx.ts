import { Crush, writeObject } from "./base";
import { UserGameOptionExItem } from "../model/userGameOptionEx";

export type UserGameOptionExJson = Crush<UserGameOptionExItem>;

export function readUserGameOptionEx(
  json: UserGameOptionExJson
): UserGameOptionExItem {
  return {
    ext1: parseInt(json.ext1), // mirror (bool)
    ext2: parseInt(json.ext2), // chart level (green block at music select)
    ext3: parseInt(json.ext3), // chart inner sort
    ext4: parseInt(json.ext4),
    ext5: parseInt(json.ext5), // overpower (bool)
    ext6: parseInt(json.ext6), // chart offset
    ext7: parseInt(json.ext7), // field wall (0-16)
    ext8: parseInt(json.ext8), // short ver chara voice (bool)
    ext9: parseInt(json.ext9),
    ext10: parseInt(json.ext10),
    ext11: parseInt(json.ext11),
    ext12: parseInt(json.ext12),
    ext13: parseInt(json.ext13),
    ext14: parseInt(json.ext14),
    ext15: parseInt(json.ext15),
    ext16: parseInt(json.ext16),
    ext17: parseInt(json.ext17),
    ext18: parseInt(json.ext18),
    ext19: parseInt(json.ext19),
    ext20: parseInt(json.ext20),
  };
}

export function writeUserGameOptionEx(
  obj: UserGameOptionExItem
): UserGameOptionExJson {
  return writeObject(obj);
}
