"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, MailCheck, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { useVerifyEmail } from "@/modules/authentification/hooks/useVerifyEmail";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const verifyEmailMutation = useVerifyEmail();
  const token = searchParams.get("token");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (hasVerified.current) {
      return;
    }

    hasVerified.current = true;

    verifyEmailMutation.mutate({
      token,
    });
  }, [token]);

  if (!token) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-8
          text-center
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-red-100
            text-red-600
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          <XCircle size={30} />
        </div>

        <h1 className="text-2xl font-bold">Lien de vérification invalide</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Aucun token de vérification n a été trouvé. Veuillez utiliser le lien
          reçu par email.
        </p>

        <Link
          href="/login"
          className="
            mt-6
            inline-flex
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
          Retour à la connexion
        </Link>
      </div>
    );
  }

  if (verifyEmailMutation.isPending) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-8
          text-center
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-600
            dark:bg-blue-950/30
            dark:text-blue-400
          "
        >
          <Loader2 size={30} className="animate-spin" />
        </div>

        <h1 className="text-2xl font-bold">Vérification en cours</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Nous vérifions votre adresse email. Veuillez patienter quelques
          instants.
        </p>
      </div>
    );
  }

  if (verifyEmailMutation.isSuccess) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-green-200
          bg-white
          p-8
          text-center
          shadow-sm
          dark:border-green-900/50
          dark:bg-slate-900
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-green-100
            text-green-600
            dark:bg-green-950/30
            dark:text-green-400
          "
        >
          <CheckCircle2 size={30} />
        </div>

        <h1 className="text-2xl font-bold">Email vérifié avec succès</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Votre adresse email a été vérifiée. Vous pouvez maintenant vous
          connecter à votre compte Secure Flow.
        </p>

        <Link
          href="/login"
          className="
            mt-6
            inline-flex
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
          "
        >
          <MailCheck size={18} />
          Se connecter
        </Link>
      </div>
    );
  }

  if (verifyEmailMutation.isError) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-white
          p-8
          text-center
          shadow-sm
          dark:border-red-900/50
          dark:bg-slate-900
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-red-100
            text-red-600
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          <XCircle size={30} />
        </div>

        <h1 className="text-2xl font-bold">Échec de la vérification</h1>

        <p className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400">
          {verifyEmailMutation.error.message}
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              verifyEmailMutation.reset();
              hasVerified.current = false;

              verifyEmailMutation.mutate({
                token,
              });
            }}
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
            "
          >
            Réessayer
          </button>

          <Link
            href="/login"
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              dark:border-slate-700
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
