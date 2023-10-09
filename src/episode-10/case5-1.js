class Site {
  get customer() {
    return this._customer;
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

function isUnknown(arg) {
  if (!(arg instanceof Customer || arg === "unknown"))
    throw new Error(`不正な値について要調査: <${arg}>`);
  return arg === "unknown";
}
