import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UsersRound,
  ShieldCheck,
  FileClock,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Équipes",
    href: "/dashboard/teams",
    icon: UsersRound,
  },
  {
    title: "Rôles",
    href: "/dashboard/roles",
    icon: ShieldCheck,
  },
  {
    title: "Audit Logs",
    href: "/dashboard/audit",
    icon: FileClock,
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profil",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        md:flex
        h-screen
        w-64
        flex-col
        border-r
        bg-white
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      <div
        className="
        flex
        h-16
        items-center
        px-6
        text-xl
        font-bold
      "
      >
        SecureFlow
      </div>

      <nav
        className="
        flex-1
        space-y-2
        px-4
      "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                text-slate-600
                transition
                hover:bg-slate-100
                hover:text-slate-900
                dark:text-slate-300
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <Icon size={18} />

              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-sm
            text-red-500
            hover:bg-red-50
            dark:hover:bg-red-950
          "
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
