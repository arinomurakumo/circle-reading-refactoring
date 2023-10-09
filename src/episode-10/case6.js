// アサーションの導入

// 顧客に対して設定した割引率 が すべての購入品目に適用される 例

class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }
}
