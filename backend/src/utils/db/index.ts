import knex, { Knex } from "knex";
import { IGroceryList, IGroceryListItem } from "src/types";

const db: Knex = (() => {
  const filename =
    process.env.NODE_ENV === "test"
      ? "./test-" + process.env.JEST_WORKER_ID + ".db"
      : process.env.DB_PATH;
  const database = knex({
    client: "sqlite3",
    connection: { filename },
    useNullAsDefault: true,
  });
  return database;
})();

export default db;
export { setupTestDb } from "./setupTestDb";
export { formatGetItems } from "./formatGetItems";
export { dummyData, createDummyDataInserts } from "./dummyData";
