"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "error" | "success";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Validation

    if (!email.trim()) {
      setStatus("error");

      setErrorMessage("Veuillez renseigner votre adresse email.");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus("error");

      setErrorMessage("Veuillez renseigner une adresse email valide.");

      return;
    }

    // Loading

    setStatus("loading");

    // Simulation temporaire.
    // L'appel API sera ajouté plus tard.

    setTimeout(() => {
      setStatus("success");

      setSuccessMessage(
        "Si un compte correspond à cette adresse email, un lien de réinitialisation vous sera envoyé.",
      );
    }, 1500);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}

      <div className="mb-8 flex flex-col items-center text-center">
        <div
          className="
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            text-white
            shadow-lg
            shadow-blue-600/20
          "
        >
          <ShieldCheck size={30} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          Mot de passe oublié ?
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Entrez votre adresse email et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>
      </div>

      {/* Message erreur */}

      {status === "error" && (
        <div
          className="
            mb-5
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
            dark:border-red-900/50
            dark:bg-red-950/20
            dark:text-red-400
          "
        >
          {errorMessage}
        </div>
      )}

      {/* Message succès */}

      {status === "success" && (
        <div
          className="
            mb-5
            rounded-lg
            border
            border-green-200
            bg-green-50
            px-4
            py-3
            text-sm
            leading-5
            text-green-700
            dark:border-green-900/50
            dark:bg-green-950/20
            dark:text-green-400
          "
        >
          {successMessage}
        </div>
      )}

      {/* Formulaire */}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Adresse email
          </label>

          <div className="relative mt-2">
            <Mail
              size={19}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="email@example.com"
              autoComplete="email"
              disabled={status === "loading"}
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                py-3
                pl-10
                text-sm
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-700
                dark:bg-slate-800
              "
            />
          </div>
        </div>

        {/* Bouton */}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-blue-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {status === "loading" && (
            <Loader2 size={18} className="animate-spin" />
          )}

          {status === "loading"
            ? "Envoi en cours..."
            : status === "success"
              ? "Email envoyé"
              : "Envoyer le lien de réinitialisation"}
        </button>
      </form>

      {/* Retour Login */}

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-blue-600
            dark:text-slate-400
            dark:hover:text-blue-400
          "
        >
          <ArrowLeft size={16} />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
