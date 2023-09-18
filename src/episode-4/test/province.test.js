const { expect } = require("chai");
const { Province } = require("../province");
const { sampleProvinceData } = require("../sampleProvinceData");

describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });
});
