const { expect } = require("chai");
const { Province } = require("../province");
const { sampleProvinceData } = require("../sampleProvinceData");

describe("province", function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });

  it("shortfall", function () {
    expect(asia.shortfall).equal(5);
  });
  it("profit", function () {
    expect(asia.profit).equal(230);
  });
  it("change production", function () {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  // 値が0 の時にどうなるか
  it("zero demand", function () {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  // 値が負 の時にどうなるか
  it("negative demand", function () {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });

  //値が空文字 の時にどうなるか
  it("empty string demand", function () {
    asia.demand = "";
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});

// 境界値の検査
// 空 の時にどうなるか
describe("no producers", function () {
  let noProducers;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it("shortfall", function () {
    expect(noProducers.shortfall).equal(30);
  });
  it("profit", function () {
    expect(noProducers.profit).equal(0);
  });
});

// 次の結果は？
// 不足分が0 にならないという形で、テストが失敗するということにはならない。
// でもMochaは これを失敗として扱います。
// → 渡ってくるべき値が渡ってこない場合 のテストは不要という認識。
describe("string for producers", function () {
  it("shortfall", function () {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20,
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0);
  });
});
