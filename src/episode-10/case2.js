// まとめた条件に対して、関数の抽出 を行う
function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability) return 0;

  // 「is Not Eligible For Disability」 = 障害者に対する資格がない
  function isNotEligibleForDisability() {
    return (
      anEmployee.seniority < 2 ||
      anEmployee.monthsDisabled > 12 ||
      anEmployee.isPartTime
    );
  }
}
