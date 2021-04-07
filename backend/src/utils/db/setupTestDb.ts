import { Knex } from "knex";
import { createDummyDataInserts } from "./dummyData";
import { setupDb } from "../init";

export async function setupTestDb(options: ITestDbOptions): Promise<Knex> {
  const { newReg } = options;

  const db = await setupDb();

  if (!newReg) {
    await db("system").where("key", "NEW_REGISTRATIONS").update("value", 0);
  }

  const dummyInserts = createDummyDataInserts();
  dummyInserts.forEach(async (insert) => {
    await db(insert.table).insert(insert.data);
  });

  return db;
}

interface ITestDbOptions {
  newReg?: boolean;
}
