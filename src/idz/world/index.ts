import * as fs from "fs";
import { promisify } from "util";

import { World } from "./base";
import { ProfileRepositoryImpl } from "./profile";
import { SingletonJsonRepo, SingletonTextRepo } from "./_singleton";
import * as Model from "../model";

export { World };

const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);

class WorldImpl implements World {
  constructor(private readonly _root: string) {}

  backgrounds() {
    return new SingletonTextRepo<Model.BackgroundCode[], Model.Profile>(
      this._root,
      "backgrounds"
    );
  }

  car() {
    return new SingletonJsonRepo<Model.Car, Model.Profile>(this._root, "car");
  }

  chara() {
    return new SingletonJsonRepo<Model.Chara, Model.Profile>(
      this._root,
      "chara"
    );
  }

  profile() {
    return new ProfileRepositoryImpl(this._root);
  }

  settings() {
    return new SingletonJsonRepo<Model.Settings, Model.Profile>(
      this._root,
      "settings"
    );
  }

  story() {
    return new SingletonJsonRepo<Model.Story, Model.Profile>(
      this._root,
      "story"
    );
  }

  titles() {
    return new SingletonTextRepo<Model.TitleCode[], Model.Profile>(
      this._root,
      "titles"
    );
  }
}

export async function createWorld(root: string): Promise<World> {
  const doesExist = await exists(root);

  if (!doesExist) {
    await mkdir(root);
  }

  return new WorldImpl(root);
}
