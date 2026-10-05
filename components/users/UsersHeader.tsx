"use client";

import { UserPlus } from "lucide-react";

type Props = {
  onCreate: () => void;
};

export default function UsersHeader({ onCreate }: Props) {
  return (
    <div
      className="
      flex
      flex-col
      gap-4
      md:flex-row
      md:items-center
      md:justify-between
    "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Utilisateurs
        </h1>

        <p
          className="
          mt-2
          text-slate-500
        "
        >
          Gérez les comptes utilisateurs et leurs permissions.
        </p>
      </div>

      <button
       onClick={onCreate}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-4
          py-2
          font-medium
          text-white
          hover:bg-blue-700
        "
      >
        <UserPlus size={18} />
        Ajouter utilisateur
      </button>
    </div>
  );
}
