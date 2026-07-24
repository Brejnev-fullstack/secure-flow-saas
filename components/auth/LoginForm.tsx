"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { FormEvent, useState } from "react";

import { useLogin } from "@/modules/authentification/hooks/useLogin";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] =
    useState<LoginFormData>({
      email: "",
      password: "",
    });

  const [validationError, setValidationError] =
    useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationError("");

    if (loginMutation.isError) {
      loginMutation.reset();
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setValidationError("");

    loginMutation.reset();

    const {
      email,
      password,
    } = formData;

    /*
     * Validation email
     */

    if (!email.trim()) {
      setValidationError(
        "Veuillez renseigner votre adresse email.",
      );

      return;
    }

    /*
     * Validation simple du format email
     */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setValidationError(
        "Veuillez renseigner une adresse email valide.",
      );

      return;
    }

    /*
     * Validation mot de passe
     */

    if (!password) {
      setValidationError(
        "Veuillez renseigner votre mot de passe.",
      );

      return;
    }

    /*
     * Appel API
     */

    loginMutation.mutate(
      {
        email: email.trim().toLowerCase(),
        password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          router.refresh();
        },
      },
    );
  };

  const isLoading =
    loginMutation.isPending;

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
          Bienvenue sur Secure Flow
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Connectez-vous à votre espace sécurisé.
        </p>
      </div>

      {/* Erreur validation frontend */}

      {validationError && (
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
          {validationError}
        </div>
      )}

      {/* Erreur API */}

      {loginMutation.isError && (
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
          {loginMutation.error.message}
        </div>
      )}

      {/* Formulaire */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Adresse email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            autoComplete="email"
            disabled={isLoading}
            className="
              mt-2
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-3
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

        {/* Mot de passe */}

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Mot de passe
            </label>

            <Link
              href="/forgot-password"
              className="
                text-xs
                font-medium
                text-blue-600
                hover:text-blue-700
                dark:text-blue-400
              "
            >
              Mot de passe oublié ?
            </Link>
          </div>

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
              autoComplete="current-password"
              disabled={isLoading}
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
                  (previous) => !previous,
                )
              }
              disabled={isLoading}
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
        </div>

        {/* Bouton connexion */}

        <button
          type="submit"
          disabled={isLoading}
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
          {isLoading && (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {isLoading
            ? "Connexion en cours..."
            : "Se connecter"}
        </button>
      </form>

      {/* Register */}

      <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Vous n&apos;avez pas encore de compte ?

        <Link
          href="/register"
          className="
            ml-1
            font-semibold
            text-blue-600
            hover:text-blue-700
            dark:text-blue-400
          "
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}