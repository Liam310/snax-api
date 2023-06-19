const { createLookup } = require("../utils.js");

describe("createLookup", () => {
  it("should return an empty object when data is empty", () => {
    const result = createLookup([], "id", "name");
    expect(result).toEqual({});
  });

  it("should create a lookup object with the specified key and value when passed a single object", () => {
    const data = [{ id: 1, name: "John" }];
    const result = createLookup(data, "id", "name");
    expect(result).toEqual({
      1: "John",
    });
  });

  it("should create a lookup object using different key and value properties", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ];
    const result = createLookup(data, "name", "id");
    expect(result).toEqual({
      John: 1,
      Jane: 2,
      Doe: 3,
    });
  });

  it("should not mutate the original data array", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ];
    createLookup(data, "id", "name");
    expect(data).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ]);
  });

  it("should return a new reference", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ];
    const result = createLookup(data, "id", "name");
    expect(result).not.toBe(data);
  });
});
