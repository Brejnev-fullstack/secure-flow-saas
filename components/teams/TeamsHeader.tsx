"use client";

import { Plus } from "lucide-react";

type Props = {
  onCreate: () => void;
};

export default function TeamsHeader({ onCreate }: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Équipes
        </h1>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Gérez les équipes et les membres de votre organisation.
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
          text-white
          hover:bg-blue-700
        "
      >
        <Plus size={18} />
        Nouvelle équipe
      </button>
    </div>
  );
}
