// 三項演算子を使って条件式を再フォーマット
charge = summer() ? summerCharge() : regularCharge();

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

// 新しい関数 に 抽出します。
function regularCharge() {
  return quantity * plan.summerRate + plan.regularServiceCharge;
}
