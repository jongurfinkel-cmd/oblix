export function computeContractDates(
  effectiveDate: string | null,
  termMonths: number | null,
  noticeDays: number | null
) {
  if (!effectiveDate || !termMonths) {
    return null;
  }

  const start = new Date(effectiveDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + termMonths);

  const noticeDeadline = noticeDays
    ? new Date(end.getTime() - noticeDays * 24 * 60 * 60 * 1000)
    : null;

  const alerts = [90, 60, 30].map((days) => {
    const alertDate = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
    return {
      daysBefore: days,
      date: alertDate,
    };
  });

  return {
    startDate: start,
    endDate: end,
    noticeDeadline,
    alerts,
  };
}
