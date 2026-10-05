"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

type FormStatus =
  | "idle"
  | "loading"
  | "error"
  | "success";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [formData, setFormData] =
    useState<ResetPasswordFormData>({
      password: "",
      confirmPassword: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (
      status === "error" ||
      status === "success"
    ) {
      setStatus("idle");
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const {
      password,
      confirmPassword,
    } = formData;

    // Vérification des champs

    if (
      !password ||
      !confirmPassword
    ) {
      setStatus("error");

      setErrorMessage(
        "Veuillez renseigner les deux champs."
      );

      return;
    }

    // Vérification de la longueur

    if (password.length < 8) {
      setStatus("error");

      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères."
      );

      return;
    }

    // Vérification de la correspondance

    if (
      password !== confirmPassword
    ) {
      setStatus("error");

      setErrorMessage(
        "Les mots de passe ne correspondent pas."
      );

      return;
    }

    // Loading

    setStatus("loading");

    // Simulation temporaire.
    // L'appel API sera ajouté plus tard.

    setTimeout(() => {
      setStatus("success");

      setSuccessMessage(
        "Votre mot de passe a été réinitialisé avec succès."
      );
    }, 1500);
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
          Réinitialiser le mot de passe
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Choisissez un nouveau mot de passe
          sécurisé pour votre compte.
        </p>
      </div>

      {/* Error */}

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

      {/* Success */}

      {status === "success" && (
        <div
          className="
            mb-5
            flex
            items-start
            gap-3
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
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <span>
            {successMessage}
          </span>
        </div>
      )}

      {/* Formulaire */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Nouveau mot de passe */}

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Nouveau mot de passe
          </label>

          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={
                status === "loading" ||
                status === "success"
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                py-3
                pr-12
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

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previous) => !previous
                )
              }
              disabled={
                status === "loading" ||
                status === "success"
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                transition
                hover:text-slate-600
                disabled:cursor-not-allowed
                dark:hover:text-slate-200
              "
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Le mot de passe doit contenir au
            moins 8 caractères.
          </p>
        </div>

        {/* Confirmation */}

        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium"
          >
            Confirmer le nouveau mot de passe
          </label>

          <div className="relative mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={
                status === "loading" ||
                status === "success"
              }
              className="
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                py-3
                pr-12
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

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) => !previous
                )
              }
              disabled={
                status === "loading" ||
                status === "success"
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                transition
                hover:text-slate-600
                disabled:cursor-not-allowed
                dark:hover:text-slate-200
              "
              aria-label={
                showConfirmPassword
                  ? "Masquer la confirmation"
                  : "Afficher la confirmation"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Bouton */}

        <button
          type="submit"
          disabled={
            status === "loading" ||
            status === "success"
          }
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
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {status === "loading"
            ? "Réinitialisation..."
            : status === "success"
              ? "Mot de passe réinitialisé"
              : "Réinitialiser le mot de passe"}
        </button>
      </form>

      {/* Retour Login */}

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="
            text-sm
            font-medium
            text-blue-600
            transition
            hover:text-blue-700
            dark:text-blue-400
          "
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}