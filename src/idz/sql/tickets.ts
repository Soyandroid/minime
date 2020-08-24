import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Tickets } from "../model/tickets";
import { FacetRepository } from "../repo";
import { Id } from "../../model";
import { Transaction } from "../../sql";

// TODO free continue

export class SqlTicketsRepository implements FacetRepository<Tickets> {
  constructor(private readonly _txn: Transaction) { }

  async load(profileId: Id<Profile>): Promise<Tickets> {
    const loadCarSql = sql
      .select("fc.*")
      .from("idz_free_car fc")
      .where("fc.id", profileId);

    const car_row = await this._txn.fetchRow(loadCarSql);

    return {
      freeCar: car_row && {
        validFrom: new Date(car_row.valid_from!),
      },
    };
  }

  async save(profileId: Id<Profile>, tickets: Tickets): Promise<void> {
    const { freeCar } = tickets;

    if (!freeCar) {
      const delSql = sql.delete("idz_free_car").where("id", profileId);

      await this._txn.modify(delSql);
    } else {
      const saveSql = sql
        .insert("idz_free_car", {
          id: profileId,
          valid_from: freeCar.validFrom,
        })
        .onConflict("id")
        .doUpdate(["valid_from"]);

      await this._txn.modify(saveSql);
    }
  }
}
