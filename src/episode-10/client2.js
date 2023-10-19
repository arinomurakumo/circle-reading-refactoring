// client2

const plan = isUnknown(aCustomer)
  ? // （typoの修正）
    registry.billingPlans.basic
  : aCustomer.billingPlan;
