const { expect } = require("chai");
const { Province } = require("../province");
const { sampleProvinceData } = require("../sampleProvinceData");

describe("province", function () {
  const asia = new Province(sampleProvinceData()); // これはやってはいけない

  it("shortfall", function () {
    // const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });
  it("profit", function () {
    // const asia = new Province(sampleProvinceData());
    expect(asia.profit).equal(230);
  });
});
