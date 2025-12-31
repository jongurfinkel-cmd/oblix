import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAlertEmail(payload: {
  contractName: string;
  endDate: Date;
  autoRenew: boolean;
  alerts: { daysBefore: number; date: Date }[];
}) {
  const alertLines = payload.alerts
    .map(
      (a) =>
        `${a.daysBefore} days before renewal → ${a.date.toDateString()}`
    )
    .join("<br/>");

  await resend.emails.send({
    from: "LEGEND <onboarding@resend.dev>",
    to: process.env.ALERT_EMAIL!,
    subject: `Contract Alert: ${payload.contractName}`,
    html: `
      <h2>Contract Alert</h2>
      <p><strong>Contract:</strong> ${payload.contractName}</p>
      <p><strong>End date:</strong> ${payload.endDate.toDateString()}</p>
      <p><strong>Auto-renew:</strong> ${
        payload.autoRenew ? "Yes" : "No"
      }</p>
      <h3>Upcoming Alerts</h3>
      <p>${alertLines}</p>
    `,
  });
}
