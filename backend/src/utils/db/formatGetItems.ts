import { IGetItemsLists, IGroceryList, IGroceryListItem } from "src/types";

export function formatGetItems(
  lists: IGroceryList[],
  items: IGroceryListItem[]
): IGetItemsLists[] {
  return lists.map((list) => {
    return {
      groceryListName: list.name,
      groceryListId: list.id,
      content: items.filter((item) => item.groceryListId === list.id),
    };
  });
}
