"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";

import { useRegister } from "@/modules/authentification/hooks/useRegister";

type RegisterFormData = {
  nomUser: string;
  prenom: string;
  email: string;
  login: string;
  tel: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const router = useRouter();

  const registerMutation = useRegister();

  const [formData, setFormData] = useState<RegisterFormData>({
    nomUser: "",
    prenom: "",
    email: "",
    login: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationError("");

    if (registerMutation.isError) {
      registerMutation.reset();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");
    const { nomUser, prenom, email, login, tel, password, confirmPassword } =
      formData;

    /**
     * Validation nom
     */
    if (!nomUser.trim()) {
      setValidationError("Veuillez renseigner votre nom.");

      return;
    }

    /**
     * Validation prénom
     */
    if (!prenom.trim()) {
      setValidationError("Veuillez renseigner votre prénom.");

      return;
    }

    /**
     * Validation email
     */
    if (!email.trim()) {
      setValidationError("Veuillez renseigner votre adresse email.");

      return;
    }

    /**
     * Validation login
     */
    if (!login.trim()) {
      setValidationError("Veuillez renseigner votre login.");

      return;
    }

    /**
     * Validation téléphone
     *
     * Le champ est optionnel côté backend.
     */
    if (tel.trim()) {
      const phoneRegex = /^[0-9+\s()-]{8,20}$/;

      if (!phoneRegex.test(tel.trim())) {
        setValidationError(
          "Veuillez renseigner un numéro de téléphone valide.",
        );

        return;
      }
    }

    /**
     * Validation mot de passe
     */
    if (!password) {
      setValidationError("Veuillez renseigner un mot de passe.");

      return;
    }

    if (password.length < 8) {
      setValidationError(
        "Le mot de passe doit contenir au moins 8 caractères.",
      );

      return;
    }

    /**
     * Confirmation du mot de passe
     */
    if (!confirmPassword) {
      setValidationError("Veuillez confirmer votre mot de passe.");

      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Les mots de passe ne correspondent pas.");

      return;
    }

    /**
     * Payload envoyé au backend.
     *
     * confirmPassword n'est volontairement
     * pas envoyé à l'API.
     */
    registerMutation.mutate({
      nomUser: nomUser.trim(),
      prenom: prenom.trim(),
      email: email.trim().toLowerCase(),
      login: login.trim(),
      tel: tel.trim() ? tel.trim() : undefined,
      password,
    });
  };

  /**
   * Après inscription réussie,
   * l'utilisateur doit vérifier son email.
   */
  const handleGoToVerification = () => {
    router.push("/verify-email");
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
          <UserPlus size={30} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">Créer un compte</h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Créez votre compte Secure Flow pour commencer.
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

      {registerMutation.isError && (
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
          {registerMutation.error.message}
        </div>
      )}

      {/* Succès */}

      {registerMutation.isSuccess && (
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
          <CheckCircle2 size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-medium">Compte créé avec succès.</p>

            <p className="mt-1">
              Vérifiez votre adresse email pour activer votre compte.
            </p>
          </div>
        </div>
      )}

      {/* Formulaire */}

      {!registerMutation.isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom et prénom */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nomUser" className="text-sm font-medium">
                Nom
              </label>

              <input
                id="nomUser"
                name="nomUser"
                type="text"
                value={formData.nomUser}
                onChange={handleChange}
                placeholder="Nom"
                autoComplete="family-name"
                disabled={registerMutation.isPending}
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

            <div>
              <label htmlFor="prenom" className="text-sm font-medium">
                Prénom
              </label>

              <input
                id="prenom"
                name="prenom"
                type="text"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom"
                autoComplete="given-name"
                disabled={registerMutation.isPending}
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
          </div>

          {/* Email */}

          <div>
            <label htmlFor="email" className="text-sm font-medium">
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
              disabled={registerMutation.isPending}
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

          {/* Login */}

          <div>
            <label htmlFor="login" className="text-sm font-medium">
              Login
            </label>

            <input
              id="login"
              name="login"
              type="text"
              value={formData.login}
              onChange={handleChange}
              placeholder="Votre identifiant"
              autoComplete="username"
              disabled={registerMutation.isPending}
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

          {/* Téléphone */}

          <div>
            <label htmlFor="tel" className="text-sm font-medium">
              Téléphone
              <span className="ml-1 text-xs text-slate-400">(optionnel)</span>
            </label>

            <input
              id="tel"
              name="tel"
              type="tel"
              value={formData.tel}
              onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
              disabled={registerMutation.isPending}
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
            <label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </label>

            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={registerMutation.isPending}
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
                onClick={() => setShowPassword((previous) => !previous)}
                disabled={registerMutation.isPending}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-600
                  dark:hover:text-slate-200
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Minimum 8 caractères.
            </p>
          </div>

          {/* Confirmation */}

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmer le mot de passe
            </label>

            <div className="relative mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={registerMutation.isPending}
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
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                disabled={registerMutation.isPending}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-600
                  dark:hover:text-slate-200
                "
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={registerMutation.isPending}
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
            {registerMutation.isPending && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {registerMutation.isPending
              ? "Création du compte..."
              : "Créer mon compte"}
          </button>
        </form>
      ) : (
        /* Succès */

        <button
          type="button"
          onClick={handleGoToVerification}
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-lg
            bg-blue-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Vérifier mon adresse email
        </button>
      )}

      {/* Login */}

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Vous avez déjà un compte ?
        </p>

        <Link
          href="/login"
          className="
            mt-1
            inline-block
            text-sm
            font-semibold
            text-blue-600
            hover:text-blue-700
            dark:text-blue-400
          "
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
