import { X } from "lucide-react";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: "USER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN";
  status: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  user?: User;
};

export default function UserProfileDrawer({ open, onClose, user }: Props) {
  if (!open || !user) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
      "
    >
   
      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
        onClick={onClose}
      />

      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-md
          bg-white
          p-6
          shadow-xl
          dark:bg-slate-900
        "
      >
       

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Profil utilisateur
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Profil */}

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
          "
        >
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-2xl
              font-bold
              text-white
            "
          >
            {user.prenom.charAt(0)}
          </div>

          <h3
            className="
              mt-4
              text-lg
              font-semibold
            "
          >
            {user.prenom} {user.nom}
          </h3>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {user.email}
          </p>
        </div>
        <div
          className="
            mt-8
            space-y-5
          "
        >
          <div>
            <p className="text-sm text-slate-500">Rôle</p>

            <UserRoleBadge role={user.role} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Statut</p>

            <UserStatusBadge active={user.status} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Identifiant</p>

            <p className="font-medium">#{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
