export type Plan = "free" | "premium";

export type PlanInfo = {
  plan: Plan;
  isPremium: boolean;
};

export function getPlan(): PlanInfo {
  const override = process.env.NEXT_PUBLIC_PLAN_OVERRIDE;
  const plan: Plan = override === "premium" ? "premium" : "free";

  return {
    plan,
    isPremium: plan === "premium"
  };
}
