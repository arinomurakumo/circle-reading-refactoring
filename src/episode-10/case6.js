class Customer {
  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0);
    this._discountRate = aNumber;
  }
}
