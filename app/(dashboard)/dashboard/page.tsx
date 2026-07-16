import { Users, UsersRound, ShieldCheck, Activity } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RecentUsers from "@/components/dashboard/RecentUsers";
import RecentAudit from "@/components/dashboard/RecentAudit";

export default function DashboardPage() {
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
      <div>
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Dashboard
        </h1>

        <p
          className="
          mt-2
          text-slate-500
        "
        >
          Vue globale de votre plateforme SaaS
        </p>
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
