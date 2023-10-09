// こちらにあった then節 を
if (summer()) charge = summerCharge();
else charge = quantity * plan.summerRate + plan.regularServiceCharge;

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

// 新しい関数 に 抽出します。
function summerCharge() {
  return quantity * plan.summerRate;
}
