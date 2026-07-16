"use client";

import { Search } from "lucide-react";

export default function TeamFilters() {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-4
        dark:bg-slate-900
        dark:border-slate-800
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
        "
      >
        {/* Recherche */}

        <div
          className="
            relative
            flex-1
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Rechercher une équipe..."
            className="
              w-full
              rounded-lg
              border
              py-2
              pl-10
              pr-4
              outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:bg-slate-800
              dark:border-slate-700
            "
          />
        </div>

        {/* Filtre statut */}

        <select
          className="
            rounded-lg
            border
            px-4
            py-2
            outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:bg-slate-800
            dark:border-slate-700
          "
        >
          <option value="">Toutes les équipes</option>

          <option value="ACTIVE">Actives</option>

          <option value="INACTIVE">Inactives</option>
        </select>
      </div>
    </div>
  );
}
