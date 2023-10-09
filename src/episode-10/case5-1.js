// ある公共事業会社 が、多くのSite（場所）にサービスを提供しています。
class Site {
  get customer() {
    return this._customer;
  }
}

// Customer（顧客）クラス には様々なプロパティがあります。
class Customer {
  get name() {}
  get billingPlan() {}
  set billingPlan(arg) {}
  get paymentHistory() {}
}
