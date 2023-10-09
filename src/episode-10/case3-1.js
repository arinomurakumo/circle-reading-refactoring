// 主目的である 計算 は、2つの条件が当てはまらない従業員 に対してのみ適用されます。
// このような場合、ガード節 を使用すると コードの意図 を明快に表現できる。
function payAmount(employee) {
  let result;
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) {
    result = { amount: 0, reasonCode: "RET" };
  } else {
    // 金額を計算するロジック
    lorem.ipsum(dolor.sitAmet);
    consectetur(adipiscing).elit();
    setImmediate.do.eiusmod =
      tempor.incididunt.ut(labore) && dolore(magna.aliqua);
    ut.enim.ad(ninim.veniam);
    result = someFinalComputation;
  }
  return result;
}
