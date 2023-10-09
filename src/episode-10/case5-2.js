class Site {
  get customer() {
    return this._customer;
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

  // Customerクラス に isUnknownプロパティを追加
  get isUnknown() {
    return false;
  }
}

// isUnknownフィールド を持つ 特殊ケース用オブジェクトを作成
function createUnknownCustomer() {
  return {
    isUnknown: true,
  };
}
