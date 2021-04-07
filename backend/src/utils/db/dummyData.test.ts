import { dummyData, createDummyDataInserts } from "./dummyData";

describe("DummyData output", () => {
  test("Result from createDummyDataInserts", () => {
    const data = createDummyDataInserts();
    expect(data[0].table).not.toBeUndefined();
    expect(data[0].data).not.toBeUndefined();
  });
});
