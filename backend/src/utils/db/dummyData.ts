import { IUser, IGroceryList, IGroceryListItem } from "src/types";

export const dummyData = {
  users: { id: 1, email: "test@mock.com", password: "17uDh$78f!uF" },
  groceryLists: [
    { id: 1, name: "Test List 1", userId: 1 },
    { id: 2, name: "Test List 1", userId: 1 },
  ],
  groceryListItems: [
    {
      id: 1,
      name: "test item 1",
      checked: "false",
      order: 1,
      groceryListId: 1,
      userId: 1,
    },
    {
      id: 2,
      name: "test item 2",
      checked: "false",
      order: 2,
      groceryListId: 1,
      userId: 1,
    },
    {
      id: 3,
      name: "test item 3",
      checked: "false",
      order: 3,
      groceryListId: 1,
      userId: 1,
    },
  ],
};

export function createDummyDataInserts() {
  const { users, groceryLists, groceryListItems } = dummyData;
  return [
    { table: "users", data: users },
    { table: "groceryLists", data: groceryLists },
    { table: "groceryListItems", data: groceryListItems },
  ];
}
