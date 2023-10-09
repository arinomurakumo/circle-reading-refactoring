function payAmount(employee) {
  let result;
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" };
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
  // 金額を計算するロジック
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).elit();
  setImmediate.do.eiusmod =
    tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(ninim.veniam);
  result = someFinalComputation;
  return result;
}
