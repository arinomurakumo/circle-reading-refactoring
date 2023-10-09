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

  get isUnknown() {
    return false;
  }
}
