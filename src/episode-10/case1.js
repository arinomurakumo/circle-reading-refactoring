if (summer()) charge = quantity * plan.summerRate;
else charge = quantity * plan.summerRate + plan.regularServiceCharge;

// 条件記述 を 関数 に抽出します。
function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
