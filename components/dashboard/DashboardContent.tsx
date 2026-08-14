"use client";

import {
  Users,
  UsersRound,
  ShieldCheck,
  Activity,
  Loader2,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RecentUsers from "@/components/dashboard/RecentUsers";
import RecentAudit from "@/components/dashboard/RecentAudit";

import { useCurrentUser } from "@/modules/authentification/hooks/useCurrentUser";

export default function DashboardContent() {
  const { data: user, isLoading, isError } = useCurrentUser();

  /**
   * Chargement de l'utilisateur connecté
   */
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 size={32} className="animate-spin text-blue-600" />

          <p className="text-sm">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  /**
   * Erreur lors de la récupération
   * de l'utilisateur connecté.
   */
  if (isError || !user) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
          text-red-700
          dark:border-red-900/50
          dark:bg-red-950/20
          dark:text-red-400
        "
      >
        <h2 className="font-semibold">Impossible de charger votre profil</h2>

        <p className="mt-2 text-sm">
          Votre session est peut-être expirée. Veuillez vous reconnecter.
        </p>
      </div>
    );
  }

  /**
   * Statistiques temporaires.
   *
   * Elles seront remplacées plus tard
   * par de vraies données provenant de l'API.
   */
  const stats = [
    {
      title: "Utilisateurs",
      value: "1 245",
      description: "+12% ce mois",
      icon: Users,
    },

    {
      title: "Équipes",
      value: "48",
      description: "Organisations actives",
      icon: UsersRound,
    },

    {
      title: "Administrateurs",
      value: "12",
      description: "Comptes privilégiés",
      icon: ShieldCheck,
    },

    {
      title: "Activité",
      value: "98%",
      description: "Disponibilité système",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Bonjour {user.prenom} 👋</h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Bienvenue dans votre espace Secure Flow.
        </p>
      </div>

      {/* Informations utilisateur */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Compte connecté
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              {user.prenom} {user.nomUser}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-700
                dark:bg-blue-950/40
                dark:text-blue-400
              "
            >
              {user.role}
            </span>

            {user.emailVerified && (
              <span
                className="
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-green-700
                  dark:bg-green-950/40
                  dark:text-green-400
                "
              >
                Email vérifié
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Graphique */}

      <ActivityChart />

      {/* Activités */}

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <RecentUsers />

        <RecentAudit />
      </div>
    </div>
  );
}
