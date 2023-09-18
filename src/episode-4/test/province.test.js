const { assert } = require("chai");
const { Province } = require("../province");
const { sampleProvinceData } = require("../sampleProvinceData");

describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData());
    assert.strictEqual(asia.shortfall, 5);
  });
});
