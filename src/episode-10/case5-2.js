class Site {
  get customer() {
    return this._customer === "unknown"
      ? createUnknownCustomer()
      : this._customer;
  }
}

class Customer {
  get name() {
    // ...
  }
  get billingPlan() {
    // ...
  }
  set billingPlan(arg) {
    // ...
  }
  get paymentHistory() {
    // ...
  }

  // 関数の抽出
  // get isUnknown() {
  //   return false;
  // }
}

function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
  };
}

// 特殊ケースの判定処理に 関数の抽出を行う
function isUnknown(arg) {
  return arg.isUnknown;
}
