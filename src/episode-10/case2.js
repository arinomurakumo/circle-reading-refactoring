// 連続した条件判定 だけど、結果は全て同じ。
// 結果が同じ なので、条件を１つにまとめるべき。
// 連続した条件判定の場合 は or演算子（||）を使って結合します。

function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2 || anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
}
