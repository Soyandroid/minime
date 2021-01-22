import sql from "sql-bricks-postgres";

import { Profile } from "../model/profile";
import { Tickets } from "../model/tickets";
import { FacetRepository } from "../repo";
import { Id } from "../../../model";
import { Transaction } from "../../../sql";

// TODO free continue

export class SqlTicketsRepository implements FacetRepository<Tickets> {
  constructor(private readonly _txn: Transaction) {}

  async load(profileId: Id<Profile>): Promise<Tickets> {
    const loadSqlCar = sql
      .select("fc.*")
      .from("idz_free_car fc")
      .where("fc.id", profileId);

    const rowCar = await this._txn.fetchRow(loadSqlCar);

    const loadSqlExPart = sql
      .select("fex.*")
      .from("idz_free_expart fex")
      .where("fex.id", profileId);

    const rowExpart = await this._txn.fetchRow(loadSqlExPart);

    return {
      freeCar: rowCar && {
        validFrom: new Date(rowCar.valid_from!),
      },
      freeExPart: rowExpart && {
        validFrom: new Date(rowExpart.valid_from!),
        ticketAmount: parseInt(rowExpart.ticket_amount!),
      },
    };
  }

  async save(profileId: Id<Profile>, tickets: Tickets): Promise<void> {
    const { freeCar, freeExPart } = tickets;

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

    if (!freeExPart) {
      const delSql = sql.delete("idz_free_expart").where("id", profileId);

      await this._txn.modify(delSql);
    } else {
      const saveSql = sql
        .insert("idz_free_expart", {
          id: profileId,
          valid_from: freeExPart.validFrom,
          ticket_amount: freeExPart.ticketAmount,
        })
        .onConflict("id")
        .doUpdate(["valid_from", "ticket_amount"]);

      await this._txn.modify(saveSql);
    }
  }
}
