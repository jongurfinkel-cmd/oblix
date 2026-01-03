export type ContractStatus =
  | "action_needed"
  | "auto_renewal_risk"
  | "safe";

export function classifyContractStatus(contract: {
  auto_renew: boolean | null;
  notice_deadline: string | null;
  contract_end_date: string | null;
}) {
  const now = new Date();
  const WARNING_DAYS = 30;

  if (contract.notice_deadline) {
    const notice = new Date(contract.notice_deadline);
    const diffDays =
      (notice.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays <= WARNING_DAYS) {
      return "action_needed";
    }
  }

  if (contract.auto_renew) {
    return "auto_renewal_risk";
  }

  return "safe";
}
