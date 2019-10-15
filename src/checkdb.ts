import { readdirSync, readFileSync } from "fs";
import logger from "debug";
import { resolve } from "path";
import sql from "sql-bricks-postgres";

import { DataSource, Transaction } from "./sql";

const scripts = [
  // Order matters! Later scripts reference schema instantiated earlier.
  "meta.sql",
  "aime.sql",
  "idz.sql",
];

const debug = logger("app:checkdb");
const initPath = "./schema/init";
const migratePath = "./schema/migrate";
const migrateRx = new RegExp("^M([0-9]{4})-.+\\.sql$");

async function initdb(txn: Transaction): Promise<void> {
  // Get latest schemaver from migration script filenames

  const migrations = readdirSync(migratePath);
  let schemaver = 0;

  for (const filename of migrations) {
    const captures = filename.match(migrateRx);

    if (captures === null) {
      continue;
    }

    const migrationNo = parseInt(captures[1]);

    if (schemaver < migrationNo) {
      schemaver = migrationNo;
    }
  }

  // Run init scripts

  debug("Initializing database");

  for (const script of scripts) {
    debug(`Executing ${script}`);

    const scriptPath = resolve(initPath, script);
    const scriptSql = readFileSync(scriptPath, "utf-8");

    await txn.raw(scriptSql);
  }

  // Set up metadata table

  const metaInsert = sql.insert("meta", { schemaver });

  await txn.modify(metaInsert);

  debug(`Initialized new database to schema version ${schemaver}`);
}

async function migratedb(
  txn: Transaction,
  schemaver: number
): Promise<number | undefined> {
  const filenames = readdirSync(migratePath);
  let lastMigrationNo: number | undefined;

  filenames.sort();

  for (const filename of filenames) {
    const captures = filename.match(migrateRx);

    if (captures === null) {
      debug(`Warning: Unexpected file ${filename} in SQL migrations dir`);

      continue;
    }

    const migrationNo = parseInt(captures[1]);

    if (migrationNo <= schemaver) {
      continue;
    }

    debug(`Executing database upgrade: ${filename}`);

    const scriptPath = resolve(migratePath, filename);
    const scriptSql = readFileSync(scriptPath, "utf-8");

    await txn.raw(scriptSql);

    lastMigrationNo = migrationNo;
  }

  if (lastMigrationNo !== undefined) {
    const metaUpdate = sql.update("meta", { schemaver: lastMigrationNo });

    await txn.modify(metaUpdate);
  }

  return lastMigrationNo;
}

export default async function checkdb(db: DataSource): Promise<void> {
  const stmt = sql.select("schemaver").from("meta");
  let maybe: number | undefined;

  try {
    const row = await db.transaction(txn => txn.fetchRow(stmt));

    if (row !== undefined) {
      maybe = parseInt(row.schemaver);
    }
  } catch (e) {
    return db.transaction(initdb);
  }

  if (maybe === undefined) {
    throw new Error(
      "Database corrupted: `meta` table singleton row is missing"
    );
  }

  const schemaver = maybe;
  const newver = await db.transaction(txn => migratedb(txn, schemaver));

  if (newver !== undefined) {
    debug(`Upgraded database to version ${newver}`);

    await db.vacuum();

    debug("Post-upgrade housekeeping complete");
  }
}
