import getTableHeight from "./getTableHeight";

const filteredRowsMockData = [
  {
    currency: "FJD",
    flag: "images/flags/fj.png",
    id: 0,
    name: "Fiji Dollar",
    rate: 2.25,
  },
  {
    currency: "MXN",
    flag: "images/flags/mx.png",
    id: 0,
    name: "Mexican Peso",
    rate: 2.25,
  },
];

describe("getTableHeight function returns a number to set the table height", () => {
  it("Should return number if given two rows", () => {
    const res = getTableHeight(filteredRowsMockData, 10);
    expect(res).toBe(257);
  });

  it("Should return less if given empty rows", () => {
    const res = getTableHeight([], 10);
    expect(res).toBe(153);
  });
});
