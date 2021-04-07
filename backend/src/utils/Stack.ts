export default class Stack<T> {
  items: T[];

  constructor(items?: T[]) {
    this.items = items || [];
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T {
    return this.items.pop();
  }

  peek(): T {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
