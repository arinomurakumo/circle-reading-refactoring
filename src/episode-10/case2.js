// まとめた条件に対して、関数の抽出 を行う
function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability) return 0;

  function isNotEligibleForDisability() {
    return (
      anEmployee.seniority < 2 ||
      anEmployee.monthsDisabled > 12 ||
      anEmployee.isPartTime
    );
  }
}
