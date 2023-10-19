class Site {
  get customer() {
    return this._customer === "unknown"
      ? new UnknownCustomer()
      : this._customer;
  }
}

class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}

  get isUnknown() {
    return false;
  }
}

class UnknownCustomer {
  get name() {
    return "occupant";
  }
  get billingPlan() {
    return registry.billingPlans.basic;
  }
  set billingPlan(arg) {
    // 何もしない
  }
  get paymentHistory() {
    return new NullPaymentHistory();
  }
}

class NullPaymentHistory {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

// デッドコードの削除
// function isUnknown(arg) {
//   if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
//     throw new Error(`不正な値について要調査: <${arg}>`);
//   return arg.isUnknown;
// }
