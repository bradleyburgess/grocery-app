import { Knex } from "knex";
import db from "./db";

export default async function init(): Promise<void> {
  const check = await checkDb();
  if (!check) setupDb();
}

export async function checkDb(): Promise<boolean> {
  const tables: string[] = await (async (): Promise<string[]> => {
    const query: ITableQuery[] = await db.select("name").from("sqlite_master");
    return query
      .map((entry) => entry.name)
      .filter((name) => !name.includes("sqlite"));
  })();
  return (
    tables.includes("users") &&
    tables.includes("system") &&
    tables.includes("groceryLists") &&
    tables.includes("groceryListItems")
  );
}

export async function setupDb(): Promise<Knex> {
  await db.schema.dropTableIfExists("users");
  await db.schema.dropTableIfExists("groceryLists");
  await db.schema.dropTableIfExists("groceryListItems");
  await db.schema.dropTableIfExists("system");

  await db.schema.createTable("system", (table) => {
    table.string("key");
    table.string("value");
  });

  await db.schema.createTable("users", (table) => {
    table.increments();
    table.string("email").unique();
    table.string("password");
  });

  await db.schema.createTable("groceryLists", (table) => {
    table.increments();
    table.integer("userId");
    table.string("name");
    table.foreign("userId").references("users.id");
  });

  await db.schema.createTable("groceryListItems", (table) => {
    table.increments();
    table.integer("userId");
    table.integer("groceryListId");
    table.string("name");
    table.integer("order");
    table.string("checked", 5);
    table.foreign("userId").references("users.id");
    table.foreign("groceryListId").references("groceryLists.id");
  });

  await db("system").insert({
    key: "NEW_REGISTRATIONS",
    value: 1,
  });

  return db;
}

interface ITableQuery {
  name: string;
}
