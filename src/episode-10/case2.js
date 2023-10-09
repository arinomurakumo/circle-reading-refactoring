// テストを行い、次の条件判定 を取り込みます。
function disabilityAmount(anEmployee) {
  if (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  )
    return 0;
}
