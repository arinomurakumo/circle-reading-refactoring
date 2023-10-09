// アサーションの導入

// 顧客に対して設定した割引率 が すべての購入品目に適用される 例

class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else return aNumber - this.discountRate * aNumber;
  }
}
