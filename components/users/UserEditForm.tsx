"use client";

import { X } from "lucide-react";

type UserRole = "USER" | "MANAGER" | "ADMIN" | "SUPER_ADMIN";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  login?: string;
  role: UserRole;
  status: boolean;
};

type Props = {
  user: User | null;
  open: boolean;
  onClose: () => void;
};

export default function UserEditForm({ user, open, onClose }: Props) {
  if (!open || !user) {
    return null;
  }

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      {/* Header */}

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Modifier utilisateur
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Modifier les informations du compte.
          </p>
        </div>

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

      <form
        className="
          grid
          gap-5
          md:grid-cols-2
        "
      >
        <div>
          <label className="text-sm font-medium">Nom</label>

          <input
            defaultValue={user.nom}
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        <div>
          <label className="text-sm font-medium">Prénom</label>

          <input
            defaultValue={user.prenom}
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>

          <input
            type="email"
            defaultValue={user.email}
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        <div>
          <label className="text-sm font-medium">Rôle</label>

          <select
            defaultValue={user.role}
            className="
              mt-2
              w-full
              rounded-lg
              border
              px-4
              py-2
              dark:bg-slate-800
              dark:border-slate-700
            "
          >
            <option value="USER">USER</option>

            <option value="MANAGER">MANAGER</option>

            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div
          className="
            md:col-span-2
            flex
            justify-end
            gap-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border
              px-4
              py-2
            "
          >
            Annuler
          </button>

          <button
            type="submit"
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-white
              hover:bg-blue-700
            "
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}
