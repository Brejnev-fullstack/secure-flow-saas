"use client";

import { X, Trash2 } from "lucide-react";

type User = {
  id: number;
  nom: string;
  prenom: string;
};

type Props = {
  user: User | null;
  open: boolean;
  onClose: () => void;
};

export default function DeleteUserModal({ user, open, onClose }: Props) {
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
          Supprimer utilisateur
        </h2>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="mt-6">
        <div
          className="
            flex
            items-center
            gap-3
            rounded-lg
            bg-red-50
            p-4
            text-red-700
          "
        >
          <Trash2 size={22} />

          <p>
            Voulez-vous supprimer{" "}
            <strong>
              {user.prenom} {user.nom}
            </strong>
            ?
          </p>
        </div>

        <p
          className="
            mt-4
            text-sm
            text-slate-500
          "
        >
          Cette action est irréversible.
        </p>
      </div>

      <div
        className="
          mt-6
          flex
          justify-end
          gap-3
        "
      >
        <button
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
          className="
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-white
            hover:bg-red-700
          "
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
