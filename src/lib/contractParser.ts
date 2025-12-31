export function analyzeContract(text: string) {
  const lower = text.toLowerCase();

  // Effective date
  const dateMatch = text.match(
    /(effective date|entered into as of)\s*(?:is|of)?\s*(?:on)?\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i
  );

  const effectiveDate = dateMatch ? dateMatch[2] : null;

  // Term length (handles "twelve (12) months", "12 months", "1 year")
  const termMatch = lower.match(
    /initial term.*?(?:\(|\b)(\d+)(?:\))?\s*(month|year)/i
  );

  let termMonths: number | null = null;
  if (termMatch) {
    const value = parseInt(termMatch[1], 10);
    termMonths = termMatch[2] === "year" ? value * 12 : value;
  }

  // Auto-renew
  const autoRenew =
    lower.includes("auto-renew") ||
    lower.includes("automatically renew") ||
    lower.includes("automatically renews");

  // Notice period (handles "sixty (60) days", "60 days prior notice")
  const noticeMatch = lower.match(
    /(?:at least\s*)?(?:\(|\b)(\d+)(?:\))?\s*days?\s*(?:prior|written)?\s*notice/i
  );

  const noticeDays = noticeMatch
    ? parseInt(noticeMatch[1], 10)
    : null;

  return {
    effectiveDate,
    termMonths,
    autoRenew,
    noticeDays,
  };
}
