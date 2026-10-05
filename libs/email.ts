import { Resend } from "resend";
import { env } from "@/libs/env";
const resend = new Resend(env.RESEND_API_KEY);


async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (error) {
    console.error("EMAIL ERREUR :", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }

  console.log("EMAIL SENT :", data);

  return data;
}

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const link = `${env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  return sendEmail({
    to: email,
    subject: "Vérification de votre compte",
    html: `
      <h2>Bienvenue</h2>
      <p>Merci pour votre inscription.</p>
      <a href="${link}">
        Vérifier mon compte
      </a>
    `,
  });
}
export async function sendResetPasswordEmail(
  email: string,
  token: string
) {
  const link = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  return sendEmail({
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <h2>Réinitialisation du mot de passe</h2>
      <p>Vous avez demandé la modification de votre mot de passe.</p>

      <a href="${link}">
        Réinitialiser mon mot de passe
      </a>

      <p>Ce lien expire dans 15 minutes.</p>
    `,
  });
}