import format from "date-fns/format";

import { AimeId } from "../../model";

type ModelObjectField = string | number | bigint | boolean | Date | undefined;

type ModelObject<T> = {
  [K in keyof T]: ModelObjectField;
};

type CrushedField = string | number | boolean | null;

export type Crush<T extends ModelObject<T>> = {
  [K in keyof T]: CrushedField;
};

export function readAimeId(id: number): AimeId {
  return id as AimeId;
}

export function writeBigInt(num: bigint): number {
  // TypeScript doesn't allow this but it's fine
  return parseInt(num as any);
}

export function readDate(str: string): Date {
  // If we ever need to change this then we'll be able to do it from one place
  const date = new Date(str);

  // Fix "Invalid Date"
  if (isNaN(date.getTime())) {
    date.setTime(0);
  }

  return date;
}

export function writeDate(date: Date): string {
  return format(date, "YYYY-MM-DD HH:mm:ss");
}

const MAX_SAFE_BIGINT = BigInt(Number.MAX_SAFE_INTEGER);
const MIN_SAFE_BIGINT = -1n * MAX_SAFE_BIGINT;

function crushField(v: ModelObjectField): CrushedField {
  switch (typeof(v)) {
    case "bigint":
      if (v < MIN_SAFE_BIGINT || v > MAX_SAFE_BIGINT) {
        throw new Error("JSON integer overflow");
      }

      return writeBigInt(v);

    case "boolean":
      return v;

    case "number":
      return v;

    case "object":
      if (v instanceof Date) {
        return writeDate(v);
      } else {
        throw new Error("Unsupported JSON value type");
      }

    case "string":
      return v;

    case "undefined":
      return null;

    default:
      throw new Error("Unsupported JSON value type: " + typeof(v));
  }
}

export function writeObject<T extends ModelObject<T>>(obj: T): Crush<T> {
  const result = {} as Crush<T>;

  for (const k in obj) {
    result[k] = crushField(obj[k]);
  }

  return result;
}
