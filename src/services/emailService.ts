// import { transporter } from "../config/mailer";

// export interface EmailAttachment {
//   name: string;
//   content: string; // base64
// }

// interface MailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   attachments?: EmailAttachment[];
// }

// // Never throws: a failed email must not break the API request
// export const sendEmail = async ({
//   to,
//   subject,
//   html,
//   attachments,
// }: MailOptions): Promise<boolean> => {
//   try {
//     if (process.env.BREVO_API_KEY) {
//       const res = await fetch("https://api.brevo.com/v3/smtp/email", {
//         method: "POST",
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//         body: JSON.stringify({
//           sender: { name: "StrayCare", email: process.env.EMAIL_FROM },
//           to: [{ email: to }],
//           subject,
//           htmlContent: html,
//           ...(attachments?.length && { attachment: attachments }),
//         }),
//       });
//       if (!res.ok) throw new Error(await res.text());
//       return true;
//     }

//     await transporter.sendMail({
//       from: `"StrayCare" <${process.env.EMAIL_FROM}>`,
//       to,
//       subject,
//       html,
//       attachments: attachments?.map((a) => ({
//         filename: a.name,
//         content: a.content,
//         encoding: "base64",
//       })),
//     });
//     return true;
//   } catch (err) {
//     console.error("Email failed:", err);
//     return false;
//   }
// };